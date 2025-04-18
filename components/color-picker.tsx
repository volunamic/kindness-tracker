"use client"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eraser } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

interface ColorPickerProps {
  colors: string[]
  selectedColor: string
  onSelectColor: (color: string) => void
  toggleable?: boolean
}

export function ColorPicker({ colors, selectedColor, onSelectColor, toggleable }: ColorPickerProps) {
  const [show, setShow] = useState(!toggleable)

  return (
    <div className="w-full">
      {toggleable && (
        <div className="flex flex-row items-center gap-2 mb-2 justify-center">
          <Button
            variant={selectedColor === "transparent" ? "destructive" : "outline"}
            size="sm"
            className="flex items-center gap-1"
            aria-label="Eraser"
            onClick={() => onSelectColor("transparent")}
            type="button"
          >
            <Eraser className="w-4 h-4" />
            Eraser
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setShow((s) => !s)}
            aria-expanded={show}
            type="button"
          >
            {show ? "Hide Colors" : "Show Colors"}
          </Button>
        </div>
      )}
      <AnimatePresence>
        {(show || !toggleable) && (
          <motion.div
            key="color-row"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-wrap gap-2 items-center justify-center sm:justify-start overflow-hidden p-2"
          >
            <div className="flex flex-wrap gap-2 justify-even">
              {colors.map((color) => (
                <button
                  key={color}
                  className={cn(
                    "w-8 h-8 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400",
                    selectedColor === color ? "border-gray-800 scale-110" : "border-gray-300",
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => onSelectColor(color)}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
