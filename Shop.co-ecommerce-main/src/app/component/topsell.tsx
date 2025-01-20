// src/app/component/TopSell.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LiaStarSolid } from "react-icons/lia";
import Link from "next/link";
import { useWishlist } from "../context/WishlistContext";

interface ImageObject {
  uploadedUrl?: string;
  externalUrl?: string;
  alt?: string;
}
interface Product {
  _id: string;
  name: string;
  slug: string;                // slug is now a string
  images: ImageObject[];
  price: number;
  rating: number;
}

export default function TopSell() {
  const { addToWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch all (or top-selling) products
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        // If you only want top sellers, filter them client-side or via GROQ
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAddToWishlist = (product: Product) => {
    // Grab the first image (if any)
    let imageUrl = "/placeholder.jpg";
    if (product.images && product.images.length > 0) {
      imageUrl =
        product.images[0].uploadedUrl || product.images[0].externalUrl || imageUrl;
    }

    addToWishlist({
      id: product._id,
      title: product.name,
      price: product.price,
      image: imageUrl,
    });
  };

  return (
    <div id="topsell">
      <h2 className="font-extrabold text-[35px] text-center my-8 md:text-[45px] lg:text-[60px] lg:mt-10">
        TOP SELLING
      </h2>
      <div className="flex justify-center items-center overflow-x-auto gap-5">
        {products.map((product) => {
          // Grab the first image (if any)
          const firstImage = product.images && product.images.length > 0
            ? product.images[0]
            : null;
          const imageToDisplay =
            firstImage?.uploadedUrl || firstImage?.externalUrl || "/placeholder.jpg";

          return (
            <div
              key={product._id}
              className="hover:shadow-lg transition-shadow p-5 hover:rounded-r-xl"
            >
              <Link href={`/product/${product.slug}`}>
                <Image
                  src={imageToDisplay}
                  alt={firstImage?.alt || product.name}
                  className="object-cover w-[300px] h-[300px] rounded-[20px]"
                  width={300}
                  height={300}
                />
                <h4 className="text-[20px] font-bold pl-3 pt-2">
                  {product.name}
                </h4>
                <div className="flex items-center pl-2">
                  {Array.from({ length: product.rating }, (_, index) => (
                    <LiaStarSolid key={index} color="orange" size="20px" />
                  ))}
                  <figcaption className="px-3 text-[12px]">
                    {product.rating}.0/5
                  </figcaption>
                </div>
                <figure className="text-[20px] font-bold pl-3 inline-flex">
                  ${product.price}
                </figure>
              </Link>

              <button
                onClick={() => handleAddToWishlist(product)}
                className="mt-3 px-4 py-2 border-2 border-black rounded hover:bg-black hover:text-white"
              >
                Add to Wishlist
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center mt-10">
        <Link href="/items">
          <button className="border-2 border-black rounded-2xl px-28 py-3 text-[20px] font-bold md:px-12 hover:bg-black hover:text-white">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
}




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

// export default function TopSell() {
//   const { addToWishlist } = useWishlist();

//   const [products, setProducts] = useState<Product[]>([]);

//   // Fetch all or a "top selling" subset from /api/products
//   useEffect(() => {
//     fetch('/api/products')
//       .then((res) => res.json())
//       .then((data) => {
//         // If you want "top selling" only, either filter in GROQ or do a client filter
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
//     <div id="topsell">
//       <h2 className="font-extrabold text-[35px] text-center my-8 md:text-[45px] lg:text-[60px] lg:mt-10">
//         TOP SELLING
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
//                 alt={product.name}
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




// // // components/TopSell.tsx
// // "use client";


// // import React from 'react';
// // import Image from 'next/image';
// // import { LiaStarSolid } from 'react-icons/lia';
// // import Link from 'next/link';
// // import { useWishlist } from '../context/WishlistContext';
// // import { topSellProducts } from '../lib/products'; // Import products

// // export default function TopSell() {
// //   const { addToWishlist } = useWishlist();

// //   const handleAddToWishlist = (product: typeof topSellProducts[number]) => {
// //     addToWishlist({
// //       id: product.id.toString(),
// //       title: product.name,
// //       price: product.price,
// //       image: product.imageUrl,
// //     });
// //   };

// //   return (
// //     <div id='topsell'>
// //       <h2 className="font-extrabold text-[35px] text-center my-8 md:text-[45px] lg:text-[60px] lg:mt-10">
// //         TOP SELLING
// //       </h2>
// //       <div className="flex justify-center items-center overflow-x-auto gap-5">
// //         {topSellProducts.map((product) => (
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
// //               <figure className="text-[20px] font-bold pl-3 inline-flex">${product.price}</figure>
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

