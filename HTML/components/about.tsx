import Image from "next/image"

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>Fitness Supplements & Equipment</h2>
        <div className="about-content">
          <p>
            At Fitness First, we provide high-quality protein supplements, vitamins, and gym equipment designed to
            maximize your workout performance and results.
          </p>
          <Image src="/images/p5.jpg" alt="Fitness Equipment" className="about-img" width={500} height={300} />
        </div>
      </div>
    </section>
  )
}
