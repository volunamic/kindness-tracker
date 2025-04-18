"use client"

import { motion } from "motion/react"

interface FlowerProps {
  color: string
  onClick: () => void
  className?: string
}

export function Flower({ color, onClick, className }: FlowerProps) {
  return (
    <motion.div
      className={`cursor-pointer transition-transform hover:scale-105 active:scale-95 ${className || ''}`.trim()}
      onClick={onClick}
      animate={{ scale: color !== "transparent" ? 1.15 : 1, rotate: color !== "transparent" ? 8 : 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 18,
        duration: 0.45,
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g>
          {/* Rounded outer petals only */}
          <path
            d="M50,20 
               C55,10 65,10 70,20 
               C75,10 85,15 85,25 
               C95,25 95,35 85,40 
               C95,45 90,55 80,55 
               C85,65 75,70 70,60 
               C65,70 55,70 50,60 
               C45,70 35,70 30,60 
               C25,70 15,65 20,55 
               C10,55 5,45 15,40 
               C5,35 5,25 15,25 
               C15,15 25,10 30,20 
               C35,10 45,10 50,20 Z"
            fill={color}
            stroke="#333"
            strokeWidth="2"
          />

          {/* Flower center */}
          <circle
            cx="50"
            cy="40"
            r="12"
            fill={color === "transparent" ? "white" : color === "#F8F9FA" ? "white" : "#FFEB3B"}
            stroke="#333"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </motion.div>
  )
}
