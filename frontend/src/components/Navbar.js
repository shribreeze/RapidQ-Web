import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('Auth state changed:', currentUser);
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleSignOut = () => {
        console.log('Signing out...');
        signOut(auth).then(() => {
            console.log('Sign out successful');
            setUser(null);
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery) {
            navigate(`/outlets?search=${searchQuery}`);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
          const toggle = document.querySelector('.navbar-toggler');
          const menu = document.querySelector('#navbarTogglerDemo02');
    
          if (!toggle || !menu) return;
    
          const isClickInsideMenu = menu.contains(event.target);
          const isClickOnToggle = toggle.contains(event.target);
    
          if (!isClickInsideMenu && !isClickOnToggle && menu.classList.contains('show')) {
            toggle.click();
          }
        };
    
        document.addEventListener('click', handleOutsideClick);
    
        // Cleanup the event on unmount
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
      }, []);

    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark" id='navbar'>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src="/RapidQ.webp" alt='rapidq' style={{ height: "60px" }} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/outlets">Outlets</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/cart"> Cart<img src="/cart.webp  " alt='cart-pic' style={{ height: "30px" }} /></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/orders">Orders</Link>
                            </li>
                        </ul>
                        <form className="d-flex me-4" onSubmit={handleSearch}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="btn btn-outline-warning" type="submit">Search</button>
                        </form>
                        {user ? (
                            <div className="d-flex align-items-center">
                                <span className="navbar-text me-2 text-white">Hi, {user.displayName}</span>
                                <button className="btn btn-outline-warning me-2 m-1" onClick={handleSignOut}>Sign Out</button>
                            </div>
                        ) : (
                            <Link className="btn btn-outline-warning me-2 m-2" to="/signIn">Sign In</Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
