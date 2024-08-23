import React, { useState, useEffect } from 'react';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import './Order.css';

const Order = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Received orderId in Order component:', orderId); // Log to verify

    if (!orderId) {
      setError('Order ID is missing.');
      setLoading(false);
      return;
    }

    const db = getFirestore();
    const orderDocRef = doc(db, 'orders', orderId);

    const unsubscribe = onSnapshot(orderDocRef, (doc) => {
      setLoading(false);
      if (doc.exists()) {
        const orderData = doc.data();
        console.log('Order Data:', orderData); // Log to check structure
        setOrderDetails(orderData);
      } else {
        setError('No such order!');
      }
    }, (err) => {
      setLoading(false);
      setError('Error fetching order details: ' + err.message);
    });

    return () => unsubscribe();
  }, [orderId]);

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="order-container">
      <h2>Order Details</h2>
      {orderDetails ? (
        <div>
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Status:</strong> {orderDetails.status}</p>
          <p><strong>Timestamp:</strong> {orderDetails.timestamp ? orderDetails.timestamp.toDate().toLocaleString() : 'N/A'}</p>
          <p><strong>Items:</strong></p>
          <ul>
            {orderDetails.items ? orderDetails.items.map((item, index) => (
              <li key={index}>
                {item.name} - &#8377; {item.price.toFixed(2)} x {item.quantity}
              </li>
            )) : 'No items found.'}
          </ul>
          <p><strong>Total Amount:</strong> &#8377; {orderDetails.items ? orderDetails.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2) : '0.00'}</p>
        </div>
      ) : (
        <p>No order details available.</p>
      )}
    </div>
  );
};

export default Order;
