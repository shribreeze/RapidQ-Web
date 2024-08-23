import React from 'react';
import { useParams } from 'react-router-dom';
import Order from './Order';

const OrderPage = () => {
  const { orderId } = useParams();

  console.log('Order ID in OrderPage:', orderId); // Log to verify

  return (
    <div>
      <h1>Order Details</h1>
      {orderId ? (
        <Order orderId={orderId} />
      ) : (
        <p>No order ID provided.</p>
      )}
    </div>
  );
};

export default OrderPage;
