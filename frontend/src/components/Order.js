import React from 'react';
import './Order.css';

const shopData = [
    { name: "Baker's Delight", image: "path_to_image_1.jpg" },
    { name: "Green Grocer", image: "path_to_image_2.jpg" },
    { name: "Tech World", image: "path_to_image_3.jpg" },
    { name: "Fashion Hub", image: "path_to_image_4.jpg" },
    { name: "Book Haven", image: "path_to_image_5.jpg" },
    { name: "Pet Paradise", image: "path_to_image_6.jpg" },
    { name: "Toy Town", image: "path_to_image_7.jpg" },
    { name: "Home Essentials", image: "path_to_image_8.jpg" },
    // Add more shop data as needed
  ];

const Order = () => {
    return (
    <div className="container">
        <div className="grid">
            {shopData.map((shop, index) => (
            <div key={index} className="card">
                <img src={shop.image} alt={shop.name} className="card-image" />
                <div className="card-content">
                <h2 className="card-title">{shop.name}</h2>
                </div>
            </div>
            ))}
      </div>
    </div>
    );
};

export default Order;
