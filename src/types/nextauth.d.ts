import { USER_ROLE } from "@prisma/client"
import { type User } from "next-auth"

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    role: USER_ROLE
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string
      email: string
      role: USER_ROLE
    }
  }
}
