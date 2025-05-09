const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Replace with your email provider's SMTP server
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com', // Your email address
    pass: process.env.EMAIL_PASSWORD || 'your-app-password' // Your email password or app password
  }
});

// Verify transporter connection
transporter.verify(function(error, success) {
  if (error) {
    console.log('SMTP server connection error:', error);
  } else {
    console.log('SMTP server connection established');
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: process.env.EMAIL_TO || 'info@fitnessfirst.com',
      replyTo: email,
      subject: `Contact Form: ${subject}`,
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
            <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully');
    
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

// Password reset endpoint
app.post('/api/send-reset-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validate input
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    // In a real application, you would generate a unique token and store it in a database
    // with an expiration time, then include that token in the reset link
    const resetToken = Math.random().toString(36).substring(2, 15);
    const resetLink = `${process.env.WEBSITE_URL || 'http://localhost:3000'}/reset-password.html?token=${resetToken}&email=${encodeURIComponent(email)}`;
    
    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'Reset Your Password - Fitness First',
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
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
    
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error sending reset email:', error);
    res.status(500).json({ message: 'Failed to send reset email' });
  }
});

// Signup welcome email endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // In a real application, you would:
    // 1. Check if the user already exists
    // 2. Hash the password
    // 3. Store the user in a database
    
    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'Welcome to Fitness First!',
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
            <a href="${process.env.WEBSITE_URL || 'http://localhost:3000'}" style="background-color: #4361ee; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Visit Our Website</a>
          </div>
          <p>Best regards,<br>Fitness First Team</p>
        </div>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
    
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the website`);
});
