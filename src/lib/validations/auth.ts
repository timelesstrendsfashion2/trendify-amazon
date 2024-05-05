import * as z from "zod"

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Please enter your email" })
    .min(1, { message: "Please enter your email" })
    .email({ message: "Please enter a valid email" }),
})

export type LoginInput = z.infer<typeof loginSchema>

export const signUpSchema = loginSchema.extend({
  name: z
    .string({ required_error: "Please enter your name" })
    .min(1, { message: "Please enter your name" }),
})

export type SignUpInput = z.infer<typeof signUpSchema>
