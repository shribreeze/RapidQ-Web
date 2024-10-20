import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';  // Import your Firebase config
import { collection, getDocs, setDoc, doc, getDoc, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './DishShops.css';

const DishShops = () => {
  const { categoryName } = useParams();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});  // Track quantities for each item

  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [isCartActive, setIsCartActive] = useState(false); // State for tracking cart activity

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      setIsUserSignedIn(!!user);
    });

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

  const handleQuantityChange = (itemId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max(1, (prevQuantities[itemId] || 1) + value),
    }));
  };

  const handleAddToCart = async (item, shopId, shopName) => {
    if (!isUserSignedIn) {
      alert('Please sign in to add items to the cart.');
      return;
    }

    const db = getFirestore();
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (!userId) {
      console.error('User ID not found. Ensure the user is signed in.');
      return;
    }

    const quantity = quantities[item.id] || 1;

    const cartItem = {
      ...item,
      shopId,
      shopName,
      quantity,
      timestamp: new Date(),
    };

    try {
      const cartDocRef = doc(db, 'carts', userId);
      const cartDoc = await getDoc(cartDocRef);

      if (cartDoc.exists()) {
        const existingCartData = cartDoc.data();
        const updatedItems = { ...existingCartData.items };

        if (updatedItems[item.id]) {
          updatedItems[item.id].quantity += quantity;
        } else {
          updatedItems[item.id] = cartItem;
        }

        await setDoc(cartDocRef, {
          items: updatedItems,
          shopId,
          shopName,
        }, { merge: true });
      } else {
        await setDoc(cartDocRef, {
          items: { [item.id]: cartItem },
          shopId,
          shopName,
        });
      }

      // Update local cart state
      setCart((prevCart) => [...prevCart, cartItem]);
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item.id]: 1,
      }));
      setIsCartActive(true); // Mark cart as active
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
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
              <div key={shop.id} className="shopCard">
                <h3>{shop.name}</h3>
                <p>{shop.address}</p>
                <p>{shop.description}</p>

                <div className="itemsList">
                  {shop.items.map((item) => (
                    <div key={item.id} className="itemCard">
                      <h4>{item.name}</h4>
                      <p>{item.price}</p>

                      <div>
                        <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                        <input
                          type="number"
                          value={quantities[item.id] || 1}
                          onChange={(e) => setQuantities((prevQuantities) => ({
                            ...prevQuantities,
                            [item.id]: Math.max(1, Number(e.target.value)),
                          }))}
                          min="1"
                          id={`itemQuantityInput-${item.id}`}
                        />
                        <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                      </div>
                      <button className="addToCartButton" onClick={() => handleAddToCart(item, shop.id, shop.name)}>
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No shops found serving dishes in the {categoryName} category.</p>
          )}
        </div>
      )}

      <Link to="/cart" className={`linkToCart ${cart.length > 0 ? 'active' : ''}`}>
        Go to Cart <img src="/ForwardArrow.png" alt="NextArrowLogo" width="35px" />
      </Link>
    </div>
  );
};

export default DishShops;
