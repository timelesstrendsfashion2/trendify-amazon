import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions, getServerSession } from "next-auth"

import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"

import { db } from "@/lib/db"
import { sendMail } from "./send-mail"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      type: "email",
      secret: process.env.MAGICLINK_SECRET,
      async sendVerificationRequest({ identifier, url }) {
        await sendMail(identifier, url)
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.role = token.role
        session.user.image = token.picture
      }

      return session
    },

    async jwt({ token, user }) {
      const dbUser = await db.user.findUnique({
        where: {
          email: token.email ?? "",
        },
      })

      if (!dbUser) {
        token.id = user!.id
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        role: dbUser.role,
      }
    },
  },
}

export async function getSession() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return null
    }

    return session.user
  } catch (error) {
    return null
  }
}
