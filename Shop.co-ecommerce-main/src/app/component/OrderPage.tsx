"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function OrderPage() {
  const router = useRouter();
  const { cart } = useCart();

  // Advanced shipping details state
  const [recipientName, setRecipientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  // If the cart is empty, you can show a message or redirect
  if (cart.length === 0) {
    return <p className="p-6">Your cart is empty.</p>;
  }

  const handleSubmitOrder = () => {
    // Basic client-side validation
    if (
      !recipientName.trim() ||
      !email.trim() ||
      !addressLine1.trim() ||
      !city.trim() ||
      !country.trim()
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    // Build query params
    const queryParams = new URLSearchParams({
      recipientName,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      stateProvince,
      zip,
      country,
    });

    // Navigate to the Payment page, including shipping info in the URL
    router.push(`/payment?${queryParams.toString()}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Shipping Details</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitOrder();
        }}
      >
        {/* Recipient Name */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Recipient Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="John Doe"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Phone Number</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="+1 555-1234"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Address Line 1 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Address Line 1 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="123 Main St"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
          />
        </div>

        {/* Address Line 2 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Address Line 2</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Apt, Suite, etc. (optional)"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Los Angeles"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* State / Province */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">State / Province</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="California"
            value={stateProvince}
            onChange={(e) => setStateProvince(e.target.value)}
          />
        </div>

        {/* ZIP / Postal Code */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">ZIP / Postal Code</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="90001"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="USA"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded w-full mt-4"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}




// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useCart } from "../context/CartContext";

// export default function OrderPage() {
//   const router = useRouter();
//   const { cart } = useCart();

//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");

//   const handleSubmitOrder = () => {
//     if (!name || !address) {
//       alert("Please fill out all required fields.");
//       return;
//     }

//     // Navigate to the Payment page with the data in query params (or use global store)
//     router.push(
//       `/payment?name=${encodeURIComponent(name)}&address=${encodeURIComponent(
//         address
//       )}`
//     );
//   };

//   // If the cart is empty, show a message or redirect
//   if (cart.length === 0) {
//     return <p>Your cart is empty.</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Shipping Details</h1>
//       <div className="mb-4">
//         <label className="block font-semibold">Name</label>
//         <input
//           type="text"
//           className="w-full border p-2 rounded"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="John Doe"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block font-semibold">Address</label>
//         <textarea
//           className="w-full border p-2 rounded"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           placeholder="123 Main St, City, Country"
//         />
//       </div>
//       <button
//         onClick={handleSubmitOrder}
//         className="bg-black text-white py-2 px-4 rounded"
//       >
//         Proceed to Payment
//       </button>
//     </div>
//   );
// }
