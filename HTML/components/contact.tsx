"use client"

import type React from "react"
import { useState } from "react"
import { sendContactEmail } from "@/lib/email-actions"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      try {
        const result = await sendContactEmail(formData)

        if (result.success) {
          setShowSuccess(true)
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          })
        } else {
          setErrors({ form: result.message || "Failed to send message. Please try again." })
        }
      } catch (error) {
        setErrors({ form: "An error occurred. Please try again." })
        console.error("Error sending email:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const resetForm = () => {
    setShowSuccess(false)
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setErrors({})
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Contact Us</h2>
        <div className="contact-form">
          {!showSuccess ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
                {errors.name && <div className="form-error visible">{errors.name}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                />
                {errors.email && <div className="form-error visible">{errors.email}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="How can we help you?"
                />
                {errors.subject && <div className="form-error visible">{errors.subject}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message here..."
                  rows={5}
                ></textarea>
                {errors.message && <div className="form-error visible">{errors.message}</div>}
              </div>
              {errors.form && <div className="form-error visible mb-4">{errors.form}</div>}
              <button type="submit" className="btn" style={{ width: "100%" }} disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          ) : (
            <div className="success-message visible">
              <i className="bi bi-check-circle"></i>
              <h3>Message Sent!</h3>
              <p>Thank you for contacting us. We'll get back to you soon!</p>
              <button className="btn btn-outline" onClick={resetForm}>
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
