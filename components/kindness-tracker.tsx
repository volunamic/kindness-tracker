"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Flower } from "@/components/flower"
import { ColorPicker } from "@/components/color-picker"
import { Download, Share2, Save, RefreshCw } from "lucide-react"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

// Define the tracker data structure
interface TrackerData {
  name: string
  flowers: {
    id: number
    color: string
  }[]
}

// Default colors for the color picker (no eraser/white)
const defaultColors = [
  "#FF6B6B", // Red
  "#FFD93D", // Yellow
  "#6BCB77", // Green
  "#4D96FF", // Blue
  "#9B72AA", // Purple
  "#FF9A8B", // Pink
  "#FFC75F", // Orange
]

export default function KindnessTracker() {
  const [name, setName] = useState("")
  const [selectedColor, setSelectedColor] = useState(defaultColors[0])
  const [flowers, setFlowers] = useState<{ id: number; color: string }[]>(
    Array.from({ length: 36 }, (_, i) => ({ id: i, color: "transparent" })),
  )
  const trackerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("kindnessTracker")
    if (savedData) {
      try {
        const parsedData: TrackerData = JSON.parse(savedData)
        setName(parsedData.name)
        setFlowers(parsedData.flowers)
      } catch (error) {
        console.error("Error loading data from localStorage:", error)
      }
    }
  }, [])

  // Handle coloring a flower
  const handleColorFlower = (id: number) => {
    setFlowers((prev) => prev.map((flower) => (flower.id === id ? { ...flower, color: selectedColor } : flower)))
  }

  // Save progress to localStorage
  const saveToLocalStorage = () => {
    const data: TrackerData = {
      name,
      flowers,
    }
    localStorage.setItem("kindnessTracker", JSON.stringify(data))
    toast({
      title: "Progress Saved",
      description: "Your kindness tracker has been saved to your browser.",
    })
  }

  // Clear all flowers back to initial state with direct confirmation
  const handleClearAll = () => {
    // Use the browser's built-in confirm dialog
    if (window.confirm("Are you sure you want to clear all flowers? This action cannot be undone.")) {
      setFlowers(Array.from({ length: 36 }, (_, i) => ({ id: i, color: "transparent" })))

      // Update localStorage with cleared data
      const data: TrackerData = {
        name,
        flowers: Array.from({ length: 36 }, (_, i) => ({ id: i, color: "transparent" })),
      }
      localStorage.setItem("kindnessTracker", JSON.stringify(data))

      toast({
        title: "All Cleared",
        description: "All flowers have been reset to their initial state.",
      })
    }
  }

  // Export to PDF
  const exportToPDF = async () => {
    if (!trackerRef.current) return

    try {
      const canvas = await html2canvas(trackerRef.current, {
        scale: 2,
        backgroundColor: "white",
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Calculate dimensions to fit the PDF page
      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save("my-kindness-tracker.pdf")

      toast({
        title: "PDF Exported",
        description: "Your kindness tracker has been exported as a PDF.",
      })
    } catch (error) {
      console.error("Error exporting to PDF:", error)
      toast({
        title: "Export Failed",
        description: "There was an error exporting your tracker to PDF.",
        variant: "destructive",
      })
    }
  }

  // Share functionality
  const shareTracker = async () => {
    if (!trackerRef.current) return

    try {
      const canvas = await html2canvas(trackerRef.current, {
        scale: 2,
        backgroundColor: "white",
      })

      canvas.toBlob(async (blob) => {
        if (!blob) {
          throw new Error("Could not create image blob")
        }

        if (navigator.share) {
          const file = new File([blob], "my-kindness-tracker.png", { type: "image/png" })
          await navigator.share({
            title: "My Kindness Tracker",
            text: `${name}'s Kindness Tracker`,
            files: [file],
          })
          toast({
            title: "Shared Successfully",
            description: "Your kindness tracker has been shared.",
          })
        } else {
          // Fallback for browsers that don't support Web Share API
          const url = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = "my-kindness-tracker.png"
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)

          toast({
            title: "Image Downloaded",
            description: "Your browser doesn't support sharing. The image has been downloaded instead.",
          })
        }
      }, "image/png")
    } catch (error) {
      console.error("Error sharing tracker:", error)
      toast({
        title: "Share Failed",
        description: "There was an error sharing your tracker.",
        variant: "destructive",
      })
    }
  }

  const handleSelectColor = (color: string) => {
    setSelectedColor(color)
  }

  return (
    <div className="w-full max-w-md mx-auto p-2 bg-white rounded-lg shadow-md flex flex-col gap-4 sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl"
      style={{ minHeight: '100vh', boxSizing: 'border-box' }}>
      <h1 className="worksheet-font text-xl sm:text-3xl font-bold text-center mb-0 mt-2 flex items-center justify-center gap-2">
        <span role="img" aria-label="Butterfly" className="text-3xl sm:text-4xl">🦋</span>
        My Kindness Tracker
      </h1>
      <div className="flex flex-col items-center mb-2">
        <label htmlFor="name" className="worksheet-font text-xs sm:text-base font-medium text-gray-700 mb-1">My name is</label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="worksheet-font mb-1 text-xs sm:text-base px-2 py-1 rounded-none border-0 border-b-2 border-gray-300 focus:border-blue-400 focus:ring-0 w-60 sm:w-80 text-center"
        />
      </div>
      <div className="worksheet-font text-center text-sm sm:text-base mb-2">Color a flower for each act of kindness.</div>
      <div
        ref={trackerRef}
        className="grid grid-cols-6 gap-[0.25rem] w-fit mx-auto bg-white p-2 rounded-md border-0 sm:border border-gray-200"
        style={{ minHeight: '340px' }}
      >
        {flowers.map((flower) => (
          <Flower
            key={flower.id}
            color={flower.color}
            onClick={() => handleColorFlower(flower.id)}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 cursor-pointer transition-transform duration-150 hover:scale-110"
          />
        ))}
      </div>
      <div className="flex flex-row items-center justify-center w-full mt-4 mb-2">
        <div className="mx-auto">
          <ColorPicker
            colors={defaultColors}
            selectedColor={selectedColor}
            onSelectColor={handleSelectColor}
            toggleable={true}
          />
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-center mt-4">
        <Button onClick={exportToPDF} className="w-auto text-xs sm:text-base" variant="outline" size="sm">
          <Download className="mr-0 sm:mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Download PDF</span>
        </Button>
        <Button onClick={shareTracker} className="w-auto text-xs sm:text-base" variant="outline" size="sm">
          <Share2 className="mr-0 sm:mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>
        <Button onClick={handleClearAll} className="w-auto text-xs sm:text-base" variant="destructive" size="sm">
          <RefreshCw className="mr-0 sm:mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Clear All</span>
        </Button>
      </div>
      <div className="flex flex-col items-center mt-6">
        <div className="worksheet-font text-green-600 font-bold text-lg mb-1">Make Time to Bee a Friend <span className="inline-block">🐝</span></div>
      </div>
      <div className="flex flex-col items-center mt-6">
        <span className="worksheet-font text-xs text-gray-400 flex items-center gap-1">
          <span role="img" aria-label="Bee" className="text-lg">🐝</span>
          <span>Bee kind!</span>
        </span>
        <a
        href="https://github.com/volunamic/kindness-tracker"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] text-gray-300 hover:text-gray-300 opacity-80 hover:opacity-100 transition-opacity z-0 select-none pointer-events-auto"
        tabIndex={-1}
        aria-label="Made by Volunamic (hidden link)"
      >
        made by volunamic
      </a>
      </div>
      {/* Hidden credit link */}
      
      <Toaster />
    </div>
  )
}
