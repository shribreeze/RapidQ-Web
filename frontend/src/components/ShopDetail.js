import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './ShopDetail.css';

const ShopDetail = ({ addToCart }) => {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartActive, setIsCartActive] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setIsUserSignedIn(!!user);
    });

    const fetchShopDetails = async () => {
      const db = getFirestore();
      const storage = getStorage();

      try {
        const shopDoc = await getDoc(doc(db, 'shops', shopId));
        if (shopDoc.exists()) {
          const shopData = shopDoc.data();

          const itemsSnapshot = await getDocs(collection(db, 'shops', shopId, 'items'));
          const items = await Promise.all(
            itemsSnapshot.docs.map(async (doc) => {
              const data = doc.data();
              let imgSrc = '';

              if (data.imgPath) {
                const imgRef = ref(storage, data.imgPath);
                imgSrc = await getDownloadURL(imgRef);
              }

              return {
                id: doc.id,
                ...data,
                price: data.price !== undefined ? data.price : 0,
                imgSrc,
              };
            })
          );

          setShop({ id: shopId, ...shopData, menu: items });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching shop details:', error);
      }
    };

    fetchShopDetails();
  }, [shopId]);

  const handleQuantityChange = (itemId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max(1, (prevQuantities[itemId] || 1) + value),
    }));
  };

  const handleAddToCart = async (item) => {
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
      shopName: shop.name,
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
          shopName: shop.name,
        }, { merge: true });
      } else {
        await setDoc(cartDocRef, {
          items: { [item.id]: cartItem },
          shopId,
          shopName: shop.name,
        });
      }

      addToCart(cartItem);
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item.id]: 1,
      }));
      setIsCartActive(true);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  if (!shop) {
    return <p className="loading-message">Loading...</p>;
  }

  const uniqueCategories = [...new Set(shop.menu.map((item) => item.category))];

  const filteredMenu = selectedCategory === 'All'
    ? shop.menu
    : shop.menu.filter((item) => item.category === selectedCategory);

  return (
    <div className='body'>
      <div className='ShopDetailHeading'>
        <h2>{shop.name}</h2>
        <p>Address: {shop.address}</p>
        <p>Timing: {shop.timing}</p>
        <p>Delivery: {shop.delivery}</p>
      </div>

      <div className='ShopDetailMenu'>
        <h3>Menu</h3>
        <div>
          <label htmlFor="categoryFilter">Filter: </label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <hr />

      {uniqueCategories.map((category) => (
        <div key={category}>
          {(selectedCategory === 'All' || selectedCategory === category) && (
            <>
              <h4 className='h4Menu'>{category}</h4>
              {filteredMenu
                .filter((item) => item.category === category)
                .map((item) => (
                  <div key={item.id} className="menu-item">
                    <p>{item.name} :- &#8377; {(item.price !== undefined ? item.price.toFixed(2) : 'N/A')}</p>
                    <div>
                      <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                      <input
                        type="number"
                        value={quantities[item.id] || 1}
                        onChange={(e) => setQuantities((prevQuantities) => ({
                          ...prevQuantities,
                          [item.id]: Number(e.target.value),
                        }))}
                        min="1"
                        style={{ width: '50px', textAlign: 'center' }}
                      />
                      <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                      <div className='mx-4'>
                        <button className="add-to-cart-button" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      ))}

      <Link to="/cart" className={`LinkToCart ${isCartActive ? 'active' : ''}`}>
        Go to Cart <img src='/ForwardArrow.png' alt='NextArrowLogo' width='35px' />
      </Link>
    </div>
  );
};

export default ShopDetail;