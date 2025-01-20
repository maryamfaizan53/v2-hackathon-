"use client";

import React from "react";
import { useRouter } from "next/navigation";
// or for Next.js 12: import { useRouter } from "next/router";
import { useCart } from "../../context/CartContext";

export default function PaymentPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const handlePayment = async () => {
    try {
      // Build the object you want to send to your API route
      const orderData = {
        shippingMethod: "localCarrier",
        paymentMethod: "cod",
        // ...and so on, plus items, total, etc.
        items: cart.map((item) => ({
          _type: "orderItem",
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      // POST to /api/create-order (the route file you created)
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (response.ok) {
        // success
        console.log("New order ID:", result.orderId);
        clearCart();
        router.push(`/tracking?orderId=${result.orderId}`);
      } else {
        alert("Error creating order: " + result.error);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while creating the order.");
    }
  };

  // ...Rest of your PaymentPage UI

  return (
    <button onClick={handlePayment}>Pay Now</button>
  );
}
