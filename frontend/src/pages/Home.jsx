import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiArrowRight,
  FiPieChart,
  FiTrendingUp,
  FiCpu,
  FiShield,
  FiActivity,
  FiUser,
  FiSend,
} from 'react-icons/fi'
import Navbar from '../components/layout/Navbar'

// Animation variants — reusable animation configs
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
}

// Feature cards data
const features = [
  {
    icon: FiTrendingUp,
    title: 'Smart Tracking',
    desc: 'Effortlessly track every income and expense. Categorize transactions and see where your money goes.',
    color: 'emerald',
  },
  {
    icon: FiCpu,
    title: 'AI-Powered Insights',
    desc: 'Chat with your AI financial advisor. Get personalized spending analysis and saving suggestions.',
    color: 'cyan',
  },
  {
    icon: FiPieChart,
    title: 'Budget Goals',
    desc: 'Set monthly budgets per category, define savings targets, and monitor your progress in real-time.',
    color: 'violet',
  },
]

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/30">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Animated badge */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-emerald-400 text-sm font-medium mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          AI-Powered Finance Management
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0.1}
          variants={fadeUp}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
        >
          Master Your Money with
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Intelligent Insights
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.2}
          variants={fadeUp}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
        >
          FinPilot AI analyzes your spending, helps you budget smarter, and
          provides personalized financial advice — so you can reach your savings
          goals faster.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.3}
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/register"
            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
          >
            Start Tracking Free <FiArrowRight />
          </Link>
          <a
            href="#features"
            className="flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all border border-slate-700 hover:border-slate-600"
          >
            See How It Works
          </a>
        </motion.div>
      </main>

      {/* ===== FEATURES SECTION ===== */}
      <section
        id="features"
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to{' '}
            <span className="text-emerald-500">Take Control</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Powerful features designed to make personal finance simple and
            intelligent.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-${feature.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon
                  className={`text-${feature.color}-500 text-xl`}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* ===== AI CHAT DEMO SECTION ===== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Personal Financial <span className="text-cyan-400">Genius</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Forget generic advice. FinPilot uses a state-of-the-art <strong>RAG (Retrieval-Augmented Generation)</strong> pipeline to connect directly with your real transactions. Ask a question, and our AI instantly searches your history to give you mathematically accurate, personalized guidance.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-1">
                  <FiShield className="text-emerald-500" />
                </div>
                <div className="text-left">
                  <h4 className="text-white font-semibold mb-1">No Hallucinations</h4>
                  <p className="text-slate-400 text-sm">Grounded entirely in your actual spending data.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0 mt-1">
                  <FiCpu className="text-cyan-500" />
                </div>
                <div className="text-left">
                  <h4 className="text-white font-semibold mb-1">Powered by Llama 3.3</h4>
                  <p className="text-slate-400 text-sm">Lightning-fast reasoning via the Groq engine.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Mock Chat UI */}
          <div className="flex-1 w-full max-w-lg">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-slate-800/50 px-4 py-3 border-b border-slate-800 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-white font-medium text-sm">FinPilot AI</span>
              </div>
              
              {/* Chat Body */}
              <div className="p-5 space-y-4">
                {/* User Message */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-3 flex-row-reverse"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
                    <FiUser className="text-slate-300 text-sm" />
                  </div>
                  <div className="max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed bg-emerald-500/10 text-emerald-100 border border-emerald-500/20 text-left">
                    Where am I overspending this month?
                  </div>
                </motion.div>

                {/* AI Message */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <FiCpu className="text-emerald-500 text-sm" />
                  </div>
                  <div className="max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed bg-slate-800 text-slate-300 text-left">
                    Based on your transactions, you've spent <strong className="text-white">₹4,200</strong> on Dining Out, which puts you over your ₹3,000 budget. Let's try cooking at home this weekend to get your savings goal back on track!
                  </div>
                </motion.div>
              </div>

              {/* Chat Input Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex gap-2">
                <div className="flex-1 bg-slate-800 rounded-lg px-3 py-2 text-slate-500 text-sm flex items-center text-left">
                  Type a message...
                </div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0">
                  <FiSend />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 text-center border-t border-slate-800/50">
        <h2 className="text-3xl font-bold mb-4">Ready to take control?</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">Join FinPilot today and let AI help you make smarter financial decisions.</p>
        <Link
            to="/register"
            className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-emerald-500/20"
        >
          Create Free Account
        </Link>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 border-t border-slate-800/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FiActivity className="text-emerald-500 text-xl" />
            <span className="text-white font-semibold tracking-wide">
              FinPilot <span className="text-emerald-500">AI</span>
            </span>
          </div>
          
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} FinPilot AI. All rights reserved.
          </div>
          
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="https://github.com/rishabh0078/FinPilot-AI---Intelligent-Finance-Tracker" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
