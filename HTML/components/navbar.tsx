"use client"

interface NavbarProps {
  openModal: (modalId: string) => void
}

export default function Navbar({ openModal }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <h1>Fitness First</h1>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <div className="auth-buttons">
          <button className="btn btn-outline" onClick={() => openModal("login")}>
            Login
          </button>
          <button className="btn" onClick={() => openModal("signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  )
}
