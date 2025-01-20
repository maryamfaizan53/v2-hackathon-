import PaymentPage from "../component/PaymentPage";

export default function Payment() {
  return (
    <main>
      <PaymentPage />
    </main>
  );
}




// "use client";

// import React, { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useCart } from "../../context/CartContext";
// // Import your Sanity client config
// import { createClient } from "next-sanity";
// import { sanityConfig } from "../../next-sanity.config";

// const client = createClient(sanityConfig);

// export default function PaymentPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const { cart, clearCart } = useCart();

//   const name = searchParams.get("name") || "";
//   const address = searchParams.get("address") || "";

//   const [paymentMethod, setPaymentMethod] = useState("");

//   const subtotal = cart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );
//   const discount = 20; // or dynamic
//   const deliveryFee = 15;
//   const totalDiscount = (subtotal * discount) / 100;
//   const total = subtotal - totalDiscount + deliveryFee;

//   const handlePayment = async () => {
//     if (!paymentMethod) {
//       alert("Please select a payment method.");
//       return;
//     }

//     // For demonstration, let's handle "Cash on Delivery" as immediate success
//     if (paymentMethod === "cod") {
//       // Create an order in Sanity
//       try {
//         const newOrder = await client.create({
//           _type: "order",
//           name,
//           address,
//           items: cart.map((item) => ({
//             _type: "object",
//             productId: item.id,
//             quantity: item.quantity,
//             price: item.price,
//           })),
//           subtotal,
//           discount,
//           deliveryFee,
//           total,
//           status: "pending_payment", // or "processing" if you want
//         });

//         // Clear cart after successful order creation
//         clearCart();

//         // Redirect to tracking page with the created order ID
//         router.push(`/tracking?orderId=${newOrder._id}`);
//       } catch (error) {
//         console.error("Error creating order in Sanity:", error);
//         alert("Error creating order. Please try again.");
//       }
//     } else {
//       // For other payment methods like Stripe, Bank Payment, etc.
//       // You would integrate your payment logic here.
//       // Once successful, you create the order in Sanity similarly and redirect to tracking.
//       alert(`Payment method "${paymentMethod}" not fully implemented in demo.`);
//     }
//   };

//   // If cart is empty (maybe user pressed back?), handle gracefully
//   if (cart.length === 0) {
//     return (
//       <div className="p-6">
//         <h1 className="text-xl font-bold">No items in cart.</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Payment</h1>
//       <p className="mb-2">Name: {name}</p>
//       <p className="mb-4">Address: {address}</p>

//       <div className="mb-4">
//         <label className="block font-semibold mb-2">Select Payment Method</label>
//         <select
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//           className="w-full border p-2 rounded"
//         >
//           <option value="">-- Select --</option>
//           <option value="cod">Cash on Delivery</option>
//           <option value="stripe">Stripe (Demo)</option>
//           <option value="bank">Bank Payment (Demo)</option>
//           {/* Add any other payment methods you like */}
//         </select>
//       </div>

//       <div className="flex justify-between mb-4">
//         <span>Subtotal:</span>
//         <span>${subtotal.toFixed(2)}</span>
//       </div>
//       <div className="flex justify-between mb-4">
//         <span>Discount ({discount}%):</span>
//         <span>-${totalDiscount.toFixed(2)}</span>
//       </div>
//       <div className="flex justify-between mb-4">
//         <span>Delivery Fee:</span>
//         <span>${deliveryFee}</span>
//       </div>
//       <div className="flex justify-between font-bold mb-4">
//         <span>Total:</span>
//         <span>${total.toFixed(2)}</span>
//       </div>

//       <button
//         onClick={handlePayment}
//         className="bg-black text-white py-2 px-4 rounded"
//       >
//         Pay Now
//       </button>
//     </div>
//   );
// }
