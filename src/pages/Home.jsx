import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'

const Home = () => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1c2c] to-[#928dab] px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-7xl h-74 bg-white/10 backdrop-blur-2xl border-4 border-white/30 rounded-3xl shadow-2xl p-8 md:p-16 flex flex-col items-center justify-center text-center"
            >
                <TypeAnimation
                    sequence={["Plan your day with clarity ✨", 1500, "Track tasks efficiently ⏱️", 1500, "Stay organized daily 🧠", 1500]}
                    speed={50}
                    repeat={Infinity}
                    className="text-white font-bold text-xl md:text-3xl mb-6"
                />

                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6"
                >
                    Welcome to your <span className="text-purple-400">ToDo</span> Hub
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-gray-200 text-base md:text-lg max-w-2xl mb-6"
                >
                    Manage tasks, set priorities, and achieve your goals with our simple yet powerful ToDo app. Tailored for your productivity.
                </motion.p>

                <Link
                    to="/tasks"
                    className=" w-[140px] rounded-full bg-purple-700 hover:bg-purple-900 text-white   font-semibold text-lg shadow-lg border-2 border-purple-500 transition-all duration-300"
                >
                    Get Started
                </Link>

            </motion.div>
        </div>
    )
}

export default Home
