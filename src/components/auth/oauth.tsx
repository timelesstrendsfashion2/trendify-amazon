"use client"

import * as React from "react"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { GoogleIcon } from "@/components/icons/google"

export function OAuth() {
  const [isPending, startTransition] = React.useTransition()

  async function login() {
    startTransition(async () => {
      await signIn("google")
    })
  }

  return (
    <Button
      variant={"outline"}
      className="w-full"
      disabled={isPending}
      onClick={login}
    >
      {isPending ? <Spinner /> : <GoogleIcon />}
      Continue with Google
    </Button>
  )
}
