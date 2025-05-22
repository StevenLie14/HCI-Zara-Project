"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoadingScreenProps {
  isLoading?: boolean
  text?: string
  fullScreen?: boolean
  className?: string
  logo?: boolean
  spinnerSize?: number
  spinnerColor?: string
}

const LoadingScreen = ({
                                isLoading = true,
                                text = "Loading",
                                fullScreen = true,
                                className,
                                logo = true,
                                spinnerSize = 40,
                                spinnerColor = "black",
                              }: LoadingScreenProps) => {
  const [dots, setDots] = useState(".")

  useEffect(() => {
    if (!isLoading) return

    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "."
        return prev + "."
      })
    }, 500)

    return () => clearInterval(interval)
  }, [isLoading])

  if (!isLoading) return null

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-white",
        fullScreen ? "fixed inset-0 z-50" : "w-full h-full min-h-[200px]",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4">
        {logo && (
          <div className="mb-4">
            <h1 className="text-3xl font-bold uppercase tracking-widest">ZARA</h1>
          </div>
        )}
        <Loader2 className="animate-spin" size={spinnerSize} color={spinnerColor} />
        {text && (
          <p className="text-sm font-medium text-gray-600 mt-4">
            {text}
            <span className="inline-block w-6">{dots}</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default LoadingScreen
