import TrackingPage from "../component/TrackingPage";

export default function Tracking() {
  return (
    <main>
      <TrackingPage />
    </main>
  );
}




// "use client";

// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// // Import your Sanity client config
// import { createClient } from "next-sanity";
// import sanityConfig from "../../../sanity.config";

// const client = createClient(sanityConfig);

// interface Order {
//   _id: string;
//   name: string;
//   address: string;
//   items: {
//     productId: string;
//     quantity: number;
//     price: number;
//   }[];
//   subtotal: number;
//   discount: number;
//   deliveryFee: number;
//   total: number;
//   status: string;
// }

// export default function TrackingPage() {
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get("orderId") || "";
//   const [order, setOrder] = useState<Order | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (orderId) {
//       fetchOrder(orderId);
//     }
//   }, [orderId]);

//   const fetchOrder = async (id: string) => {
//     setLoading(true);
//     try {
//       const result = await client.fetch<Order>(
//         `*[_type == "order" && _id == $id][0]`,
//         { id }
//       );
//       setOrder(result);
//     } catch (error) {
//       console.error("Error fetching order:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!orderId) {
//     return (
//       <div className="p-6">
//         <h1 className="text-xl font-bold">No order ID provided.</h1>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="p-6">
//         <h1>Loading order details...</h1>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="p-6">
//         <h1 className="text-xl font-bold">Order not found.</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Order Tracking</h1>
//       <p className="mb-2">Order ID: {order._id}</p>
//       <p className="mb-2 font-semibold">Name: {order.name}</p>
//       <p className="mb-2 font-semibold">Address: {order.address}</p>
//       <p className="mb-4 font-semibold">Status: {order.status}</p>

//       <hr className="my-4" />
//       <h2 className="text-xl font-semibold mb-2">Order Items:</h2>
//       {order.items.map((item, idx) => (
//         <div key={idx} className="mb-2">
//           <p>
//             <strong>Product ID:</strong> {item.productId}
//           </p>
//           <p>
//             <strong>Quantity:</strong> {item.quantity}
//           </p>
//           <p>
//             <strong>Price:</strong> ${item.price.toFixed(2)}
//           </p>
//           <hr className="my-2" />
//         </div>
//       ))}

//       <div className="mt-4">
//         <p>Subtotal: ${order.subtotal.toFixed(2)}</p>
//         <p>Discount: {order.discount}%</p>
//         <p>Delivery Fee: ${order.deliveryFee}</p>
//         <p className="font-bold">Total: ${order.total.toFixed(2)}</p>
//       </div>
//     </div>
//   );
// }
