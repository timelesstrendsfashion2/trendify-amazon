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
    <div className="space-y-6 max-w-lg py-12 mx-auto w-full px-6">
      <div className="space-y-1">
        <Logo />
        <p className="text-lg text-muted-foreground">
          Welcome to Trendify. Please sign up to continue.
        </p>
      </div>

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
  )
}
