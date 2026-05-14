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

      {/* ===== STATS BAR ===== */}
      <section className="py-16 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '10K+', label: 'Active Users' },
            { value: '₹2M+', label: 'Tracked Monthly' },
            { value: '99.9%', label: 'Uptime' },
            { value: '4.9★', label: 'User Rating' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-slate-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 px-4 text-center border-t border-slate-800/50">
        <div className="flex items-center justify-center gap-2 mb-4">
          <FiActivity className="text-emerald-500 text-xl" />
          <span className="text-white font-bold text-lg">
            FinPilot <span className="text-emerald-500">AI</span>
          </span>
        </div>
        <p className="text-slate-500 text-sm">
          © 2026 FinPilot AI. Built with React, FastAPI & LangChain.
        </p>
      </footer>
    </div>
  )
}

export default Home
