"use client"

import { Star, StarHalf } from "lucide-react"

import { cn } from "@/lib/utils"

type RatingStarsProps = {
  rating: string
  className?: string
}

export function RatingStars({ rating, className }: RatingStarsProps) {
  const numRating = Number(rating)
  const fullStars = Math.floor(numRating)
  const hasHalfStar = numRating % 1 !== 0

  return (
    <div className="flex items-center">
      {(() => {
        const stars = []
        for (let i = 0; i < fullStars; i++) {
          stars.push(
            <Star
              key={i}
              strokeWidth={0}
              className={cn("fill-yellow-300 w-5 h-5", className)}
            />
          )
        }
        if (hasHalfStar) {
          stars.push(
            <StarHalf
              key={fullStars}
              strokeWidth={0}
              className={cn("fill-yellow-300 w-5 h-5", className)}
            />
          )
        }

        return stars
      })()}
    </div>
  )
}
