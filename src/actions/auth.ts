"use server"

import { db } from "@/lib/db"
import { SignUpInput } from "@/lib/validations/auth"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export async function checkEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return { error: `No user found with email ${email}` }
    }

    return { error: null }
  } catch (error) {
    return { error: "Something went wrong, please try again later" }
  }
}

export async function createUser(data: SignUpInput) {
  try {
    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: "USER",
      },
    })

    return { user }
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "Email already in use" }
    }

    return { error: "Something went wrong, please try again later" }
  }
}
