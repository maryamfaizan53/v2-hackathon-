/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/component/arrival.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const reviews = [
  {
    id: 1,
    name: "Samantha D.",
    rating: 5,
    comment: "I love this product! The design is unique and fits perfectly.",
    date: "August 14, 2020",
  },
  {
    id: 2,
    name: "Alex M.",
    rating: 4,
    comment: "Great quality! Comfortable and stylish.",
    date: "August 10, 2024",
  },
];

export default function ArrivalPage() {
  const { slug } = useParams();
  const router = useRouter();

  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!product) {
    return <div>Loading product data...</div>;
  }

  if (product?.error) {
    return <div>{product.error}</div>;
  }

  const firstImage = product.images && product.images.length > 0
    ? product.images[0]
    : null;

  const imageToDisplay =
    firstImage?.uploadedUrl || firstImage?.externalUrl || "/placeholder.jpg";

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToWishlist = () => {
    addToWishlist({
      id: product._id,
      title: product.name,
      price: product.price,
      image: imageToDisplay,
    });
  };

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      title: product.name,
      price: product.price,
      image: imageToDisplay,
      quantity,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Details */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* First Image */}
        {firstImage ? (
          <Image
            src={imageToDisplay}
            alt={firstImage.alt || product.name}
            width={400}
            height={400}
            className="rounded-lg"
          />
        ) : (
          <div>No images available</div>
        )}

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          {product.description && (
            <p className="text-gray-700 mt-4">{product.description}</p>
          )}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-2xl font-bold text-green-600">
              ${product.price}
            </span>
            <span className="text-yellow-500">★ {product.rating}/5</span>
          </div>

          {/* Size Selector */}
          <div className="mt-6">
            <h2 className="font-semibold text-gray-700">Select Size</h2>
            <div className="flex gap-4 mt-2">
              {["Small", "Medium", "Large", "X-Large"].map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size ? "bg-black text-white" : "bg-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize && (
              <p className="text-sm text-green-600 mt-2">
                Selected Size: {selectedSize}
              </p>
            )}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex gap-4 mt-6">
            <div className="flex items-center border rounded">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-2 text-xl"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-2 text-xl"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-black text-white rounded-lg"
            >
              Add to Cart
            </button>
          </div>

          {/* Add to Wishlist */}
          <div className="mt-4">
            <button
              onClick={handleAddToWishlist}
              className="px-6 py-2 border-2 border-black rounded hover:bg-black hover:text-white"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <div className="flex flex-col gap-4 mt-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-md shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">{review.name}</span>
                <span className="text-yellow-500">★ {review.rating}/5</span>
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
              <span className="text-sm text-gray-400">
                Posted on {review.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* You Might Also Like */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">You Might Also Like</h2>
        <p className="text-gray-500 text-sm">
          (Use your own logic or fetch more products from Sanity.)
        </p>
      </div>
    </div>
  );
}




// //src/app/component/arrival.tsx
// "use client";

// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useWishlist } from "../context/WishlistContext";
// import { useCart } from "../context/CartContext";

// // Dummy reviews array for example
// const reviews = [
//   {
//     id: 1,
//     name: "Samantha D.",
//     rating: 5,
//     comment: "I love this product! The design is unique and fits perfectly.",
//     date: "August 14, 2020",
//   },
//   {
//     id: 2,
//     name: "Alex M.",
//     rating: 4,
//     comment: "Great quality! Comfortable and stylish.",
//     date: "August 10, 2024",
//   },
// ];

// export default function ProductPage() {
//   // Use the slug from the route parameters
//   const { slug } = useParams();
//   const router = useRouter();

//   const { addToWishlist } = useWishlist();
//   const { addToCart } = useCart();

//   const [product, setProduct] = useState<any>(null);
//   const [quantity, setQuantity] = useState<number>(1);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);

//   // 1) Fetch product from your new dynamic API route
//   useEffect(() => {
//     if (!slug) return;
//     fetch(`/api/products/${slug}`)
//       .then((res) => res.json())
//       .then((data) => setProduct(data))
//       .catch((err) => console.error(err));
//   }, [slug]);

//   // 2) If data is not yet loaded, show a fallback
//   if (!product) {
//     return <div>Loading product data...</div>;
//   }

//   // 3) If it returned an error message
//   if (product?.error) {
//     return <div>{product.error}</div>;
//   }

//   const handleQuantityChange = (amount: number) => {
//     setQuantity((prev) => Math.max(1, prev + amount));
//   };

//   const handleSizeSelect = (size: string) => {
//     setSelectedSize(size);
//   };

//   // If you have related products or suggestions, you might navigate by slug as well
//   const handleSuggestionClick = (suggestedSlug: string) => {
//     router.push(`/product/${suggestedSlug}`);
//   };

//   const handleAddToWishlist = () => {
//     addToWishlist({
//       id: product.id.toString(),
//       title: product.name,
//       price: product.price,
//       image: product.imageUrl,
//     });
//   };

//   const handleAddToCart = () => {
//     addToCart({
//       id: product.id.toString(),
//       title: product.name,
//       price: product.price,
//       image: product.imageUrl,
//       quantity,
//     });
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Product Details */}
//       <div className="flex flex-col lg:flex-row gap-10">
//         <Image
//           src={product.imageUrl}
//           alt={product.name}
//           width={400}
//           height={400}
//           className="rounded-lg"
//         />

//         {/* Product Info */}
//         <div>
//           <h1 className="text-3xl font-bold">{product.name}</h1>
//           {product.description && (
//             <p className="text-gray-700 mt-4">{product.description}</p>
//           )}
//           <div className="flex items-center gap-4 mt-4">
//             <span className="text-2xl font-bold text-green-600">
//               ${product.price}
//             </span>
//             <span className="text-yellow-500">★ {product.rating}/5</span>
//           </div>

//           {/* Size Selector */}
//           <div className="mt-6">
//             <h2 className="font-semibold text-gray-700">Select Size</h2>
//             <div className="flex gap-4 mt-2">
//               {["Small", "Medium", "Large", "X-Large"].map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => handleSizeSelect(size)}
//                   className={`px-4 py-2 border rounded ${
//                     selectedSize === size ? "bg-black text-white" : "bg-white"
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//             {selectedSize && (
//               <p className="text-sm text-green-600 mt-2">
//                 Selected Size: {selectedSize}
//               </p>
//             )}
//           </div>

//           {/* Quantity Selector and Add to Cart */}
//           <div className="flex gap-4 mt-6">
//             <div className="flex items-center border rounded">
//               <button
//                 onClick={() => handleQuantityChange(-1)}
//                 className="px-2 text-xl"
//               >
//                 -
//               </button>
//               <span className="px-4">{quantity}</span>
//               <button
//                 onClick={() => handleQuantityChange(1)}
//                 className="px-2 text-xl"
//               >
//                 +
//               </button>
//             </div>
//             <button
//               onClick={handleAddToCart}
//               className="px-6 py-2 bg-black text-white rounded-lg"
//             >
//               Add to Cart
//             </button>
//           </div>

//           {/* Add to Wishlist */}
//           <div className="mt-4">
//             <button
//               onClick={handleAddToWishlist}
//               className="px-6 py-2 border-2 border-black rounded hover:bg-black hover:text-white"
//             >
//               Add to Wishlist
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Reviews Section */}
//       <div className="mt-10">
//         <h2 className="text-xl font-semibold">Reviews</h2>
//         <div className="flex flex-col gap-4 mt-4">
//           {reviews.map((review) => (
//             <div key={review.id} className="p-4 border rounded-md shadow-sm">
//               <div className="flex items-center justify-between">
//                 <span className="text-lg font-bold">{review.name}</span>
//                 <span className="text-yellow-500">★ {review.rating}/5</span>
//               </div>
//               <p className="text-gray-600 mt-2">{review.comment}</p>
//               <span className="text-sm text-gray-400">
//                 Posted on {review.date}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* You Might Also Like */}
//       <div className="mt-10">
//         <h2 className="text-xl font-semibold">You Might Also Like</h2>
//         <p className="text-gray-500 text-sm">
//           (Use your own logic or fetch more products from Sanity.)
//         </p>
//       </div>
//     </div>
//   );
// }




// "use client";

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { LiaStarSolid } from 'react-icons/lia';
// import Link from 'next/link';
// import { useWishlist } from '../context/WishlistContext';

// interface Product {
//   id: number;
//   name: string;
//   imageUrl: string;
//   price: number;
//   rating: number;
// }

// export default function NewArrivals() {
//   const { addToWishlist } = useWishlist();

//   const [products, setProducts] = useState<Product[]>([]);

//   // Fetch all products from the /api/products route
//   useEffect(() => {
//     fetch('/api/products')
//       .then((res) => res.json())
//       .then((data) => {
//         // If you want only "new arrivals", you might filter by
//         // some field (like isNewArrival or createdAt) from Sanity
//         setProducts(data);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const handleAddToWishlist = (product: Product) => {
//     addToWishlist({
//       id: product.id.toString(),
//       title: product.name,
//       price: product.price,
//       image: product.imageUrl,
//     });
//   };

//   return (
//     <div id="arrival" className="border-b-2 border-black py-10">
//       <h2 className="font-extrabold text-[35px] text-center my-8 md:text-[45px] lg:text-[60px] lg:mt-10">
//         NEW ARRIVALS
//       </h2>
//       <div className="flex justify-center items-center overflow-x-auto gap-5">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="hover:shadow-lg transition-shadow p-5 hover:rounded-r-xl"
//           >
//             <Link href={`/product/${product.id}`}>
//               <Image
//                 src={product.imageUrl}
//                 alt={product?.name}
//                 className="object-cover w-[300px] h-[300px] rounded-[20px]"
//                 width={300}
//                 height={300}
//               />
//               <h4 className="text-[20px] font-bold pl-3 pt-2">{product.name}</h4>
//               <div className="flex items-center pl-2">
//                 {Array.from({ length: product.rating }, (_, index) => (
//                   <LiaStarSolid key={index} color="orange" size="20px" />
//                 ))}
//                 <figcaption className="px-3 text-[12px]">
//                   {product.rating}.0/5
//                 </figcaption>
//               </div>
//               <figure className="text-[20px] font-bold pl-3 inline-flex">
//                 ${product.price}
//               </figure>
//             </Link>

//             <button
//               onClick={() => handleAddToWishlist(product)}
//               className="mt-3 px-4 py-2 border-2 border-black rounded hover:bg-black hover:text-white"
//             >
//               Add to Wishlist
//             </button>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-center items-center mt-10">
//         <Link href="/items">
//           <button className="border-2 border-black rounded-2xl px-28 py-3 text-[20px] font-bold md:px-12 hover:bg-black hover:text-white">
//             View All
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }


// // sunooo ...kaha gyi 

// // // components/NewArrivals.tsx
// // "use client";

// // import React from 'react';
// // import Image from 'next/image';
// // import { LiaStarSolid } from 'react-icons/lia';
// // import Link from 'next/link';
// // import { useWishlist } from '../context/WishlistContext';
// // import { newArrivalsProducts } from '../lib/products'; // Import products

// // export default function NewArrivals() {
// //   const { addToWishlist } = useWishlist();

// //   const handleAddToWishlist = (product: typeof newArrivalsProducts[number]) => {
// //     addToWishlist({
// //       id: product.id.toString(),
// //       title: product.name,
// //       price: product.price,
// //       image: product.imageUrl,
// //     });
// //   };

// //   return (
// //     <div id='arrival' className="border-b-2 border-black py-10">
// //       <h2 className="font-extrabold text-[35px] text-center my-8 md:text-[45px] lg:text-[60px] lg:mt-10">
// //         NEW ARRIVALS
// //       </h2>
// //       <div className="flex justify-center items-center overflow-x-auto gap-5">
// //         {newArrivalsProducts.map((product) => (
// //           <div key={product.id} className='hover:shadow-lg transition-shadow p-5 hover:rounded-r-xl'>
// //             <Link href={`/product/${product.id}`}>
// //               <Image
// //                 src={product.imageUrl}
// //                 alt={product.name}
// //                 className="object-cover w-[300px] h-[300px] rounded-[20px]"
// //                 width={300}
// //                 height={300}
// //               />
// //               <h4 className="text-[20px] font-bold pl-3 pt-2">{product.name}</h4>
// //               <div className="flex items-center pl-2">
// //                 {Array.from({ length: product.rating }, (_, index) => (
// //                   <LiaStarSolid key={index} color="orange" size="20px" />
// //                 ))}
// //                 <figcaption className="px-3 text-[12px]">
// //                   {product.rating}.0/5
// //                 </figcaption>
// //               </div>
// //               <figure className="text-[20px] font-bold pl-3 inline-flex">
// //                 ${product.price}
// //               </figure>
// //             </Link>

// //             <button
// //               onClick={() => handleAddToWishlist(product)}
// //               className="mt-3 px-4 py-2 border-2 border-black rounded hover:bg-black hover:text-white"
// //             >
// //               Add to Wishlist
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //       <div className="flex justify-center items-center mt-10">
// //         <Link href="/items">
// //           <button className="border-2 border-black rounded-2xl px-28 py-3 text-[20px] font-bold md:px-12 hover:bg-black hover:text-white">
// //             View All
// //           </button>
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
