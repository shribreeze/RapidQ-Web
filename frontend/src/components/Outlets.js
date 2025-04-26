import React from 'react';
import ShopList from './ShopList';
import { Helmet } from 'react-helmet';

const Outlets = () => {
  return (
    <>
      <Helmet>
        <title>RapidQ - Browse Shops</title>
        <meta name="description" content="Find and order from nearby shops with RapidQ." />
      </Helmet>
      <ShopList />
    </>
  );
};

export default Outlets;