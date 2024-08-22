import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth
import './ShopDetail.css';

const ShopDetail = ({ addToCart }) => {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartActive, setIsCartActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add authentication state

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
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
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: Math.max(1, (prevQuantities[itemId] || 1) + value)
    }));
  };

  const handleAddToCart = (menuItem) => {
    if (!isAuthenticated) {
      alert("You must log in first to add items to the cart.");
      return;
    }

    addToCart({ ...menuItem, shopId: shopId, quantity: quantities[menuItem.id] || 1 });
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [menuItem.id]: 1
    }));
    setIsCartActive(true); // Activate the "Go to Cart" button
  };

  if (!shop) {
    return <div>Loading...</div>;
  }

  const uniqueCategories = [...new Set(shop.menu.map(item => item.category))];

  const filteredMenu = selectedCategory === 'All'
    ? shop.menu
    : shop.menu.filter(item => item.category === selectedCategory);

  return (
    <div className='body'>
      <div className='ShopDetailHeading'>
        <h2>{shop.name}</h2>
        <p>Address: {shop.address}</p>
        <p>Timing: {shop.timing}</p>
        <p>Delivery: {shop.delivery}</p>
        <p>Contact: {shop.Contact}</p>
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
            {uniqueCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <hr />

      {uniqueCategories.map(category => (
        <div key={category}>
          {(selectedCategory === 'All' || selectedCategory === category) && (
            <>
              <h4 className='h4Menu'>{category}</h4>
              {filteredMenu
                .filter(item => item.category === category)
                .map(menuItem => (
                  <div key={menuItem.id} className="menu-item">
                    <p>{menuItem.name} :- &#8377; {(menuItem.price !== undefined ? menuItem.price.toFixed(2) : 'N/A')}</p>
                    <div>
                      <button onClick={() => handleQuantityChange(menuItem.id, -1)}>-</button>
                      <input
                        type="number"
                        value={quantities[menuItem.id] || 1}
                        onChange={(e) => setQuantities(prevQuantities => ({
                          ...prevQuantities,
                          [menuItem.id]: Number(e.target.value)
                        }))}
                        min="1"
                        style={{ width: '50px', textAlign: 'center' }}
                      />
                      <button onClick={() => handleQuantityChange(menuItem.id, 1)}>+</button>
                      <div className='mx-4'>
                        <button className="add-to-cart-button" onClick={() => handleAddToCart(menuItem)}>Add to Cart</button>
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
