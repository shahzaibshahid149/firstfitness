"use client"

import type React from "react"
import { useState } from "react"
import { sendPasswordResetEmail } from "@/lib/email-actions"

interface LoginModalProps {
  isVisible: boolean
  onClose: () => void
  onSwitchModal: () => void
}

export default function LoginModal({ isVisible, onClose, onSwitchModal }: LoginModalProps) {
  const [showForgotForm, setShowForgotForm] = useState(false)
  const [showForgotSuccess, setShowForgotSuccess] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [forgotEmail, setForgotEmail] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setLoginData({
      ...loginData,
      [id.replace("login-", "")]: value,
    })
  }

  const handleForgotEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForgotEmail(e.target.value)
  }

  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {}

    if (!loginData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!loginData.password) {
      newErrors.password = "Password is required"
    } else if (loginData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateForgotForm = () => {
    const newErrors: Record<string, string> = {}

    if (!forgotEmail) {
      newErrors.forgotEmail = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      newErrors.forgotEmail = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateLoginForm()) {
      // In a real app, you would send this data to your backend
      alert("Login successful!")
      onClose()
    }
  }

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForgotForm()) {
      setIsSubmitting(true)

      try {
        const result = await sendPasswordResetEmail(forgotEmail)

        if (result.success) {
          setShowForgotSuccess(true)
        } else {
          setErrors({ forgotEmail: result.message || "Failed to send reset email" })
        }
      } catch (error) {
        setErrors({ forgotEmail: "An error occurred. Please try again." })
        console.error("Error sending reset email:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const showLoginForm = () => {
    setShowForgotForm(false)
    setShowForgotSuccess(false)
  }

  const showForgotPassword = () => {
    setShowForgotForm(true)
    setShowForgotSuccess(false)
  }

  if (!isVisible) return null

  return (
    <div className={`modal ${isVisible ? "visible" : ""}`} id="login-modal">
      <div className="modal-header">
        <h2>Login</h2>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="modal-body">
        {!showForgotForm && !showForgotSuccess && (
          <form id="login-form" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                placeholder="your.email@example.com"
                value={loginData.email}
                onChange={handleLoginChange}
              />
              {errors.email && <div className="form-error visible">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={handleLoginChange}
              />
              {errors.password && <div className="form-error visible">{errors.password}</div>}
            </div>
            <a
              href="#"
              className="forgot-link"
              onClick={(e) => {
                e.preventDefault()
                showForgotPassword()
              }}
            >
              Forgot your password?
            </a>
            <button type="submit" className="btn" style={{ width: "100%" }}>
              Sign in
            </button>
          </form>
        )}

        {/* Forgot Password Form */}
        {showForgotForm && !showForgotSuccess && (
          <div id="forgot-password-form">
            <div style={{ marginBottom: "20px" }}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  showLoginForm()
                }}
                style={{ color: "#4361ee", display: "flex", alignItems: "center" }}
              >
                <i className="bi bi-arrow-left" style={{ marginRight: "5px" }}></i> Back to Login
              </a>
            </div>
            <h3 style={{ marginBottom: "15px" }}>Reset Password</h3>
            <p style={{ marginBottom: "20px", color: "#666" }}>Enter your email to receive a password reset link</p>
            <form id="forgot-form" onSubmit={handleForgotSubmit}>
              <div className="form-group">
                <label htmlFor="forgot-email">Email</label>
                <input
                  type="email"
                  id="forgot-email"
                  placeholder="your.email@example.com"
                  value={forgotEmail}
                  onChange={handleForgotEmailChange}
                />
                {errors.forgotEmail && <div className="form-error visible">{errors.forgotEmail}</div>}
              </div>
              <button type="submit" className="btn" style={{ width: "100%" }} disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send reset link"}
              </button>
            </form>
          </div>
        )}

        {/* Forgot Password Success Message */}
        {showForgotSuccess && (
          <div className="success-message visible">
            <i className="bi bi-check-circle"></i>
            <h3>Check your email</h3>
            <p>We've sent a password reset link to your email address.</p>
            <button className="btn btn-outline" onClick={showLoginForm}>
              Return to login
            </button>
          </div>
        )}
      </div>
      <div className="modal-footer">
        <p>
          Don't have an account?{" "}
          <a
            href="#"
            className="form-link"
            onClick={(e) => {
              e.preventDefault()
              onSwitchModal()
            }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
