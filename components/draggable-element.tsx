"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowRightIcon as ArrowsPointingOut, ArrowRightLeftIcon as ArrowsRightLeft } from "lucide-react"

interface DraggableElementProps {
  children: React.ReactNode
  className?: string
  initialPosition?: { x: number; y: number }
}

export default function DraggableElement({
  children,
  className = "",
  initialPosition = { x: 0, y: 0 },
}: DraggableElementProps) {
  const [position, setPosition] = useState(initialPosition)
  const [size, setSize] = useState({ width: 300, height: 200 })
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isRotating, setIsRotating] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const startPosRef = useRef({ x: 0, y: 0 })
  const startSizeRef = useRef({ width: 0, height: 0 })
  const startRotationRef = useRef(0)

  const handleMouseDown = (e: React.MouseEvent, action: "drag" | "resize" | "rotate") => {
    e.preventDefault()
    startPosRef.current = { x: e.clientX, y: e.clientY }

    if (action === "drag") {
      setIsDragging(true)
    } else if (action === "resize") {
      setIsResizing(true)
      startSizeRef.current = { ...size }
    } else if (action === "rotate") {
      setIsRotating(true)
      startRotationRef.current = rotation
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - startPosRef.current.x
      const dy = e.clientY - startPosRef.current.y
      setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }))
      startPosRef.current = { x: e.clientX, y: e.clientY }
    } else if (isResizing) {
      const dx = e.clientX - startPosRef.current.x
      const dy = e.clientY - startPosRef.current.y
      setSize({
        width: Math.max(100, startSizeRef.current.width + dx),
        height: Math.max(100, startSizeRef.current.height + dy),
      })
    } else if (isRotating) {
      if (!elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const startAngle = Math.atan2(startPosRef.current.y - centerY, startPosRef.current.x - centerX)

      const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX)

      const angleDiff = (currentAngle - startAngle) * (180 / Math.PI)
      setRotation(startRotationRef.current + angleDiff)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
    setIsRotating(false)
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }

  return (
    <div
      ref={elementRef}
      className={`absolute cursor-move ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: isDragging || isResizing || isRotating ? 10 : 1,
      }}
      onMouseDown={(e) => handleMouseDown(e, "drag")}
    >
      {children}

      {/* Resize handle */}
      <div
        className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize flex items-center justify-center bg-white/50 rounded-full backdrop-blur-sm border border-white/50"
        onMouseDown={(e) => {
          e.stopPropagation()
          handleMouseDown(e, "resize")
        }}
      >
        <ArrowsPointingOut className="w-4 h-4 text-gray-700" />
      </div>

      {/* Rotate handle */}
      <div
        className="absolute top-0 right-0 w-6 h-6 cursor-crosshair flex items-center justify-center bg-white/50 rounded-full backdrop-blur-sm border border-white/50"
        onMouseDown={(e) => {
          e.stopPropagation()
          handleMouseDown(e, "rotate")
        }}
      >
        <ArrowsRightLeft className="w-4 h-4 text-gray-700" />
      </div>
    </div>
  )
}

