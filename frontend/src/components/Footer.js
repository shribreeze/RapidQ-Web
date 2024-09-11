import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Footer = () => {
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
    formData.append('userId', user.uid);
    fetch('https://formspree.io/f/mnnadgld', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        form.reset();
        alert('Your query has been submitted');
      } else {
        alert('There was a problem submitting your query');
      }
    });
  };

  return (
    <>
      <footer className="footer py-3 py-xl-8 mt-2">
        <div className="container">
          <div className="container-fluid bg-light">
            <div className="row justify-content-center">
              <div className="col-12 col-md-11">
                <section className="py-4 py-md-5 py-xl-8">
                  <div className="container-fluid overflow-hidden">
                    <div className="row gy-4 gy-lg-0 justify-content-xl-between">
                      <div className="col-12 col-md-4 col-lg-3 col-xl-2">
                        <div className="widget">
                          <a href="#!">
                            <img src="/LogoMini.png" alt="QuickQ" height="100" />
                          </a>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 col-lg-3 col-xl-2">
                        <div className="widget">
                          <h4 className="widget-title mb-4">Services</h4>
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <a href="#!" className="link-secondary text-decoration-none">Outlets</a>
                            </li>
                            <li className="mb-2">
                              <a href="#!" className="link-secondary text-decoration-none">Cart</a>
                            </li>
                            <li className="mb-2">
                              <a href="#!" className="link-secondary text-decoration-none">Orders</a>
                            </li>
                            <li className="mb-0">
                              <a href="#!" className="link-secondary text-decoration-none">Web Design</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 col-lg-3 col-xl-2">
                        <div className="widget">
                          <h4 className="widget-title mb-4">Company</h4>
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <Link to="/about" className="link-secondary text-decoration-none">About</Link>
                            </li>
                            <li className="mb-2">
                              <a href="#!" className="link-secondary text-decoration-none">Contact</a>
                            </li>
                            <li className="mb-2">
                              <a href="#!" className="link-secondary text-decoration-none">Terms of Service</a>
                            </li>
                            <li className="mb-0">
                              <a href="#!" className="link-secondary text-decoration-none">Privacy Policy</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-12 col-lg-3 col-xl-4">
                        <div className="widget">
                          <h4 className="widget-title mb-4">Your Queries</h4>
                          <p className="mb-4">Submit your query or valuable feedback.</p>
                          {user ? (
                            <form onSubmit={handleSubmit}>
                              <div className="row gy-4">
                                <div className="col-12">
                                  <div className="input-group">
                                    <span className="input-group-text" id="email-newsletter-addon">
                                      <img src='/query.png' alt='query-logo' width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16" />
                                    </span>
                                    <textarea className="form-control" id="query" name="message" placeholder="Write your query..." aria-label="user-query" aria-describedby="user-query-addon" required />
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="d-grid">
                                    <button className="btn btn-primary" type="submit">Submit</button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          ) : (
                            <p className="text-danger">
                              Please <Link to="/signin" className="text-primary">log in</Link> to submit a query.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="py-4 py-md-3 py-xl-8 border-top border-light-subtle">
                  <div className="container-fluid overflow-hidden">
                    <div className="row gy-4 gy-md-0 align-items-md-center">
                      <div className="col-xs-12 col-md-7 order-1 order-md-0">
                        <div className="copyright text-center text-md-start">
                          &copy; 2024. All Rights Reserved.
                        </div>
                      </div>

                      <div className="col-xs-12 col-md-5 order-0 order-md-1">
                        <div className="social-media-wrapper">
                          <ul className="list-unstyled m-0 p-0 d-flex justify-content-center justify-content-md-end">
                            <li className="me-3">
                              <a href="#!" className="link-dark link-opacity-75-hover">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                </svg>
                              </a>
                            </li>
                            <li className="me-3">
                              <a href="#!" className="link-dark link-opacity-75-hover">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.192-.046-2.253-.1-2.493-.13l-.158-.022a2.007 2.007 0 0 1-1.414-1.42c-.112-.418-.187-.986-.235-1.558l-.009-.104-.008-.105C.006 9.183 0 8.567 0 8.481v-.075c0-.187.009-1.043.074-1.957l.008-.104.022-.26.01-.104c.048-.519.119-1.022.22-1.402a2.006 2.006 0 0 1 1.414-1.42C2.857 2.032 7.159 2 8.051 2zm3.691 2.347a.5.5 0 0 0-.269-.143C10.816 4.066 9.367 4 8.14 4h-.184c-1.302 0-2.928.045-3.332.073a.5.5 0 0 0-.267.143.5.5 0 0 0-.143.267C4.194 5.146 4.162 6.648 4.162 8c0 1.337.03 2.828.072 3.18a.5.5 0 0 0 .143.267.5.5 0 0 0 .267.143c1.001.084 2.542.115 3.33.122l.148.002.148-.001c1.32-.011 2.814-.047 3.171-.075a.5.5 0 0 0 .267-.143.5.5 0 0 0 .143-.267c.083-.732.115-2.234.115-3.179 0-1.336-.03-2.828-.072-3.18a.5.5 0 0 0-.143-.267zM6.75 5.5v5l4-2.5-4-2.5z" />
                                </svg>
                              </a>
                            </li>
                            <li className="me-3">
                              <a href="#!" className="link-dark link-opacity-75-hover">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.423A6.68 6.68 0 0 0 16 3.542a6.533 6.533 0 0 1-1.889.518 3.3 3.3 0 0 0 1.443-1.817 6.533 6.533 0 0 1-2.084.793 3.286 3.286 0 0 0-5.697 2.994 9.325 9.325 0 0 1-6.767-3.429 3.286 3.286 0 0 0 1.018 4.382A3.273 3.273 0 0 1 .64 6.575v.041a3.286 3.286 0 0 0 2.633 3.218 3.203 3.203 0 0 1-.864.114 3.23 3.23 0 0 1-.615-.057 3.286 3.286 0 0 0 3.067 2.28A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.286 9.286 0 0 0 5.026 15z" />
                                </svg>
                              </a>
                            </li>
                            <li className="me-0">
                              <a href="#!" className="link-dark link-opacity-75-hover">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                  <path d="M8 0c-2.211 0-2.481.009-3.35.048-.87.039-1.467.175-1.992.373a4.78 4.78 0 0 0-1.737 1.137 4.78 4.78 0 0 0-1.136 1.737c-.198.525-.334 1.122-.373 1.991C0 5.76 0 6.029 0 8.001c0 1.971.009 2.24.048 3.109.039.87.175 1.467.373 1.992.198.525.485 1.01.854 1.38.37.369.855.656 1.38.854.525.198 1.122.334 1.991.373.87.039 1.139.048 3.11.048s2.24-.009 3.109-.048c.87-.039 1.467-.175 1.992-.373a4.766 4.766 0 0 0 1.737-1.137 4.766 4.766 0 0 0 1.137-1.737c.198-.525.334-1.122.373-1.991.039-.87.048-1.139.048-3.11s-.009-2.24-.048-3.109c-.039-.87-.175-1.467-.373-1.992a4.78 4.78 0 0 0-1.137-1.737 4.78 4.78 0 0 0-1.737-1.136c-.525-.198-1.122-.334-1.991-.373C10.24 0 9.971 0 8 0zm0 1.459c2.18 0 2.437.008 3.293.047.796.036 1.228.166 1.515.276.382.148.654.326.94.611.286.286.463.558.611.94.11.287.24.719.276 1.515.039.857.047 1.113.047 3.293s-.008 2.437-.047 3.293c-.036.796-.166 1.228-.276 1.515a3.323 3.323 0 0 1-.611.94 3.324 3.324 0 0 1-.94.611c-.287.11-.719.24-1.515.276-.857.039-1.113.047-3.293.047s-2.437-.008-3.293-.047c-.796-.036-1.228-.166-1.515-.276a3.284 3.284 0 0 1-1.551-1.551c-.11-.287-.24-.719-.276-1.515-.039-.857-.047-1.113-.047-3.293s.008-2.437.047-3.293c.036-.796.166-1.228.276-1.515a3.284 3.284 0 0 1 1.551-1.551c.287-.11.719-.24 1.515-.276.857-.039 1.113-.047 3.293-.047zM8 3.918A4.084 4.084 0 1 0 8 12.084 4.084 4.084 0 0 0 8 3.918zm0 6.709A2.625 2.625 0 1 1 8 4.375a2.625 2.625 0 0 1 0 5.252zm4.271-6.709a.957.957 0 1 0-.001 1.915.957.957 0 0 0 .001-1.915z" />
                                </svg>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
