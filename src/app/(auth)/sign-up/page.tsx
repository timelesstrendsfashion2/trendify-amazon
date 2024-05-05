import Link from "next/link"
import { redirect } from "next/navigation"

import { OAuth } from "@/components/auth/oauth"
import { SignUpForm } from "@/components/auth/signup-form"
import { Logo } from "@/components/global/logo"
import { getSession } from "@/lib/auth"

export default async function SignUpPage() {
  const session = await getSession()

  if (session) {
    redirect("/")
  }

  return (
    <main className="flex items-center min-h-[calc(100vh-9rem)]">
      <div className="space-y-6 max-w-lg mx-auto w-full px-6 py-12">
        <h3 className="text-2xl font-bold">Welcome to Trendify!</h3>

        <SignUpForm />

        <div className="flex items-center w-full">
          <hr className="w-1/2 grow h-0.5 bg-accent" />
          <p className="text-xs text-muted-foreground px-4 shrink-0">OR</p>
          <hr className="w-1/2 grow h-0.5 bg-accent" />
        </div>

        <OAuth />

        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="underline underline-offset-4 text-primary font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  )
}
