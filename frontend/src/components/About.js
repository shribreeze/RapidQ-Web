import React from 'react';
import './About.css';
import OurTeam from './OurTeam';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-banner">
        <h1>About rapidq</h1>
        <p>Your smart solution for hassle-free food ordering</p>
      </section>

      <section className="about-content">
        <div className='ourStory'>
          <div style={{ padding: "10px", alignContent: "center", textAlign: "center" }}>
            <h2>Our Story</h2>
            <p>
              rapidq was born out of a simple yet powerful idea: to make food ordering easier, faster, and more efficient.
              Initially driven by a vision to help customers skip long queues, it has evolved into a platform that seamlessly connects food lovers with their favorite shops in real time.
              Our journey began with the goal of transforming the food ordering experience, offering convenience and speed while maintaining quality service.
              Today, we are proud to serve the vibrant community at Chandigarh University, where rapidq has become a trusted partner in simplifying food ordering and enhancing the dining experience.
            </p>
          </div>
          <div>
            <img src="./misc/our-story.webp" alt="Our Story" style={{ width: "400px" }} />
          </div>
        </div>

        <div className='whatWeDo'>
          <div>
            <img src="/misc/what-we-do.webp" alt="What We Do" style={{ width: "400px" }} />
          </div>
          <div style={{ padding: "10px", alignContent: "center", textAlign: "center" }}>
            <h2 style={{ color: "#f9d002" }}>What We Do</h2>
            <p>
              rapidq is a mobile and web application designed to simplify and streamline food ordering for both customers and vendors.
              Customers can easily browse diverse menus, customize their orders, and place them with just a few taps, all while receiving real-time updates from shop owners on order status and preparation times.
              Vendors, on the other hand, can efficiently manage incoming orders, adjust menu availability, and provide customers with accurate wait times.
              Our platform enhances communication, ensuring transparency and reliability.
              By bridging the gap between vendors and customers, rapidq makes the entire food ordering process smoother, faster, and more efficient.
            </p>
          </div>
        </div>

        <div className='ourMission'>
          <span className='ourMission-1' style={{ padding: "10px", alignContent: "center", textAlign: "center" }}>
            <h2>Our Mission</h2>
            <p>
              At rapidq, our mission is to revolutionize the food ordering experience by providing unmatched convenience, speed, and transparency.
              We strive to empower local vendors, enabling them to efficiently manage orders while offering customers a seamless, stress-free experience.
              Whether it's a quick lunch or a large event order, our goal is to ensure that every interaction is smooth, reliable, and satisfying for both customers and vendors.
              Through innovation and dedication, we aim to transform how people connect with their favorite food spots, making the process faster, simpler, and more enjoyable for everyone involved.
            </p>
          </span>
          <span className='ourMission-2'>
            <img src="/misc/our-mission.webp" alt="Our Mission" style={{ width: "400px" }} />
          </span>
        </div>

        <div className='ourValues'>
          <div>
            <img src="/misc/our-value.webp" alt="Our Value" style={{ width: "400px" }} />
          </div>
          <div style={{ padding: "10px", alignContent: "center" }}>
            <h2 style={{ textAlign: "center", color: "#f9d002" }}>Our Values</h2>
            <ul>
              <li>Efficiency - We are committed to saving time for both vendors and customers by streamlining the entire ordering process.</li>
              <li>Innovation - We constantly improve our platform to deliver the best possible user experience.</li>
              <li>Transparency - We believe in clear, open communication at every step, ensuring both customers and vendors stay informed.</li>
              <li>Customer Satisfaction - Our users are at the heart of everything we do, and we prioritize their satisfaction above all else.</li>
            </ul>
          </div>
        </div>

        {/* <h2>Meet the rapidq Team</h2>
        <p>
          The rapidq team is composed of passionate innovators, developers, and customer service experts dedicated to making food ordering smarter. 
          Our team works tirelessly to ensure the app is constantly evolving and stays at the cutting edge of technology.
        </p> */}

      </section>

      <section className='about-content-team'>
        <OurTeam />
      </section>

      {/* <h2>Get In Touch</h2>
        <p>
          We’d love to hear from you! Whether you're a customer, vendor, or just curious about rapidq, feel free to <a href="/contact">contact us</a>. 
          Your feedback helps us grow and improve every day.
        </p> */}
    </div>
  );
};

export default About;
