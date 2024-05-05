import "./globals.css"
import { DM_Sans } from "next/font/google"

import { QureryProvider } from "@/providers/qurery-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Navbar } from "@/components/global/navbar"
import { Footer } from "@/components/global/footer"
import { METADATA } from "@/lib/constants"
import { ProgressBarProvider } from "@/providers/progress-bar-provider"

const font = DM_Sans({ subsets: ["latin"] })

export const metadata = METADATA

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <QureryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <ProgressBarProvider />
            <Navbar />
            <div className="mt-20 min-h-[calc(100vh-9rem)]">{children}</div>
            <Footer />
          </ThemeProvider>
        </QureryProvider>
      </body>
    </html>
  )
}
