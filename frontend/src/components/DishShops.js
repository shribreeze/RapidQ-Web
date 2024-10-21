// DishShops Component - Modified
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import './DishShops.css';

const DishShops = () => {
  const { categoryName } = useParams();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const shopsRef = collection(db, 'shops');
        const querySnapshot = await getDocs(shopsRef);

        const shopList = [];

        for (let shopDoc of querySnapshot.docs) {
          const shopData = shopDoc.data();
          const itemsRef = collection(shopDoc.ref, 'items');
          const itemsSnapshot = await getDocs(itemsRef);

          const filteredItems = itemsSnapshot.docs.filter(
            (itemDoc) => itemDoc.data().category === categoryName
          );

          if (filteredItems.length > 0) {
            shopList.push({
              id: shopDoc.id,
              name: shopData.name,
              address: shopData.address,
              description: shopData.description,
              items: filteredItems.map((item) => item.data()),
            });
          }
        }

        setShops(shopList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shops:', error);
        setError('There was an issue fetching the shops.');
        setLoading(false);
      }
    };

    fetchShops();
  }, [categoryName]);

  const handleShopClick = (shopId) => {
    navigate(`/shop/${shopId}?category=${categoryName}`); // Passing category via URL query
  };

  return (
    <div id="dishShopsContainer">
      <h2 id="categoryHeading">Shops serving {categoryName}</h2>
      {loading ? (
        <div id="loadingSpinner">Loading...</div>
      ) : error ? (
        <p id="errorMessage">{error}</p>
      ) : (
        <div id="shopsList">
          {shops.length > 0 ? (
            shops.map((shop) => (
              <div key={shop.id} className="shopCard" onClick={() => handleShopClick(shop.id)}>
                <h3>{shop.name}</h3>
                <p>{shop.address}</p>
                <p>{shop.description}</p>
              </div>
            ))
          ) : (
            <p>No shops found serving dishes in the {categoryName} category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DishShops;
