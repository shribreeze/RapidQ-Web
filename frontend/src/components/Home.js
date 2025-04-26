import React from 'react';
import ShopList from './ShopList';
import './Home.css';
import Recommendation from './Recommendation';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>RapidQ - Campus Cravings, Order Fast!</title>
                <meta name="description" content="Order your favorite food instantly with RapidQ." />
                <meta property="og:title" content="RapidQ - Instant Food Ordering" />
                <meta property="og:description" content="Fast, Easy, Delicious. Try RapidQ now!" />
                <meta property="og:type" content="website" />
            </Helmet>
            <div className='taglineCard'>
                <p className='display-1'>Campus Cravings, Order Fast!</p>
            </div>
            <Recommendation/>
            <ShopList/>
        </>
    );
};

export default Home;
