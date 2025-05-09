"use client"

import type React from "react"
import { useState } from "react"
import { sendWelcomeEmail } from "@/lib/email-actions"

interface SignupModalProps {
  isVisible: boolean
  onClose: () => void
  onSwitchModal: () => void
}

export default function SignupModal({ isVisible, onClose, onSwitchModal }: SignupModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id.replace("signup-", "")]: value,
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) {
      newErrors.name = "Name is required"
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter"
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one lowercase letter"
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      try {
        // In a real app, you would register the user in your database here

        // Send welcome email
        const result = await sendWelcomeEmail({
          name: formData.name,
          email: formData.email,
        })

        if (result.success) {
          setShowSuccess(true)
        } else {
          setErrors({ form: result.message || "Failed to create account" })
        }
      } catch (error) {
        setErrors({ form: "An error occurred. Please try again." })
        console.error("Error creating account:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  if (!isVisible) return null

  return (
    <div className={`modal ${isVisible ? "visible" : ""}`} id="signup-modal">
      <div className="modal-header">
        <h2>Sign Up</h2>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="modal-body">
        {!showSuccess ? (
          <form id="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="signup-name">Full Name</label>
              <input
                type="text"
                id="signup-name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <div className="form-error visible">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="signup-email">Email</label>
              <input
                type="email"
                id="signup-email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <div className="form-error visible">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <input
                type="password"
                id="signup-password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && <div className="form-error visible">{errors.password}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="signup-confirm-password">Confirm Password</label>
              <input
                type="password"
                id="signup-confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && <div className="form-error visible">{errors.confirmPassword}</div>}
            </div>
            {errors.form && (
              <div className="form-error visible" style={{ marginBottom: "15px" }}>
                {errors.form}
              </div>
            )}
            <button type="submit" className="btn" style={{ width: "100%" }} disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>
        ) : (
          <div className="success-message visible">
            <i className="bi bi-check-circle"></i>
            <h3>Account Created!</h3>
            <p>Your account has been created successfully. Welcome to Fitness First!</p>
            <button className="btn btn-outline" onClick={onClose}>
              Continue to website
            </button>
          </div>
        )}
      </div>
      <div className="modal-footer">
        <p>
          Already have an account?{" "}
          <a
            href="#"
            className="form-link"
            onClick={(e) => {
              e.preventDefault()
              onSwitchModal()
            }}
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
