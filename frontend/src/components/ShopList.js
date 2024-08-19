import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage
import CardComponent from './CardComponent';
import './ShopList.css';

const ShopList = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      const db = getFirestore();
      const storage = getStorage(); // Initialize Firebase Storage

      try {
        const shopsSnapshot = await getDocs(collection(db, 'shops'));
        const shopsList = await Promise.all(
          shopsSnapshot.docs.map(async (doc) => {
            const data = doc.data();
            let imgSrc = '';

            // If imgPath is available, fetch the image URL from Firebase Storage
            if (data.imgPath) {
              const imgRef = ref(storage, data.imgPath);
              imgSrc = await getDownloadURL(imgRef);
            }

            return {
              id: doc.id,
              ...data,
              imgSrc, // Add the image URL to the shop data
            };
          })
        );
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
