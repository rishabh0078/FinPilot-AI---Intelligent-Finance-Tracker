# ============================================
# ai/rag_pipeline.py — RAG (Retrieval-Augmented Generation)
# ============================================
# RAG = Retrieve relevant data → Inject into prompt → Generate response
#
# How it works:
# 1. When user adds a transaction, we convert it to an "embedding"
#    (a list of numbers that captures its meaning)
# 2. We store this embedding in ChromaDB (vector database)
# 3. When user asks a question, we search ChromaDB for related transactions
# 4. We pass those transactions as context to the Groq LLM
# 5. The LLM generates a personalized answer based on real data
#
# This is the KEY AI concept that makes FinPilot intelligent!

import chromadb
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from ai.prompts import FINANCE_ADVISOR_PROMPT
import os

# ------ ChromaDB Setup ------
# PersistentClient saves embeddings to disk (survives server restarts)
chroma_client = chromadb.PersistentClient(path="./chroma_data")


def get_collection(user_id: str):
    """
    Each user gets their own ChromaDB collection.
    This keeps user data separate and private.
    """
    return chroma_client.get_or_create_collection(name=f"user_{user_id}")


# ------ Store Transaction Embedding ------
def store_transaction_embedding(user_id: str, transaction: dict):
    """
    Converts a transaction into text and stores it in ChromaDB.
    ChromaDB automatically creates the embedding using its default model.
    
    Example text: "expense: Groceries - $85.0 - Weekly grocery shopping"
    """
    collection = get_collection(user_id)

    # Convert transaction data into a readable text string
    text = (
        f"{transaction['type']}: {transaction['category']} "
        f"- ₹{transaction['amount']} - {transaction['description']} "
        f"on {transaction['date']}"
    )

    # Store in ChromaDB
    # documents = the text to embed
    # metadatas = extra info we can filter by later
    # ids = unique identifier (must be a string)
    collection.add(
        documents=[text],
        metadatas=[{
            "type": transaction["type"],
            "category": transaction["category"],
            "amount": float(transaction["amount"]),
        }],
        ids=[str(transaction["_id"])],
    )


# ------ Query Relevant Transactions ------
def query_transactions(user_id: str, question: str, n_results: int = 5):
    """
    Searches ChromaDB for transactions related to the user's question.
    Uses semantic search — finds matches by meaning, not exact words.
    
    Example: "food spending" will find "Groceries" and "Dining" transactions
    """
    collection = get_collection(user_id)

    # Don't query if collection is empty
    if collection.count() == 0:
        return []

    results = collection.query(
        query_texts=[question],
        n_results=min(n_results, collection.count()),
    )

    return results["documents"][0] if results["documents"] else []


# ------ Chat with AI (main RAG function) ------
def chat_with_ai(user_id: str, question: str, financial_summary: str) -> str:
    """
    The main AI function. This is where RAG happens:
    1. Retrieve relevant transactions from ChromaDB
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
        temperature=0.3,  # Lower = more focused, less creative
    )

    # Step 3: Build the prompt chain (LangChain)
    prompt = ChatPromptTemplate.from_template(FINANCE_ADVISOR_PROMPT)
    chain = prompt | llm  # pipe operator chains prompt → LLM

    # Step 4: Run the chain with our data
    response = chain.invoke({
        "context": context,
        "summary": financial_summary,
        "question": question,
    })

    return response.content
