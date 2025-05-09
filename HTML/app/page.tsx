"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import LoginModal from "@/components/login-modal"
import SignupModal from "@/components/signup-modal"

export default function Home() {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const openModal = (modalId: string) => {
    setActiveModal(modalId)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  const switchModal = (toModalId: string) => {
    setActiveModal(toModalId)
  }

  return (
    <div id="main-section">
      <Navbar openModal={openModal} />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />

      {/* Modal Overlay */}
      <div className={`modal-overlay ${activeModal ? "visible" : ""}`} onClick={closeModal}></div>

      {/* Login Modal */}
      <LoginModal
        isVisible={activeModal === "login"}
        onClose={closeModal}
        onSwitchModal={() => switchModal("signup")}
      />

      {/* Signup Modal */}
      <SignupModal
        isVisible={activeModal === "signup"}
        onClose={closeModal}
        onSwitchModal={() => switchModal("login")}
      />
    </div>
  )
}
