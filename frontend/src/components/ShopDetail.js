import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ShopDetail.css';

const ShopDetail = ({ addToCart }) => {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const response = await fetch('/shops.json');
        const data = await response.json();
        const selectedShop = data.shops.find(shop => shop.id === parseInt(shopId));
        setShop(selectedShop);
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
    addToCart({ ...menuItem, shopId: shopId, quantity: quantities[menuItem.id] || 1 });
    setQuantities(prevQuantities => ({
        ...prevQuantities,
        [menuItem.id]: 1
    }));
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
      <h2>{shop.name}</h2>
      <p>Address: {shop.address}</p>
      <p>Timing: {shop.timing}</p>

      <h3>Menu</h3>
      <div>
        <label htmlFor="categoryFilter">Filter by category: </label>
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

      {uniqueCategories.map(category => (
        <div key={category}>
          {(selectedCategory === 'All' || selectedCategory === category) && (
            <>
              <h4>{category}</h4>
              {filteredMenu
                .filter(item => item.category === category)
                .map(menuItem => (
                  <div key={menuItem.id} className="menu-item">
                    <p>{menuItem.name} - ${menuItem.price.toFixed(2)}</p>
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
                      <button onClick={() => handleAddToCart(menuItem)}>Add to Cart</button>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      ))}

      <Link to="/cart">Go to Cart</Link>
    </div>
  );
};

export default ShopDetail;
