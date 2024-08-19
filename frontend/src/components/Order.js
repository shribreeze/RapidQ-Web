import React, { useState, useEffect } from 'react';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import './Order.css';

const Order = ({ orderId }) => {
  const [orderStatus, setOrderStatus] = useState('Pending');

  useEffect(() => {
    const db = getFirestore();
    const orderDocRef = doc(db, 'orders', orderId);

    // Set up a real-time listener for the order document
    const unsubscribe = onSnapshot(orderDocRef, (doc) => {
      if (doc.exists()) {
        const orderData = doc.data();
        setOrderStatus(orderData.status); // Assuming there's a 'status' field in the order document
      } else {
        console.log('No such order!');
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [orderId]);

  return (
    <div className="order-container">
      <h2>Order Status</h2>
      <p>Your order is currently: {orderStatus}</p>
    </div>
  );
};

export default Order;
