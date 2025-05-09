export const getWelcomeEmailTemplate = (name: string, appUrl: string) => {
  return {
    text: `
      Hello ${name},
      
      Thank you for signing up with Fitness First! We're excited to have you on board.
      
      You can now log in to your account and explore our products and services.
      
      Best regards,
      Fitness First Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4361ee;">Welcome to Fitness First!</h2>
        <p>Hello ${name},</p>
        <p>Thank you for signing up with Fitness First! We're excited to have you on board.</p>
        <p>You can now log in to your account and explore our products and services.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${appUrl}" style="background-color: #4361ee; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Visit Our Website</a>
        </div>
        <p>Best regards,<br>Fitness First Team</p>
      </div>
    `,
  }
}

export const getPasswordResetEmailTemplate = (resetLink: string) => {
  return {
    text: `
      Hello,
      
      You requested to reset your password. Please click the link below to reset your password:
      
      ${resetLink}
      
      If you didn't request this, you can safely ignore this email.
      
      The link will expire in 1 hour.
      
      Best regards,
      Fitness First Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4361ee;">Reset Your Password</h2>
        <p>Hello,</p>
        <p>You requested to reset your password. Please click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #4361ee; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Reset Password</a>
        </div>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>The link will expire in 1 hour.</p>
        <p>Best regards,<br>Fitness First Team</p>
      </div>
    `,
  }
}

export const getContactEmailTemplate = (name: string, email: string, subject: string, message: string) => {
  return {
    text: `
      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4361ee;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="margin-top: 20px;">
          <p><strong>Message:</strong></p>
          <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, "<br>")}</p>
        </div>
      </div>
    `,
  }
}
