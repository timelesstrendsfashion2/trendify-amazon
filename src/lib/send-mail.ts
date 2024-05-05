import { Resend } from "resend"
import { magicEmail } from "./constants"

export async function sendMail(to: string, magicLink: string) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    to,
    from: `Resend <onboarding@resend.dev>`,
    subject: "Your magic link",
    html: magicEmail(magicLink),
    text: `Your magic link is: ${magicLink}`,
  })
}
