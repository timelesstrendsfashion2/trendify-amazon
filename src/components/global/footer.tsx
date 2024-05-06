import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="border-t h-16 px-8 py-2 flex items-center gap-2 sm:flex-row flex-col sm:justify-between">
      <Logo className="w-20" />
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Trendify. All rights reserved.
      </p>
    </footer>
  )
}
