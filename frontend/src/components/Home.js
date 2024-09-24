import React from 'react';
import ShopList from './ShopList';
import './Home.css';
import Recommendation from './Recommendation';

const Home = () => {
    return (
        <>
            <div className='taglineCard'>
                <p className='display-1'>Campus Cravings, Order Fast!</p>
            </div>
            <Recommendation/>
            <ShopList/>
        </>
    );
};

export default Home;
