"use client";

// // // import React, { useEffect, useState } from "react";
// // // import { useSearchParams, useRouter } from "next/navigation";
// // // import { useCart } from "../context/CartContext";
// // // import { createClient } from "next-sanity";
// // // import sanityConfig from "../../../sanity.config";



import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "next-sanity";
import sanityConfig from "../../../sanity.config";
import { useCart } from "../context/CartContext";

// Initialize the Sanity client
const client = createClient(sanityConfig);

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, clearCart } = useCart();

  // Shipping details from the query string (passed in from Order page)
  const recipientName = searchParams.get("recipientName") || "";
  const email = searchParams.get("email") || "";
  const phone = searchParams.get("phone") || "";
  const addressLine1 = searchParams.get("addressLine1") || "";
  const addressLine2 = searchParams.get("addressLine2") || "";
  const city = searchParams.get("city") || "";
  const stateProvince = searchParams.get("stateProvince") || "";
  const zip = searchParams.get("zip") || "";
  const country = searchParams.get("country") || "";

  // Payment & Shipping method states
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");

  // Pricing calculations
  const discount = 20; // example
  const deliveryFee = 15; // example
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = (subtotal * discount) / 100;
  const total = subtotal - totalDiscount + deliveryFee;

  // Handle shipping method selection
  // (e.g. If you want to fetch shipping rates from ShipEngine, you'd do that here)
  const handleShipping = async () => {
    if (shippingMethod === "shipengine") {
      try {
        // 1) Possibly call your Next.js API route: /api/shipengine
        // 2) That route would do something like a fetch to ShipEngine API
        // 3) Adjust shipping costs or store shipping info in state
        console.log("Fetching ShipEngine rates / creating shipping label...");
      } catch (error) {
        console.error("ShipEngine error:", error);
        alert("Error fetching shipping info. Please try again.");
      }
    }
  };

  // Re-run shipping logic whenever shippingMethod changes
  useEffect(() => {
    if (shippingMethod) {
      handleShipping();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingMethod]);

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    if (!shippingMethod) {
      alert("Please select a shipping method.");
      return;
    }

    // Example: Cash on Delivery
    if (paymentMethod === "cod") {
      try {
        const newOrder = await client.create({
          _type: "order",
          shippingMethod,
          paymentMethod: "cod",
          // If your schema includes transactionId, you can set it to an empty string or a placeholder
          transactionId: "",
          shippingDetails: {
            recipientName,
            email,
            phone,
            addressLine1,
            addressLine2,
            city,
            state: stateProvince,
            zip,
            country,
          },
          items: cart.map((item) => ({
            _type: "orderItem",
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          subtotal,
          discount,
          deliveryFee,
          total,
          status: "pending_payment",
        });

        clearCart();
        router.push(`/tracking?orderId=${newOrder._id}`);
      } catch (error) {
        console.error("Error creating order in Sanity:", error);
        alert("Error creating order. Please try again.");
      }

    // Example: Bank Transfer
    } else if (paymentMethod === "bank") {
      // Bank Transfer flow
      // You might display bank instructions, then create the order in Sanity with status = "awaiting_funds"
      try {
        const newOrder = await client.create({
          _type: "order",
          shippingMethod,
          paymentMethod: "bank",
          transactionId: "", // or a reference if you generate one
          shippingDetails: {
            recipientName,
            email,
            phone,
            addressLine1,
            addressLine2,
            city,
            state: stateProvince,
            zip,
            country,
          },
          items: cart.map((item) => ({
            _type: "orderItem",
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          subtotal,
          discount,
          deliveryFee,
          total,
          status: "pending_payment", // or "awaiting_funds"
        });

        clearCart();
        router.push(`/tracking?orderId=${newOrder._id}`);
      } catch (error) {
        console.error("Error creating order in Sanity:", error);
        alert("Error creating order. Please try again.");
      }

    } else {
      // For any other payment methods (or if you removed Stripe)
      alert(`Payment method "${paymentMethod}" is not implemented yet.`);
    }
  };

  // If cart is empty
  if (cart.length === 0) {
    return <p className="p-6">Your cart is empty.</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Payment & Shipping</h1>

      {/* Shipping Method */}
      <label className="block font-semibold mb-2">Select Shipping Method:</label>
      <select
        value={shippingMethod}
        onChange={(e) => setShippingMethod(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">-- Select --</option>
        <option value="shipengine">ShipEngine (Demo)</option>
        <option value="selfPickup">Self Pickup (Demo)</option>
        <option value="localCarrier">Local Carrier (Demo)</option>
      </select>

      {/* Payment Method */}
      <label className="block font-semibold mb-2">Select Payment Method:</label>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">-- Select --</option>
        <option value="cod">Cash on Delivery</option>
        <option value="bank">Bank Transfer</option>
      </select>

      {/* Order Summary */}
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Discount ({discount}%):</span>
        <span>-${totalDiscount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Delivery Fee:</span>
        <span>${deliveryFee.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold mb-4">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button onClick={handlePayment} className="bg-black text-white py-2 px-4 rounded w-full">
        Pay Now
      </button>
    </div>
  );
}









// "use client";

// import React, { useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { createClient } from "next-sanity";
// import sanityConfig from "../../../sanity.config"
// import { useCart } from "../context/CartContext";

// // // For Stripe (client side), you'd typically do something like:
// // import { loadStripe } from "@stripe/stripe-js";

// // This is your public Stripe key (Publishable Key). 
// // The secret key goes on the server side only.
// // const stripePromise = loadStripe("pk_test_12345_yourPublicKeyHere");

// const client = createClient(sanityConfig);

// export default function PaymentPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { cart, clearCart } = useCart();

//   // Shipping details from the query string
//   const recipientName = searchParams.get("recipientName") || "";
//   const email = searchParams.get("email") || "";
//   const phone = searchParams.get("phone") || "";
//   const addressLine1 = searchParams.get("addressLine1") || "";
//   const addressLine2 = searchParams.get("addressLine2") || "";
//   const city = searchParams.get("city") || "";
//   const stateProvince = searchParams.get("stateProvince") || "";
//   const zip = searchParams.get("zip") || "";
//   const country = searchParams.get("country") || "";

//   // Payment & Shipping method states
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [shippingMethod, setShippingMethod] = useState("");

//   // Pricing calculations
//   const discount = 20; // example
//   const deliveryFee = 15; // example
//   const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const totalDiscount = (subtotal * discount) / 100;
//   const total = subtotal - totalDiscount + deliveryFee;

//   // Handle shipping method selection
//   // (e.g. if you want to fetch shipping rates from ShipEngine, you'd do that here)
//   const handleShipping = async () => {
//     if (shippingMethod === "shipengine") {
//       try {
//         // 1) Possibly call your Next.js API route: /api/shipengine
//         // 2) That route would do something like:
//         //    - fetch("https://api.shipengine.com/v1/rates/estimate", { ... })
//         //    - return shipping label info or cost
//         // 3) Then you set the shipping cost or label in state.
//         //
//         // For demonstration:
//         console.log("Fetching ShipEngine rates / creating shipping label...");
//         // e.g., setDeliveryFee(shipEngineRateFromServer);
//       } catch (error) {
//         console.error("ShipEngine error:", error);
//         alert("Error fetching shipping info. Please try again.");
//       }
//     }
//   };

//   // Call handleShipping whenever shippingMethod changes (optional)
//   React.useEffect(() => {
//     if (shippingMethod) {
//       handleShipping();
//     }
//   }, [shippingMethod]);

//   const handlePayment = async () => {
//     if (!paymentMethod) {
//       alert("Please select a payment method.");
//       return;
//     }
//     if (!shippingMethod) {
//       alert("Please select a shipping method.");
//       return;
//     }

//     if (paymentMethod === "cod") {
//       // Cash on Delivery flow: create order in Sanity
//       try {
//         const newOrder = await client.create({
//           _type: "order",
//           shippingDetails: {
//             recipientName,
//             email,
//             phone,
//             addressLine1,
//             addressLine2,
//             city,
//             state: stateProvince,
//             zip,
//             country,
//           },
//           items: cart.map((item) => ({
//             _type: "orderItem",
//             productId: item.id,
//             quantity: item.quantity,
//             price: item.price,
//           })),
//           subtotal,
//           discount,
//           deliveryFee,
//           total,
//           status: "pending_payment",
//           // Optionally store shippingMethod here, too
//           // shippingMethod
//         });

//         // Clear cart
//         clearCart();

//         // Redirect to tracking
//         router.push(`/tracking?orderId=${newOrder._id}`);
//       } catch (error) {
//         console.error("Error creating order in Sanity:", error);
//         alert("Error creating order. Please try again.");
//       }
//     } else if (paymentMethod === "stripe") {
//       // Stripe Payment Flow
//       // Typically you'd call your Next.js API to create a Checkout Session
//       try {
//         const stripe = await stripePromise; // loadStripe
//         if (!stripe) {
//           alert("Stripe is not loaded.");
//           return;
//         }

//         // 1) Call your Next.js API route /api/create-stripe-session
//         //    passing the cart details, shipping details, etc.
//         const response = await fetch("/api/create-stripe-session", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             items: cart,
//             shippingDetails: {
//               recipientName,
//               email,
//               phone,
//               addressLine1,
//               addressLine2,
//               city,
//               state: stateProvince,
//               zip,
//               country,
//             },
//             subtotal,
//             discount,
//             deliveryFee,
//             total,
//           }),
//         });
//         if (!response.ok) {
//           throw new Error("Failed to create Stripe session");
//         }
//         const session = await response.json();

//         // 2) Redirect to Stripe Checkout
//         const result = await stripe.redirectToCheckout({
//           sessionId: session.id, // from the server
//         });
//         if (result.error) {
//           console.error("Stripe redirect error:", result.error.message);
//           alert(result.error.message);
//         }
//       } catch (err) {
//         console.error("Stripe error:", err);
//         alert("Payment failed. Please try again.");
//       }
//     } else if (paymentMethod === "bank") {
//       // Bank Transfer flow
//       // For example, you might show banking instructions or call an API
//       alert("Bank Transfer: Show instructions or handle logic here.");
//       // Then you'd create the order in Sanity with status "awaiting_funds"
//     } else {
//       // Fallback for any other method
//       alert(`Payment method "${paymentMethod}" is not implemented yet.`);
//     }
//   };

//   // If cart is empty
//   if (cart.length === 0) {
//     return <p className="p-6">Your cart is empty.</p>;
//   }

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Payment & Shipping</h1>

//       {/* Shipping Method */}
//       <label className="block font-semibold mb-2">
//         Select Shipping Method:
//       </label>
//       <select
//         value={shippingMethod}
//         onChange={(e) => setShippingMethod(e.target.value)}
//         className="w-full border p-2 rounded mb-4"
//       >
//         <option value="">-- Select --</option>
//         <option value="shipengine">ShipEngine (Demo)</option>
//         <option value="selfPickup">Self Pickup (Demo)</option>
//         <option value="localCarrier">Local Carrier (Demo)</option>
//         {/* Add more carriers as desired */}
//       </select>

//       {/* Payment Method */}
//       <label className="block font-semibold mb-2">
//         Select Payment Method:
//       </label>
//       <select
//         value={paymentMethod}
//         onChange={(e) => setPaymentMethod(e.target.value)}
//         className="w-full border p-2 rounded mb-4"
//       >
//         <option value="">-- Select --</option>
//         <option value="cod">Cash on Delivery</option>
//         <option value="stripe">Stripe</option>
//         <option value="bank">Bank Payment</option>
//         {/* Add more payment methods as desired */}
//       </select>

//       {/* Show order summary */}
//       <div className="flex justify-between mb-2">
//         <span>Subtotal:</span>
//         <span>${subtotal.toFixed(2)}</span>
//       </div>
//       <div className="flex justify-between mb-2">
//         <span>Discount ({discount}%):</span>
//         <span>-${totalDiscount.toFixed(2)}</span>
//       </div>
//       <div className="flex justify-between mb-2">
//         <span>Delivery Fee:</span>
//         <span>${deliveryFee.toFixed(2)}</span>
//       </div>
//       <div className="flex justify-between font-bold mb-4">
//         <span>Total:</span>
//         <span>${total.toFixed(2)}</span>
//       </div>

//       {/* Pay Now */}
//       <button
//         onClick={handlePayment}
//         className="bg-black text-white py-2 px-4 rounded w-full"
//       >
//         Pay Now
//       </button>
//     </div>
//   );
// }




