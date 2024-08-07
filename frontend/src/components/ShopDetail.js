import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ShopDetail = ({ addToCart }) => {
  const { shopId } = useParams();
  const [quantities, setQuantities] = useState({});

  // Mock data, replace with actual data fetching
  const shopDetails = {
    1: {
      name: "Fast Food Cafe",
      address: "123 Main St",
      timing: "Open till 10 PM",
      menu: [
        { id: 1, name: "Cheeseburger", category: "Burgers", price: 5.99 },
        { id: 2, name: "Veggie Burger", category: "Burgers", price: 4.99 },
        { id: 3, name: "Coke", category: "Drinks", price: 1.99 },
        { id: 4, name: "Pepsi", category: "Drinks", price: 1.99 }
      ]
    },
    // Add other shops similarly
  };

  const shop = shopDetails[shopId];

  const handleQuantityChange = (itemId, value) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: Math.max(1, (prevQuantities[itemId] || 1) + value)
    }));
  };

  const handleAddToCart = (menuItem) => {
    addToCart({ ...menuItem, quantity: quantities[menuItem.id] || 1 });
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [menuItem.id]: 1 // Reset quantity after adding to cart
    }));
  };

  return (
    <div>
      <h2>{shop.name}</h2>
      <p>Address: {shop.address}</p>
      <p>Timing: {shop.timing}</p>
      <h3>Menu</h3>
      {shop.menu.map((menuItem) => (
        <div key={menuItem.id}>
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
          </div>
          <button onClick={() => handleAddToCart(menuItem)}>Add to Cart</button>
        </div>
      ))}
      <Link to="/cart">Go to Cart</Link>
    </div>
  );
};

export default ShopDetail;
