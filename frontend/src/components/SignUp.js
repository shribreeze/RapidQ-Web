import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup } from 'firebase/auth';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    iAgree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      alert('A verification email has been sent to your email address. Please verify your email before logging in.');

      // Sign out the user to prevent access before email verification
      await auth.signOut();

      // Redirect to sign in page after successful registration
      navigate('/signIn');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('User already registered with this email. Please use a different email.');
      } else {
        console.error(err);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  const handleClick = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      localStorage.setItem('email', data.user.email);
      alert('User signed in successfully');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to sign in with Google.');
    }
  };

  return (
    <section className="p-3 p-md-4 p-xl-5" id="SignupSection">
      <div className="container">
        <div className="row justify-content-left">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
            <div className="card border border-light-subtle rounded-4" id="SignUpCard">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-5">
                      <h2 className="h4 text-center" style={{ color: '#462B9C' }}>
                        <strong>Registration</strong>
                      </h2>
                      <h3 className="fs-6 fw-normal text-dark text-center m-0">
                        Enter your details to register
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12">
                    <div className="d-flex gap-2 gap-sm-3 justify-content-center">
                      <button className="btn bsb-btn-xl btn-danger" onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                          <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                        </svg>
                        <span className="ms-2 fs-6 text-uppercase">Sign in With Google</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <p>or</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row gy-3 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          id="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          id="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="lastName" className="form-label">
                          Last Name
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          id="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                      </div>
                      <small className="text-muted">Min 6 chars: uppercase, lowercase, number & special character</small>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          name="confirmPassword"
                          id="confirmPassword"
                          placeholder="Confirm Password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="confirmPassword" className="form-label">
                          Confirm Password
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="iAgree"
                          id="iAgree"
                          checked={formData.iAgree}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-check-label" htmlFor="iAgree">
                          I agree to the <Link to="/terms">terms and conditions</Link>
                        </label>
                      </div>
                    </div>
                    <div className="col-12 mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-3"
                        disabled={!formData.iAgree}
                      >
                        Register
                      </button>
                    </div>
                    <div className="col-12 text-center mt-3">
                      <p className="text-muted">
                        Already have an account? <Link to="/signin">Sign In</Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
