import { signIn } from "next-auth/react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { checkEmail } from "@/actions/auth"
import { LoginInput } from "@/lib/validations/auth"

type UseSignInProps = {
  onError: (msg?: string) => void
  onResetForm: () => void
}

export function useSignIn({ onError, onResetForm }: UseSignInProps) {
  return useMutation({
    async mutationFn(data: LoginInput) {
      const { error } = await checkEmail(data.email)

      if (error) {
        throw new Error(error)
      }

      const res = await signIn("email", {
        redirect: false,
        ...data,
      })

      if (res?.error) {
        throw new Error("Error signing in, please try again later.")
      } else {
        onResetForm()
        toast.success("Check your email", {
          description: "We've sent you an email with login link.",
        })
      }
    },
    onError(err) {
      onError(err.message)
    },
  })
}
