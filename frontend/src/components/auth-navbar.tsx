"use client"

import { Link } from "react-router-dom"
import BackButton from "@/components/back-button.tsx";

interface AuthHeaderProps {
  showBackButton?: boolean
  title?: string
}

export function AuthHeader({ showBackButton = true }: AuthHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <BackButton />
          )}
          <Link to="/" className="text-xl font-bold uppercase">
            Zara
          </Link>
        </div>
      </div>
    </header>
  )
}
