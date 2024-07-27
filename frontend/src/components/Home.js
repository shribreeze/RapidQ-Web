import React from 'react';
import ShopList from './ShopList';
import './Home.css';

const Home = () => {
    return (
        <>
            <div className='taglineCard'>
                {/* <p className='display-1' style={{fontFamily:"super black marker"}}><span style={{color:"#462B9C"}}>Quick </span><span style={{color:"#ffc107"}}>Orders</span>,<span style={{color:"#462B9C"}}> Quality</span><span style={{color:"#ffc107"}}> Meals</span></p> */}
                <p className='display-1' style={{fontFamily:"super black marker", color:"white"}}>Campus Cravings, Order Fast!</p>
            </div>
            <ShopList/>
        </>
    );
};

export default Home;
