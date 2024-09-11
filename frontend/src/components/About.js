import React from 'react';
import './About.css';
import OurTeam from './OurTeam';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-banner">
        <h1>About QuickQ</h1>
        <p>Your smart solution for hassle-free food ordering</p>
      </section>

      <section className="about-content">
        <h2>Our Story</h2>
        <p>
          QuickQ was born out of a simple yet powerful idea: to make food ordering easier, faster, and more efficient. 
          What started as a vision to help customers skip long queues has grown into a platform that connects food lovers with their favorite shops in real time. 
          Our journey began with the goal of transforming how people experience food ordering, and today, we’re proud to serve [mention any specific markets or cities you're targeting].
        </p>

        <h2>What We Do</h2>
        <p>
          QuickQ is a mobile and web application designed to streamline food orders for both customers and vendors. 
          Customers can easily browse menus, place orders, and receive real-time updates from shop owners. 
          Vendors can efficiently manage orders, adjust menu availability, and provide accurate preparation times. 
          Our platform enhances communication between vendors and customers, making the entire process smoother and more reliable.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission at QuickQ is to revolutionize the food ordering experience by offering convenience, speed, and transparency. 
          We aim to empower local vendors while ensuring that customers enjoy a seamless and stress-free experience, whether they’re grabbing lunch on the go or placing a large order for an event.
        </p>

        <h2>Our Values</h2>
        <ul>
          <li>Efficiency - We strive to save time for both vendors and customers</li>
          <li>Innovation - Constantly improving to provide the best user experience</li>
          <li>Transparency - Clear communication at every step of the process</li>
          <li>Customer Satisfaction - Always putting our users first</li>
        </ul>

        <h2>Meet the QuickQ Team</h2>
        <p>
          The QuickQ team is composed of passionate innovators, developers, and customer service experts dedicated to making food ordering smarter. 
          Our team works tirelessly to ensure the app is constantly evolving and stays at the cutting edge of technology.
        </p>
        <OurTeam/>

        <h2>Get In Touch</h2>
        <p>
          We’d love to hear from you! Whether you're a customer, vendor, or just curious about QuickQ, feel free to <a href="/contact">contact us</a>. 
          Your feedback helps us grow and improve every day.
        </p>
      </section>
    </div>
  );
};

export default About;
