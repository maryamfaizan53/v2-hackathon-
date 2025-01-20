"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

// Import your Wishlist and Cart contexts (adjust paths if needed)
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

// Example reviews array
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

export default function ProductPage() {
  // 1) Grab the slug from the URL (e.g. /product/[slug])
  const { slug } = useParams();
  const router = useRouter();

  // 2) Setup local state
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // 3) Hooks for cart & wishlist
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();

  // 4) Fetch product data from /api/products/[slug]
  useEffect(() => {
    if (!slug) return; // Avoid calling API if slug is missing

    fetch(`/api/products/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data?.error) {
          setError(data.error);
          return;
        }
        setProduct(data);
      })
      .catch((err) => {
        setError(err.message);
        console.error("Failed to fetch product:", err);
      });
  }, [slug]);

  // 5) Handle loading/error states
  if (!slug) {
    return <div>No slug provided in URL.</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!product) {
    return <div>Loading product data...</div>;
  }

  // 6) Get first image (if multiple images)
  const firstImage = product.images && product.images.length > 0
    ? product.images[0]
    : null;

  // Fallback to a placeholder if neither uploadedUrl nor externalUrl exist
  const imageToDisplay =
    firstImage?.uploadedUrl || firstImage?.externalUrl || "/placeholder.jpg";

  // 7) Handlers for quantity, size, wishlist, cart
  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToWishlist = () => {
    addToWishlist({
      id: product._id, // or product.id
      title: product.name,
      price: product.price,
      image: imageToDisplay,
    });
  };

  const handleAddToCart = () => {
    addToCart({
      id: product._id, // or product.id
      title: product.name,
      price: product.price,
      image: imageToDisplay,
      quantity,
    });
  };

  // Optional: navigate to another product by slug
  const handleSuggestionClick = (suggestedSlug: string) => {
    router.push(`/product/${suggestedSlug}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Details */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Display the main image */}
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

          {/* Quantity Selector and Add to Cart */}
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
                <span className="text-yellow-500">
                  ★ {review.rating}/5
                </span>
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
              <span className="text-sm text-gray-400">
                Posted on {review.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* You Might Also Like (Optional) */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">You Might Also Like</h2>
        <p className="text-gray-500 text-sm">
          (Use your own logic or fetch more products from Sanity.)
        </p>
        {/* Example: If you had a list of other products, you could map over them 
            and call handleSuggestionClick(someSlug)
        */}
      </div>
    </div>
  );
}







// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import Image from "next/image";

// export default function ProductPage() {
//   const { slug } = useParams(); // dynamic segment: /product/[slug]
//   const [product, setProduct] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // Only fetch if slug is defined
//     if (!slug) return;

//     fetch(`/api/products/${slug}`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         if (data?.error) {
//           setError(data.error);
//           return;
//         }
//         setProduct(data);
//       })
//       .catch((err) => {
//         setError(err.message);
//         console.error("Failed to fetch product:", err);
//       });
//   }, [slug]);

//   if (!slug) {
//     return <div>No slug provided in URL.</div>;
//   }
//   if (error) {
//     return <div>Error: {error}</div>;
//   }
//   if (!product) {
//     return <div>Loading product...</div>;
//   }

//   // Example: show first image if any
//   const firstImage =
//     product.images?.length > 0 ? product.images[0] : null;
//   const imageUrl =
//     firstImage?.uploadedUrl || firstImage?.externalUrl || "/placeholder.jpg";

//   return (
//     <div className="container mx-auto p-4">
      
//       <h1 className="text-2xl font-bold">{product.name}</h1>
//       <Image
//         src={imageUrl}
//         alt={firstImage?.alt || product.name}
//         width={400}
//         height={400}
//       />
//       <p className="mt-4">Price: ${product.price}</p>
//       <p>Rating: {product.rating}/5</p>
//       <p className="mt-2 text-gray-600">{product.description}</p>
//     </div>
//   );
// }





// // // src/app/product/[slug]/page.tsx
// // "use client";

// // import { useParams, useRouter } from "next/navigation";
// // import Image from "next/image";
// // import { useState, useEffect } from "react";
// // import Link from "next/link";
// // import { useWishlist } from "../../context/WishlistContext";
// // import { useCart } from "../../context/CartContext";

// // const reviews = [
// //   {
// //     id: 1,
// //     name: "Samantha D.",
// //     rating: 5,
// //     comment: "I love this product! The design is unique and fits perfectly.",
// //     date: "August 14, 2020",
// //   },
// //   {
// //     id: 2,
// //     name: "Alex M.",
// //     rating: 4,
// //     comment: "Great quality! Comfortable and stylish.",
// //     date: "August 10, 2024",
// //   },
// // ];

// // export default function ProductPage() {
// //   const { slug } = useParams();
// //   const router = useRouter();
// //   const { addToWishlist } = useWishlist();
// //   const { addToCart } = useCart();

// //   const [product, setProduct] = useState<any>(null);
// //   const [quantity, setQuantity] = useState<number>(1);
// //   const [selectedSize, setSelectedSize] = useState<string | null>(null);

// //   // Fetch single product by slug
// //   useEffect(() => {
// //     if (!slug) return;
// //     fetch(`/api/products/${slug}`)
// //       .then((res) => res.json())
// //       .then((data) => setProduct(data))
// //       .catch((err) => console.error(err));
// //   }, [slug]);

// //   // Loading state
// //   if (!product) {
// //     return <div>Loading product data...</div>;
// //   }
// //   // Error state
// //   if (product?.error) {
// //     return <div>{product.error}</div>;
// //   }

// //   // We'll just pick the first image from product.images
// //   const firstImage = product.images && product.images.length > 0
// //     ? product.images[0]
// //     : null;

// //   const imageToDisplay =
// //     firstImage?.uploadedUrl || firstImage?.externalUrl || "/placeholder.jpg";

// //   const handleQuantityChange = (amount: number) => {
// //     setQuantity((prev) => Math.max(1, prev + amount));
// //   };

// //   const handleSizeSelect = (size: string) => {
// //     setSelectedSize(size);
// //   };

// //   const handleAddToWishlist = () => {
// //     addToWishlist({
// //       // Use your product._id if needed, or any unique identifier
// //       id: product._id,
// //       title: product.name,
// //       price: product.price,
// //       image: imageToDisplay,
// //     });
// //   };

// //   const handleAddToCart = () => {
// //     addToCart({
// //       id: product._id,
// //       title: product.name,
// //       price: product.price,
// //       image: imageToDisplay,
// //       quantity,
// //     });
// //   };

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       {/* Product Details */}
// //       <div className="flex flex-col lg:flex-row gap-10">
// //         {/* Display the first image (if any) */}
// //         {firstImage ? (
// //           <Image
// //             src={imageToDisplay}
// //             alt={firstImage.alt || product.name}
// //             width={400}
// //             height={400}
// //             className="rounded-lg"
// //           />
// //         ) : (
// //           <div>No images available</div>
// //         )}

// //         {/* Product Info */}
// //         <div>
// //           <h1 className="text-3xl font-bold">{product.name}</h1>
// //           {product.description && (
// //             <p className="text-gray-700 mt-4">{product.description}</p>
// //           )}
// //           <div className="flex items-center gap-4 mt-4">
// //             <span className="text-2xl font-bold text-green-600">
// //               ${product.price}
// //             </span>
// //             <span className="text-yellow-500">★ {product.rating}/5</span>
// //           </div>

// //           {/* Size Selector */}
// //           <div className="mt-6">
// //             <h2 className="font-semibold text-gray-700">Select Size</h2>
// //             <div className="flex gap-4 mt-2">
// //               {["Small", "Medium", "Large", "X-Large"].map((size) => (
// //                 <button
// //                   key={size}
// //                   onClick={() => handleSizeSelect(size)}
// //                   className={`px-4 py-2 border rounded ${
// //                     selectedSize === size ? "bg-black text-white" : "bg-white"
// //                   }`}
// //                 >
// //                   {size}
// //                 </button>
// //               ))}
// //             </div>
// //             {selectedSize && (
// //               <p className="text-sm text-green-600 mt-2">
// //                 Selected Size: {selectedSize}
// //               </p>
// //             )}
// //           </div>

// //           {/* Quantity Selector and Add to Cart */}
// //           <div className="flex gap-4 mt-6">
// //             <div className="flex items-center border rounded">
// //               <button
// //                 onClick={() => handleQuantityChange(-1)}
// //                 className="px-2 text-xl"
// //               >
// //                 -
// //               </button>
// //               <span className="px-4">{quantity}</span>
// //               <button
// //                 onClick={() => handleQuantityChange(1)}
// //                 className="px-2 text-xl"
// //               >
// //                 +
// //               </button>
// //             </div>
// //             <button
// //               onClick={handleAddToCart}
// //               className="px-6 py-2 bg-black text-white rounded-lg"
// //             >
// //               Add to Cart
// //             </button>
// //           </div>

// //           {/* Add to Wishlist */}
// //           <div className="mt-4">
// //             <button
// //               onClick={handleAddToWishlist}
// //               className="px-6 py-2 border-2 border-black rounded hover:bg-black hover:text-white"
// //             >
// //               Add to Wishlist
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Reviews Section */}
// //       <div className="mt-10">
// //         <h2 className="text-xl font-semibold">Reviews</h2>
// //         <div className="flex flex-col gap-4 mt-4">
// //           {reviews.map((review) => (
// //             <div key={review.id} className="p-4 border rounded-md shadow-sm">
// //               <div className="flex items-center justify-between">
// //                 <span className="text-lg font-bold">{review.name}</span>
// //                 <span className="text-yellow-500">★ {review.rating}/5</span>
// //               </div>
// //               <p className="text-gray-600 mt-2">{review.comment}</p>
// //               <span className="text-sm text-gray-400">
// //                 Posted on {review.date}
// //               </span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* You Might Also Like */}
// //       <div className="mt-10">
// //         <h2 className="text-xl font-semibold">You Might Also Like</h2>
// //         <p className="text-gray-500 text-sm">
// //           (Use your own logic or fetch more products from Sanity.)
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }



// // // //src/app/product/[slug]/page.tsx
// // // "use client";

// // // import { useParams, useRouter } from "next/navigation";
// // // import Image from "next/image";
// // // import { useState, useEffect } from "react";
// // // import Link from "next/link";
// // // import { useWishlist } from "../../context/WishlistContext";
// // // import { useCart } from "../../context/CartContext";

// // // // Dummy reviews array for example
// // // const reviews = [
// // //   {
// // //     id: 1,
// // //     name: "Samantha D.",
// // //     rating: 5,
// // //     comment: "I love this product! The design is unique and fits perfectly.",
// // //     date: "August 14, 2020",
// // //   },
// // //   {
// // //     id: 2,
// // //     name: "Alex M.",
// // //     rating: 4,
// // //     comment: "Great quality! Comfortable and stylish.",
// // //     date: "August 10, 2024",
// // //   },
// // // ];

// // // export default function ProductPage() {
// // //   // Use the slug from the route parameters
// // //   const { slug } = useParams();
// // //   const router = useRouter();

// // //   const { addToWishlist } = useWishlist();
// // //   const { addToCart } = useCart();

// // //   const [product, setProduct] = useState<any>(null);
// // //   const [quantity, setQuantity] = useState<number>(1);
// // //   const [selectedSize, setSelectedSize] = useState<string | null>(null);

// // //   // 1) Fetch product from your new dynamic API route
// // //   useEffect(() => {
// // //     if (!slug) return;
// // //     fetch(`/api/products/${slug}`)
// // //       .then((res) => res.json())
// // //       .then((data) => setProduct(data))
// // //       .catch((err) => console.error(err));
// // //   }, [slug]);

// // //   // 2) If data is not yet loaded, show a fallback
// // //   if (!product) {
// // //     return <div>Loading product data...</div>;
// // //   }

// // //   // 3) If it returned an error message
// // //   if (product?.error) {
// // //     return <div>{product.error}</div>;
// // //   }

// // //   const handleQuantityChange = (amount: number) => {
// // //     setQuantity((prev) => Math.max(1, prev + amount));
// // //   };

// // //   const handleSizeSelect = (size: string) => {
// // //     setSelectedSize(size);
// // //   };

// // //   // If you have related products or suggestions, you might navigate by slug as well
// // //   const handleSuggestionClick = (suggestedSlug: string) => {
// // //     router.push(`/product/${suggestedSlug}`);
// // //   };

// // //   const handleAddToWishlist = () => {
// // //     addToWishlist({
// // //       id: product.id.toString(),
// // //       title: product.name,
// // //       price: product.price,
// // //       image: product.imageUrl,
// // //     });
// // //   };

// // //   const handleAddToCart = () => {
// // //     addToCart({
// // //       id: product.id.toString(),
// // //       title: product.name,
// // //       price: product.price,
// // //       image: product.imageUrl,
// // //       quantity,
// // //     });
// // //   };

// // //   return (
// // //     <div className="container mx-auto px-4 py-8">
// // //       {/* Product Details */}
// // //       <div className="flex flex-col lg:flex-row gap-10">
// // //         <Image
// // //           src={product.imageUrl}
// // //           alt={product.name}
// // //           width={400}
// // //           height={400}
// // //           className="rounded-lg"
// // //         />

// // //         {/* Product Info */}
// // //         <div>
// // //           <h1 className="text-3xl font-bold">{product.name}</h1>
// // //           {product.description && (
// // //             <p className="text-gray-700 mt-4">{product.description}</p>
// // //           )}
// // //           <div className="flex items-center gap-4 mt-4">
// // //             <span className="text-2xl font-bold text-green-600">
// // //               ${product.price}
// // //             </span>
// // //             <span className="text-yellow-500">★ {product.rating}/5</span>
// // //           </div>

// // //           {/* Size Selector */}
// // //           <div className="mt-6">
// // //             <h2 className="font-semibold text-gray-700">Select Size</h2>
// // //             <div className="flex gap-4 mt-2">
// // //               {["Small", "Medium", "Large", "X-Large"].map((size) => (
// // //                 <button
// // //                   key={size}
// // //                   onClick={() => handleSizeSelect(size)}
// // //                   className={`px-4 py-2 border rounded ${
// // //                     selectedSize === size ? "bg-black text-white" : "bg-white"
// // //                   }`}
// // //                 >
// // //                   {size}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //             {selectedSize && (
// // //               <p className="text-sm text-green-600 mt-2">
// // //                 Selected Size: {selectedSize}
// // //               </p>
// // //             )}
// // //           </div>

// // //           {/* Quantity Selector and Add to Cart */}
// // //           <div className="flex gap-4 mt-6">
// // //             <div className="flex items-center border rounded">
// // //               <button
// // //                 onClick={() => handleQuantityChange(-1)}
// // //                 className="px-2 text-xl"
// // //               >
// // //                 -
// // //               </button>
// // //               <span className="px-4">{quantity}</span>
// // //               <button
// // //                 onClick={() => handleQuantityChange(1)}
// // //                 className="px-2 text-xl"
// // //               >
// // //                 +
// // //               </button>
// // //             </div>
// // //             <button
// // //               onClick={handleAddToCart}
// // //               className="px-6 py-2 bg-black text-white rounded-lg"
// // //             >
// // //               Add to Cart
// // //             </button>
// // //           </div>

// // //           {/* Add to Wishlist */}
// // //           <div className="mt-4">
// // //             <button
// // //               onClick={handleAddToWishlist}
// // //               className="px-6 py-2 border-2 border-black rounded hover:bg-black hover:text-white"
// // //             >
// // //               Add to Wishlist
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Reviews Section */}
// // //       <div className="mt-10">
// // //         <h2 className="text-xl font-semibold">Reviews</h2>
// // //         <div className="flex flex-col gap-4 mt-4">
// // //           {reviews.map((review) => (
// // //             <div key={review.id} className="p-4 border rounded-md shadow-sm">
// // //               <div className="flex items-center justify-between">
// // //                 <span className="text-lg font-bold">{review.name}</span>
// // //                 <span className="text-yellow-500">★ {review.rating}/5</span>
// // //               </div>
// // //               <p className="text-gray-600 mt-2">{review.comment}</p>
// // //               <span className="text-sm text-gray-400">
// // //                 Posted on {review.date}
// // //               </span>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* You Might Also Like */}
// // //       <div className="mt-10">
// // //         <h2 className="text-xl font-semibold">You Might Also Like</h2>
// // //         <p className="text-gray-500 text-sm">
// // //           (Use your own logic or fetch more products from Sanity.)
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // // "use client";

// // // import { useParams, useRouter } from "next/navigation";
// // // import Image from "next/image";
// // // import { useState, useEffect } from "react";
// // // import Link from "next/link";
// // // import { useWishlist } from "../../context/WishlistContext";
// // // import { useCart } from "../../context/CartContext";

// // // const reviews = [
// // //   {
// // //     id: 1,
// // //     name: "Samantha D.",
// // //     rating: 5,
// // //     comment: "I love this product! The design is unique and fits perfectly.",
// // //     date: "August 14, 2020",
// // //   },
// // //   {
// // //     id: 2,
// // //     name: "Alex M.",
// // //     rating: 4,
// // //     comment: "Great quality! Comfortable and stylish.",
// // //     date: "August 10, 2024",
// // //   },
// // // ];

// // // export default function ProductPage() {
// // //   const { id } = useParams();
// // //   const router = useRouter();

// // //   const { addToWishlist } = useWishlist();
// // //   const { addToCart } = useCart();

// // //   const [product, setProduct] = useState<any>(null);
// // //   const [quantity, setQuantity] = useState<number>(1);
// // //   const [selectedSize, setSelectedSize] = useState<string | null>(null);

// // //   // 1) Fetch product from your dynamic API route
// // //   useEffect(() => {
// // //     if (!id) return;
// // //     fetch(`/api/products/${id}`)
// // //       .then((res) => res.json())
// // //       .then((data) => setProduct(data))
// // //       .catch((err) => console.error(err));
// // //   }, [id]);

// // //   // 2) If data is not yet loaded or fetch fails, show a fallback
// // //   if (!product) {
// // //     return <div>Loading product data...</div>;
// // //   }
// // //   // 3) If it returned an error message
// // //   if ((product as any).error) {
// // //     return <div>{product.error}</div>;
// // //   }

// // //   // Existing logic
// // //   const handleQuantityChange = (amount: number) => {
// // //     setQuantity((prev) => Math.max(1, prev + amount));
// // //   };

// // //   const handleSizeSelect = (size: string) => {
// // //     setSelectedSize(size);
// // //   };

// // //   const handleSuggestionClick = (suggestedId: number) => {
// // //     router.push(`/product/${suggestedId}`);
// // //   };

// // //   const handleAddToWishlist = () => {
// // //     addToWishlist({
// // //       id: product.id.toString(),
// // //       title: product.name,
// // //       price: product.price,
// // //       image: product.imageUrl,
// // //     });
// // //   };

// // //   const handleAddToCart = () => {
// // //     addToCart({
// // //       id: product.id.toString(),
// // //       title: product.name,
// // //       price: product.price,
// // //       image: product.imageUrl,
// // //       quantity,
// // //     });
// // //   };

// // //   return (
// // //     <div className="container mx-auto px-4 py-8">
// // //       {/* Product Details */}
// // //       <div className="flex flex-col lg:flex-row gap-10">
// // //         <Image
// // //           src={product.imageUrl}
// // //           alt={product.name}
// // //           width={400}
// // //           height={400}
// // //           className="rounded-lg"
// // //         />

// // //         {/* Product Info */}
// // //         <div>
// // //           <h1 className="text-3xl font-bold">{product.name}</h1>
// // //           {product.description && (
// // //             <p className="text-gray-700 mt-4">{product.description}</p>
// // //           )}
// // //           <div className="flex items-center gap-4 mt-4">
// // //             <span className="text-2xl font-bold text-green-600">${product.price}</span>
// // //             <span className="text-yellow-500">★ {product.rating}/5</span>
// // //           </div>

// // //           {/* Size Selector */}
// // //           <div className="mt-6">
// // //             <h2 className="font-semibold text-gray-700">Select Size</h2>
// // //             <div className="flex gap-4 mt-2">
// // //               {["Small", "Medium", "Large", "X-Large"].map((size) => (
// // //                 <button
// // //                   key={size}
// // //                   onClick={() => handleSizeSelect(size)}
// // //                   className={`px-4 py-2 border rounded ${
// // //                     selectedSize === size ? "bg-black text-white" : "bg-white"
// // //                   }`}
// // //                 >
// // //                   {size}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //             {selectedSize && (
// // //               <p className="text-sm text-green-600 mt-2">
// // //                 Selected Size: {selectedSize}
// // //               </p>
// // //             )}
// // //           </div>

// // //           {/* Quantity Selector and Add to Cart */}
// // //           <div className="flex gap-4 mt-6">
// // //             <div className="flex items-center border rounded">
// // //               <button
// // //                 onClick={() => handleQuantityChange(-1)}
// // //                 className="px-2 text-xl"
// // //               >
// // //                 -
// // //               </button>
// // //               <span className="px-4">{quantity}</span>
// // //               <button
// // //                 onClick={() => handleQuantityChange(1)}
// // //                 className="px-2 text-xl"
// // //               >
// // //                 +
// // //               </button>
// // //             </div>
// // //             <button
// // //               onClick={handleAddToCart}
// // //               className="px-6 py-2 bg-black text-white rounded-lg"
// // //             >
// // //               Add to Cart
// // //             </button>
// // //           </div>

// // //           {/* Add to Wishlist */}
// // //           <div className="mt-4">
// // //             <button
// // //               onClick={handleAddToWishlist}
// // //               className="px-6 py-2 border-2 border-black rounded hover:bg-black hover:text-white"
// // //             >
// // //               Add to Wishlist
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Reviews Section */}
// // //       <div className="mt-10">
// // //         <h2 className="text-xl font-semibold">Reviews</h2>
// // //         <div className="flex flex-col gap-4 mt-4">
// // //           {reviews.map((review) => (
// // //             <div key={review.id} className="p-4 border rounded-md shadow-sm">
// // //               <div className="flex items-center justify-between">
// // //                 <span className="text-lg font-bold">{review.name}</span>
// // //                 <span className="text-yellow-500">★ {review.rating}/5</span>
// // //               </div>
// // //               <p className="text-gray-600 mt-2">{review.comment}</p>
// // //               <span className="text-sm text-gray-400">
// // //                 Posted on {review.date}
// // //               </span>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* You Might Also Like */}
// // //       <div className="mt-10">
// // //         <h2 className="text-xl font-semibold">You Might Also Like</h2>
// // //         <p className="text-gray-500 text-sm">
// // //           (Use your own logic or fetch more products from Sanity.)
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // // // // product/[id]/page.tsx
// // // // "use client";

// // // // import { useParams, useRouter } from "next/navigation";
// // // // import Image from "next/image";
// // // // import { useState } from "react";
// // // // import Link from "next/link";
// // // // import { useWishlist } from "../../context/WishlistContext";
// // // // import { useCart } from "../../context/CartContext";
// // // // // import { allProducts } from "../../lib/products"; // import from your products.ts

// // // // const reviews = [
// // // //   {
// // // //     id: 1,
// // // //     name: "Samantha D.",
// // // //     rating: 5,
// // // //     comment: "I love this product! The design is unique and fits perfectly.",
// // // //     date: "August 14, 2020",
// // // //   },
// // // //   {
// // // //     id: 2,
// // // //     name: "Alex M.",
// // // //     rating: 4,
// // // //     comment: "Great quality! Comfortable and stylish.",
// // // //     date: "August 10, 2024",
// // // //   },
// // // // ];

// // // // export default function ProductPage() {
// // // //   const { id } = useParams(); // Get the product ID from the URL
// // // //   const router = useRouter(); // For navigation
// // // //   const product = allProducts.find((p) => p.id.toString() === id);

// // // //   const { addToWishlist } = useWishlist();
// // // //   const { addToCart } = useCart();

// // // //   const [quantity, setQuantity] = useState<number>(1);
// // // //   const [selectedSize, setSelectedSize] = useState<string | null>(null);

// // // //   if (!product) {
// // // //     return <div>Product not found!</div>;
// // // //   }

// // // //   const handleQuantityChange = (amount: number) => {
// // // //     setQuantity((prev) => Math.max(1, prev + amount));
// // // //   };

// // // //   const handleSizeSelect = (size: string) => {
// // // //     setSelectedSize(size);
// // // //   };

// // // //   const handleSuggestionClick = (suggestedId: number) => {
// // // //     router.push(`/product/${suggestedId}`);
// // // //   };

// // // //   // Handler for adding product to wishlist
// // // //   const handleAddToWishlist = () => {
// // // //     addToWishlist({
// // // //       id: product.id.toString(),
// // // //       title: product.name,
// // // //       price: product.price,
// // // //       image: product.imageUrl,
// // // //     });
// // // //   };

// // // //   // Handler for adding product to cart
// // // //   const handleAddToCart = () => {
// // // //     addToCart({
// // // //       id: product.id.toString(),
// // // //       title: product.name,
// // // //       price: product.price,
// // // //       image: product.imageUrl,
// // // //       quantity, // use the current quantity state
// // // //     });
// // // //   };

// // // //   return (
// // // //     <div className="container mx-auto px-4 py-8">
// // // //       {/* Product Details */}
// // // //       <div className="flex flex-col lg:flex-row gap-10">
// // // //         <Image
// // // //           src={product.imageUrl}
// // // //           alt={product.name}
// // // //           width={400}
// // // //           height={400}
// // // //           className="rounded-lg"
// // // //         />

// // // //         {/* Product Info */}
// // // //         <div>
// // // //           <h1 className="text-3xl font-bold">{product.name}</h1>
// // // //           {product.description && (
// // // //             <p className="text-gray-700 mt-4">{product.description}</p>
// // // //           )}
// // // //           <div className="flex items-center gap-4 mt-4">
// // // //             <span className="text-2xl font-bold text-green-600">${product.price}</span>
// // // //             <span className="text-yellow-500">★ {product.rating}/5</span>
// // // //           </div>

// // // //           {/* Size Selector */}
// // // //           <div className="mt-6">
// // // //             <h2 className="font-semibold text-gray-700">Select Size</h2>
// // // //             <div className="flex gap-4 mt-2">
// // // //               {["Small", "Medium", "Large", "X-Large"].map((size) => (
// // // //                 <button
// // // //                   key={size}
// // // //                   onClick={() => handleSizeSelect(size)}
// // // //                   className={`px-4 py-2 border rounded ${selectedSize === size ? "bg-black text-white" : "bg-white"}`}
// // // //                 >
// // // //                   {size}
// // // //                 </button>
// // // //               ))}
// // // //             </div>
// // // //             {selectedSize && (
// // // //               <p className="text-sm text-green-600 mt-2">
// // // //                 Selected Size: {selectedSize}
// // // //               </p>
// // // //             )}
// // // //           </div>

// // // //           {/* Quantity Selector and Add to Cart */}
// // // //           <div className="flex gap-4 mt-6">
// // // //             <div className="flex items-center border rounded">
// // // //               <button
// // // //                 onClick={() => handleQuantityChange(-1)}
// // // //                 className="px-2 text-xl"
// // // //               >
// // // //                 -
// // // //               </button>
// // // //               <span className="px-4">{quantity}</span>
// // // //               <button
// // // //                 onClick={() => handleQuantityChange(1)}
// // // //                 className="px-2 text-xl"
// // // //               >
// // // //                 +
// // // //               </button>
// // // //             </div>
// // // //             <button
// // // //               onClick={handleAddToCart}
// // // //               className="px-6 py-2 bg-black text-white rounded-lg"
// // // //             >
// // // //               Add to Cart
// // // //             </button>
// // // //           </div>

// // // //           {/* Add to Wishlist */}
// // // //           <div className="mt-4">
// // // //             <button
// // // //               onClick={handleAddToWishlist}
// // // //               className="px-6 py-2 border-2 border-black rounded hover:bg-black hover:text-white"
// // // //             >
// // // //               Add to Wishlist
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Reviews Section */}
// // // //       <div className="mt-10">
// // // //         <h2 className="text-xl font-semibold">Reviews</h2>
// // // //         <div className="flex flex-col gap-4 mt-4">
// // // //           {reviews.map((review) => (
// // // //             <div key={review.id} className="p-4 border rounded-md shadow-sm">
// // // //               <div className="flex items-center justify-between">
// // // //                 <span className="text-lg font-bold">{review.name}</span>
// // // //                 <span className="text-yellow-500">★ {review.rating}/5</span>
// // // //               </div>
// // // //               <p className="text-gray-600 mt-2">{review.comment}</p>
// // // //               <span className="text-sm text-gray-400">
// // // //                 Posted on {review.date}
// // // //               </span>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       </div>

// // // //       {/* Suggested Products */}
// // // //       <div className="mt-10">
// // // //         <h2 className="text-xl font-semibold">You Might Also Like</h2>
// // // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
// // // //           {allProducts
// // // //             .filter((p) => p.id.toString() !== id)
// // // //             .map((suggestedProduct) => (
// // // //               <div
// // // //                 key={suggestedProduct.id}
// // // //                 onClick={() => handleSuggestionClick(suggestedProduct.id)}
// // // //                 className="border rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-lg transition-shadow"
// // // //               >
// // // //                 <Link href={`/product/${suggestedProduct.id}`}>
// // // //                   <Image
// // // //                     src={suggestedProduct.imageUrl}
// // // //                     alt={suggestedProduct.name}
// // // //                     className="object-cover w-[300px] h-[300px] rounded-[20px]"
// // // //                     width={300}
// // // //                     height={300}
// // // //                   />
// // // //                   <h3 className="text-md font-medium mt-2">{suggestedProduct.name}</h3>
// // // //                   <div className="flex items-center gap-2 mt-2">
// // // //                     <span className="text-lg font-bold text-green-600">
// // // //                       ${suggestedProduct.price}
// // // //                     </span>
// // // //                     <span className="text-yellow-500">
// // // //                       ★ {suggestedProduct.rating}/5
// // // //                     </span>
// // // //                   </div>
// // // //                 </Link>
// // // //               </div>
// // // //             ))}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

