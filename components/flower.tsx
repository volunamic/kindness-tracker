"use client"

import { motion } from "motion/react"
import { ShapeDefinition } from "./flower-shapes"

interface FlowerProps {
  color: string
  onClick: () => void
  className?: string
  shape?: ShapeDefinition
}

export function Flower({ color, onClick, className, shape }: FlowerProps) {
  // Use default values if shape is not provided (for backward compatibility)
  const svgPath = shape?.svgPath || "M50,20 C55,10 65,10 70,20 C75,10 85,15 85,25 C95,25 95,35 85,40 C95,45 90,55 80,55 C85,65 75,70 70,60 C65,70 55,70 50,60 C45,70 35,70 30,60 C25,70 15,65 20,55 C10,55 5,45 15,40 C5,35 5,25 15,25 C15,15 25,10 30,20 C35,10 45,10 50,20 Z"
  const centerX = shape?.centerX || 50
  const centerY = shape?.centerY || 40
  const centerRadius = shape?.centerRadius || 12
  const shapeId = shape?.id || "flower"
  const transform = shape?.transform || ""

  // Determine if we should show the center circle based on shape type
  const showCenter = shapeId == "flower"

  // Adjust animation based on shape
  let rotationAmount = 8; // Default rotation
  let scaleAmount = color !== "transparent" ? 1.15 : 1; // Default scale

  // Special cases for different shapes
  if (shapeId === "butterfly") {
    rotationAmount = 0; // No rotation for butterfly
    scaleAmount = color !== "transparent" ? 1.1 : 1;
  } else if (shapeId === "star") {
    rotationAmount = 15; // More rotation for star
    scaleAmount = color !== "transparent" ? 1.2 : 1; // Slightly larger scale for star
  }

  // No custom component rendering needed

  // For all other shapes, use the SVG path approach
  return (
    <motion.div
      className={`cursor-pointer transition-transform hover:scale-105 active:scale-95 ${className || ''}`.trim()}
      onClick={onClick}
      animate={{ scale: scaleAmount, rotate: color !== "transparent" ? rotationAmount : 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 18,
        duration: 0.45,
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g transform={transform}>
          {/* Shape path */}

          <path
            d={svgPath}
            fill={color}
            stroke="#333"
            strokeWidth="2"
          />

          {/* Shape center - only shown for certain shapes */}
          {showCenter && (
            <circle
              cx={centerX}
              cy={centerY}
              r={centerRadius}
              fill={color === "transparent" ? "white" : color === "#F8F9FA" ? "white" : "#FFEB3B"}
              stroke="#333"
              strokeWidth="1.5"
            />
          )}
        </g>
      </svg>
    </motion.div>
  )
}
