import Image from "next/image"

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <h2>Our Services</h2>
        <div className="service-item">
          <Image src="/images/p1.jpg" alt="Protein Supplements" width={300} height={200} />
          <div className="service-text">
            <h3>Protein Supplements</h3>
            <p>We offer a wide range of protein powders, shakes, and bars to fuel your workouts and recovery.</p>
          </div>
        </div>
        <div className="service-item">
          <Image src="/images/p2.jpg" alt="Gym Equipment" width={300} height={200} />
          <div className="service-text">
            <h3>Gym Equipment</h3>
            <p>
              We provide the latest fitness equipment, from weights to cardio machines, designed to enhance your fitness
              goals.
            </p>
          </div>
        </div>
        <div className="service-item">
          <Image src="/images/p3.png" alt="Vitamins & Supplements" width={300} height={200} />
          <div className="service-text">
            <h3>Vitamins & Supplements</h3>
            <p>Our supplements are tailored to support overall health, strength, and energy for peak performance.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
