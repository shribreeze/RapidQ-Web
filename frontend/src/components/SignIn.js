import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        // Sign out the user if the email is not verified
        await signOut(auth);
        window.alert('Please verify your email address before signing in.');
        return;
      }

      console.log('User signed in:', user);
      window.alert('User signed in successfully');
      
      // If "Keep me logged in" is checked, save email to localStorage
      if (rememberMe) {
        localStorage.setItem('email', email);
      }

      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
      let errorMessage = 'Error signing in. Please try again.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      }
      window.alert(errorMessage);
    }
  };

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then(async (data) => {
        setValue(data.user.email);

        if (!data.user.emailVerified) {
          // Sign out the user if the email is not verified
          await signOut(auth);
          window.alert('Please verify your email address before signing in.');
          return;
        }

        localStorage.setItem('email', data.user.email);
        window.alert('User signed in successfully');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error with Google sign-in:', error);
        window.alert('Error signing in with Google.');
      });
  };

  const handlePasswordReset = async () => {
    if (!email) {
      window.alert('Please enter your email address.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      window.alert('Password reset email sent! Check your inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      window.alert('Error sending password reset email. Please check your email address.');
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <section className="p-3 p-md-4 p-xl-5 " id='SigninSection'>
      <div className="container">
        <div className="row justify-content-left">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
            <div className="card border border-light-subtle rounded-4" id='SignInCard'>
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="mb-4 text-center">
                  <h4 style={{ color: "#462B9C" }}><strong>Welcome back, you've been missed!</strong></h4>
                </div>
                <div className="row mb-3">
                  <div className="col-12 d-flex gap-2 gap-sm-3 justify-content-center">
                    <button className="btn bsb-btn-xl btn-danger" onClick={handleClick}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                      </svg>
                      <span className="ms-2 fs-6 text-uppercase">Sign in With Google</span>
                    </button>
                  </div>
                </div>
                <div className='d-flex justify-content-center'>
                  <p>or</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row gy-3 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="name@example.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email</label>
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
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={rememberMe}
                          name="remember_me"
                          id="remember_me"
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label className="form-check-label text-dark" htmlFor="remember_me">
                          Keep me logged in
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button className="btn bsb-btn-xl btn-primary" type="submit" id='SignInBtn'>Log in now</button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-center mt-3">
                      <button className="btn btn-link p-0" onClick={handlePasswordReset}>
                        Forgot Password?
                      </button>
                    </div>
                    <hr className="mt-5 mb-4 border-secondary-subtle" />
                    <p className="m-0 text-dark text-center">Don't have an account? <Link to="/signUp" className="link-primary text-decoration-none">Sign Up</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
