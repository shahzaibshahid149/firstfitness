"use client"

import { useState } from "react"

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <h3>Contact Us</h3>
            <p>If you have any questions, feel free to reach out to us!</p>
            <ul className="contact-info">
              <li>Email: info@fitnessfirst.com</li>
              <li>Phone: +92 307 7613426</li>
              <li>Address: 123 Fit St, fsd City</li>
            </ul>
          </div>
          <div>
            <h3>Follow Us</h3>
            <div className="social-links">
              <i className="bi bi-instagram"></i>
              <i className="bi bi-facebook"></i>
              <i className="bi bi-twitter"></i>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Fitness First. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
