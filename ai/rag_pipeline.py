# ============================================
# ai/rag_pipeline.py — RAG (Retrieval-Augmented Generation)
# ============================================
# RAG = Retrieve relevant data → Inject into prompt → Generate response
#
# How it works:
# 1. When user adds a transaction, we convert it to an "embedding"
#    (a list of numbers that captures its meaning)
# 2. We store this embedding in Pinecone (cloud vector database)
# 3. When user asks a question, we search Pinecone for related transactions
# 4. We pass those transactions as context to the Groq LLM
# 5. The LLM generates a personalized answer based on real data
#
# This is the KEY AI concept that makes FinPilot intelligent!

import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.documents import Document
from ai.prompts import FINANCE_ADVISOR_PROMPT

# Pinecone imports
from langchain_pinecone import PineconeVectorStore
from langchain_pinecone import PineconeEmbeddings

# ------ Pinecone Setup ------
def get_embeddings():
    """
    Initialize Pinecone Embeddings (Serverless Inference API).
    This requires PINECONE_API_KEY in the environment.
    """
    return PineconeEmbeddings(
        model="multilingual-e5-large",
        pinecone_api_key=os.getenv("PINECONE_API_KEY")
    )

def get_vectorstore(user_id: str):
    """
    Connects to the Pinecone index and scopes it to the specific user via namespace.
    This keeps user data separate and perfectly secure.
    """
    return PineconeVectorStore(
        index_name="finpilot-index",
        embedding=get_embeddings(),
        namespace=f"user_{user_id}",
        pinecone_api_key=os.getenv("PINECONE_API_KEY")
    )


# ------ Store Transaction Embedding ------
def store_transaction_embedding(user_id: str, transaction: dict):
    """
    Converts a transaction into text and stores it in Pinecone.
    """
    vectorstore = get_vectorstore(user_id)

    text = (
        f"{transaction['type']}: {transaction['category']} "
        f"- ₹{transaction['amount']} - {transaction['description']} "
        f"on {transaction['date']}"
    )

    doc = Document(
        page_content=text,
        metadata={
            "type": transaction["type"],
            "category": transaction["category"],
            "amount": float(transaction["amount"]),
        },
        id=str(transaction["_id"])
    )
    
    # Add document to Pinecone
    vectorstore.add_documents([doc], ids=[str(transaction["_id"])])


# ------ Query Relevant Transactions ------
def query_transactions(user_id: str, question: str, k: int = 5):
    """
    Searches Pinecone for transactions related to the user's question.
    """
    try:
        vectorstore = get_vectorstore(user_id)
        docs = vectorstore.similarity_search(query=question, k=k)
        return [doc.page_content for doc in docs]
    except Exception as e:
        print(f"Pinecone query error (might be empty index): {e}")
        return []


# ------ Chat with AI (main RAG function) ------
def chat_with_ai(user_id: str, question: str, financial_summary: str) -> str:
    """
    The main AI function. This is where RAG happens:
    1. Retrieve relevant transactions from Pinecone
    2. Build a prompt with the context
    3. Send to Groq LLM (Llama 3.3)
    4. Return the AI response
    """
    # Step 1: Retrieve relevant context from vector DB
    relevant_transactions = query_transactions(user_id, question)
    context = "\n".join(relevant_transactions) if relevant_transactions else "No transaction history available yet."

    # Step 2: Create the Groq LLM instance
    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        api_key=os.getenv("GROQ_API_KEY"),
        temperature=0.3,
    )

    # Step 3: Build the prompt chain (LangChain)
    prompt = ChatPromptTemplate.from_template(FINANCE_ADVISOR_PROMPT)
    chain = prompt | llm 

    # Step 4: Run the chain with our data
    response = chain.invoke({
        "context": context,
        "summary": financial_summary,
        "question": question,
    })

    return response.content
