"use server"

import { sendEmail } from "./email"
import { getContactEmailTemplate, getPasswordResetEmailTemplate, getWelcomeEmailTemplate } from "./email-templates"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

interface WelcomeEmailData {
  name: string
  email: string
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const { name, email, subject, message } = data

    // Validate input
    if (!name || !email || !subject || !message) {
      return { success: false, message: "All fields are required" }
    }

    const { html, text } = getContactEmailTemplate(name, email, subject, message)

    // Email options
    const emailOptions = {
      to: process.env.EMAIL_TO || "info@fitnessfirst.com",
      subject: `Contact Form: ${subject}`,
      text,
      html,
      replyTo: email,
    }

    // Send email
    await sendEmail(emailOptions)

    return { success: true, message: "Email sent successfully" }
  } catch (error) {
    console.error("Error sending contact email:", error)
    return { success: false, message: "Failed to send email" }
  }
}

export async function sendPasswordResetEmail(email: string) {
  try {
    // Validate input
    if (!email) {
      return { success: false, message: "Email is required" }
    }

    // In a real application, you would generate a unique token and store it in a database
    // with an expiration time, then include that token in the reset link
    const resetToken = Math.random().toString(36).substring(2, 15)
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`

    const { html, text } = getPasswordResetEmailTemplate(resetLink)

    // Email options
    const emailOptions = {
      to: email,
      subject: "Reset Your Password - Fitness First",
      text,
      html,
    }

    // Send email
    await sendEmail(emailOptions)

    return { success: true, message: "Password reset email sent" }
  } catch (error) {
    console.error("Error sending reset email:", error)
    return { success: false, message: "Failed to send reset email" }
  }
}

export async function sendWelcomeEmail(data: WelcomeEmailData) {
  try {
    const { name, email } = data

    // Validate input
    if (!name || !email) {
      return { success: false, message: "Name and email are required" }
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const { html, text } = getWelcomeEmailTemplate(name, appUrl)

    // Email options
    const emailOptions = {
      to: email,
      subject: "Welcome to Fitness First!",
      text,
      html,
    }

    // Send email
    await sendEmail(emailOptions)

    return { success: true, message: "Welcome email sent" }
  } catch (error) {
    console.error("Error sending welcome email:", error)
    return { success: false, message: "Failed to send welcome email" }
  }
}
