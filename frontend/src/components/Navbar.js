import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
    <>
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark" id='navbar'>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img src="./LogoMini.png" alt='QuickQ' style={{height:"60px"}}/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/order">Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/cart"><img src="./cart.png" alt='cart-pic' style={{height:"30px"}}/> Cart</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-warning" type="submit">Search</button>
                    </form>
                    <Link className="btn btn-outline-warning me-2 m-2" to="/signIn">Sign In</Link>
                </div>
            </div>
        </nav>
    </>
    );
};

export default Navbar;