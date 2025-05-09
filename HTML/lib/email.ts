import nodemailer from "nodemailer"

type EmailPayload = {
  to: string
  subject: string
  text: string
  html: string
  replyTo?: string
}

// Create a reusable transporter
const getTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
}

export const sendEmail = async (payload: EmailPayload) => {
  const transporter = getTransporter()

  const mailOptions = {
    from: process.env.EMAIL_FROM || "your-email@gmail.com",
    ...payload,
  }

  return await transporter.sendMail(mailOptions)
}
