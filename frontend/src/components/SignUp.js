import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';

const SignUp = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
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
    const { email, password } = formData;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account Created Successfully");
      navigate('/'); // Redirect to home page
      console.log("Account Created");
      console.log('Form data:', formData);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert("User already registered with this Email. Please use a different email.");
      } else {
        console.error(err);
        alert("An error occurred. Please try again later.");
      }
    };
  };
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email)
      localStorage.setItem("email", data.user.email)
      window.alert('User signed in successfully');  // Show success alert
      navigate('/');
    })
  }

  useEffect(() => {
    setValue(localStorage.getItem('email'))
  })

  return (
    <>
      <section className="bg-light p-3 p-md-4 p-xl-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
              <div className="card border border-light-subtle rounded-4">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
                        <h2 className="h4 text-center">Registration</h2>
                        <h3 className="fs-6 fw-normal text-secondary text-center m-0">Enter your details to register</h3>
                      </div>
                    </div>
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
                          <label htmlFor="firstName" className="form-label">First Name</label>
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
                          <label htmlFor="lastName" className="form-label">Last Name</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="email" className="form-label">Email</label>
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
                          <label htmlFor="password" className="form-label">Password</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="iAgree"
                            id="iAgree"
                            checked={formData.iAgree}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-check-label text-secondary" htmlFor="iAgree">
                            I agree to the <a href="#!" className="link-primary text-decoration-none">terms and conditions</a>
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn bsb-btn-xl btn-primary" type="submit">Sign up</button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-12">
                      <hr className="mt-5 mb-4 border-secondary-subtle" />
                      <p className="m-0 text-secondary text-center">Already have an account? <Link to="/signIn" className="link-primary text-decoration-none">Sign in</Link></p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <p className="mt-5 mb-5">Or continue with</p>
                      <div className="d-flex gap-2 gap-sm-3 justify-content-center">
                        <a href="#!" className="btn btn-lg btn-outline-danger p-3 lh-1" onClick={handleClick}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
