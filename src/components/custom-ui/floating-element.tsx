"use client"

import { motion } from "framer-motion"

const FloatingElements = () => {
  const elements = [
    { size: 4, delay: 0, duration: 15 },
    { size: 6, delay: 2, duration: 20 },
    { size: 3, delay: 4, duration: 18 },
    { size: 8, delay: 1, duration: 25 },
    { size: 5, delay: 3, duration: 22 },
    { size: 2, delay: 5, duration: 16 },
  ]

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {elements.map((element, i) => (
        <motion.div
          key={i}
          className="absolute border border-white/10 rounded-full"
          style={{
            width: `${element.size}rem`,
            height: `${element.size}rem`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}

      {/* Geometric Shapes */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`geo-${i}`}
          className="absolute border border-white/5"
          style={{
            width: "100px",
            height: "100px",
            left: `${20 + i * 20}%`,
            top: `${30 + i * 15}%`,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 30 + i * 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}

      {/* Particle Lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute bg-white/5"
          style={{
            width: "1px",
            height: "200px",
            left: `${10 + i * 12}%`,
            top: "0%",
          }}
          animate={{
            y: ["-200px", "100vh"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            delay: i * 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export default FloatingElements
