import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import CardComponent from './CardComponent';
import './ShopList.css';

const ShopList = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      const db = getFirestore();
      try {
        const shopsSnapshot = await getDocs(collection(db, 'shops'));
        const shopsList = shopsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setShops(shopsList);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };

    fetchShops();
  }, []);

  return (
    <>
      <div className="m-4">
        <p className='display-5'>Food Outlets for you:</p>
      </div>
      <div className="container">
        <div className="row" id='row'>
          {shops.map((shop) => (
            <div className="col" key={shop.id}>
              <Link to={`/shop/${shop.id}`}>
                <CardComponent
                  imgSrc={shop.imgSrc}
                  altText={shop.name}
                  cardText={shop.name}
                  hoverInfo={`${shop.name}: ${shop.timing}`}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopList;
