import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    formData.append('userName', user.displayName);
    formData.append('userId', user.uid);
    fetch('https://formspree.io/f/meojbkee', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        form.reset();
        alert('Your query has been submitted');
      } else {
        alert('There was a problem submitting your query');
      }
    });
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <div className="contact-sections">
        {/* General Contact Form */}
        <div className="contact-form-section">
          <p className="contact-description">
            We would love to hear from you! Feel free to reach out with any questions or feedback.
          </p>
          {user ? (
            <form onSubmit={handleSubmit}>
              <div className="contact-form">
                <div className="input-group">
                  <label htmlFor="name" className="input-label">Name</label>
                  <input type="text" id="name" name='name' className="input-field" placeholder="Enter your name" required />
                </div>
                <div className="input-group">
                  <label htmlFor="email" className="input-label">Email</label>
                  <input type="email" id="email" name='email' className="input-field" placeholder="Enter your email" required />
                </div>
                <div className="input-group">
                  <label htmlFor="message" className="input-label">Message</label>
                  <textarea id="message" name="message" className="input-field textarea-field" placeholder="Enter your message" required></textarea>
                </div>
                <button className="submit-btn" type="submit">Send Message</button>
              </div>
            </form>
          ) : (
            <p className="text-danger">
              Please <Link to="/signin" className="text-primary">log in</Link> to submit a query.
            </p>
          )}
        </div>

        {/* Shopkeeper Registration Section */}
        <div className="shopkeeper-registration-section">
          <h2 className="section-title">Shopkeeper Registration</h2>
          <p className="contact-description">
            Are you a shopkeeper interested in joining rapidq?<br />
            Register your shop by filling out our Google Form.
          </p>
          <a
            href="https://forms.gle/V88q7bHDqd7JgtW96"
            target="_blank"
            rel="noopener noreferrer"
            className="google-form-link"
          >
            Register Shop
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
