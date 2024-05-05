"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, X, CircleCheckBig } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LoginInput, loginSchema } from "@/lib/validations/auth"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useSignIn } from "@/hooks/use-sign-in"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  })

  const submitError = form.formState.errors.root

  function onError(msg?: string) {
    form.setError("root", {
      type: "custom",
      message: msg ?? "Error logging in, please try again later",
    })
  }

  const {
    isPending,
    isSuccess,
    mutate: login,
  } = useSignIn({ onError, onResetForm: form.reset })

  const onSubmit = form.handleSubmit((data) => {
    form.clearErrors()
    login(data)
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {submitError && (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>
              {submitError.message ??
                "Error logging in, please try again later"}
            </AlertTitle>

            <button
              disabled={isPending}
              className="ml-auto"
              type="button"
              onClick={() => form.clearErrors("root")}
            >
              <X className="h-4 w-4" />
            </button>
          </Alert>
        )}

        {isSuccess && (
          <Alert variant="success">
            <CircleCheckBig className="h-5 w-5" />
            <AlertTitle>We sent a magic link to your email.</AlertTitle>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="email"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input autoFocus type="email" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                We&apos;ll send you a magic link to sign in.
              </FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" isLoading={isPending}>
          Continue
        </Button>
      </form>
    </Form>
  )
}
