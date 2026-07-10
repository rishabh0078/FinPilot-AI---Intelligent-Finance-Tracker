import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { FiSend, FiCpu, FiUser } from 'react-icons/fi'

const AiInsights = () => {
  const { aiMessages, sendAiMessage, isAiLoading, totalIncome, totalExpenses, currentSavings } = useApp()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [aiMessages])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    sendAiMessage(input.trim())
    setInput('')
  }

  // Quick suggestion buttons
  const suggestions = [
    'How can I save more money?',
    'Where am I overspending?',
    'Give me a monthly summary',
    'Tips to reduce expenses',
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Financial Advisor</h1>
        <p className="text-slate-400 text-sm mt-1">
          Chat with your AI assistant for personalized financial insights
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat area — takes 2 columns */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col h-[600px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {aiMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${
                  msg.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    msg.role === 'assistant'
                      ? 'bg-emerald-500/10'
                      : 'bg-slate-700'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <FiCpu className="text-emerald-500 text-sm" />
                  ) : (
                    <FiUser className="text-slate-300 text-sm" />
                  )}
                </div>

                {/* Message bubble */}
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'assistant'
                      ? 'bg-slate-800 text-slate-300'
                      : 'bg-emerald-500/10 text-emerald-100 border border-emerald-500/20'
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {/* Typing indicator bubble */}
            {isAiLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-emerald-500/10">
                  <FiCpu className="text-emerald-500 text-sm" />
                </div>
                <div className="bg-slate-800 rounded-xl px-4 py-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion chips — shown when few messages */}
          {aiMessages.length <= 2 && (
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    sendAiMessage(s)
                  }}
                  className="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-emerald-400 hover:bg-slate-700 border border-slate-700 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <form
            onSubmit={handleSend}
            className="p-4 border-t border-slate-800 flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your finances..."
              className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 placeholder:text-slate-500 text-sm"
            />
            <button
              type="submit"
              disabled={isAiLoading}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all"
            >
              <FiSend size={18} />
            </button>
          </form>
        </div>

        {/* Side panel — quick stats */}
        <div className="space-y-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4">Quick Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Total Income</span>
                <span className="text-emerald-500 font-semibold">
                  ₹{totalIncome.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Total Expenses</span>
                <span className="text-red-400 font-semibold">
                  ₹{totalExpenses.toLocaleString()}
                </span>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
                <span className="text-slate-400 text-sm">Net Savings</span>
                <span className="text-cyan-400 font-bold text-lg">
                  ₹{currentSavings.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <FiCpu className="text-emerald-500" />
              <h3 className="text-white font-semibold text-sm">
                Powered by AI
              </h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              FinPilot uses LangChain + RAG to analyze your transaction history
              and provide personalized financial advice. Your data stays
              private and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AiInsights
