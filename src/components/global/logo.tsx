import Image from "next/image"
import Link from "next/link"

import logo from "@/../public/logo.png"
import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className="flex w-fit relative">
      <Image
        priority
        src={logo}
        alt="Trendify Logo"
        className={cn("object-contain w-48", className)}
      />
      <sub className="text-xs text-primary ml-1">(Amazon)</sub>
    </Link>
  )
}
