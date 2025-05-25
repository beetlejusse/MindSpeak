"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Shield, Zap, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Navbar from "@/components/custom-ui/navbar"
import Link from "next/link"
import AnimatedBackground from "@/components/custom-ui/animated-background"
import FloatingElements from "@/components/custom-ui/floating-element"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      <AnimatedBackground />
      <FloatingElements />

      <div className="relative z-10">
        <Navbar />

        <section className="min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-thin tracking-wider mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              MINDSPEAK
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl font-light text-gray-400 mb-12 tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Speak without identity
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Button
                size="lg"
                className="bg-transparent border border-white/20 hover:border-white/40 text-white hover:bg-white/5 px-12 py-4 rounded-none font-light text-lg backdrop-blur-sm transition-all duration-500 group"
              >
                <Link href="/sign-up" className="flex items-center gap-3">
                  ENTER
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}

export default HomePage
