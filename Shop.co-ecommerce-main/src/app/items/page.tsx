"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { LiaStarSolid } from 'react-icons/lia';
import Link from 'next/link';
import { useWishlist } from '../context/WishlistContext';

// Optionally define an interface if you want type safety.
interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  rating: number;
  description?: string;
}

export default function Items() {
  const [sortBy, setSortBy] = useState('Most Popular');
  const { addToWishlist } = useWishlist();

  // State for storing fetched products
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch all products from our dynamic route /api/products
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Optional sorting logic based on `sortBy` selection
  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    if (sortBy === 'Price: Low to High') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [products, sortBy]);

  // Handler for adding product to wishlist
  const handleAddToWishlist = (product: Product) => {
    addToWishlist({
      id: product.id.toString(),
      title: product.name,
      price: product.price,
      image: product.imageUrl,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar Filters */}
      <aside className="w-full hidden lg:inline lg:w-[200px] xl:w-[250px] p-5 border-r">
        {/* ...Filter UI... */}
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <header className="flex justify-between items-center p-5 border-b">
          <h1 className="text-2xl font-bold">Casual</h1>
          <div>
            <label className="text-sm">Sort by: </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-2 py-1"
            >
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-5">
          {sortedProducts.map((product) => (
            <div key={product.id} className="shadow rounded-md p-4">
              <Link href={`/product/${product.id}`}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-[250px] object-cover rounded"
                  width={300}
                  height={250}
                />
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <LiaStarSolid
                      key={index}
                      color={index < product.rating ? 'orange' : 'gray'}
                    />
                  ))}
                  <span className="text-sm">{product.rating}/5</span>
                </div>
                <p className="font-bold mt-1">${product.price}</p>
              </Link>

              <button
                onClick={() => handleAddToWishlist(product)}
                className="mt-3 px-4 py-2 border-2 border-black rounded hover:bg-black hover:text-white"
              >
                Add to Wishlist
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mt-5">
          {/* ...Pagination UI... */}
        </div>
      </main>
    </div>
  );
}





// "use client";
// // app/items/page.tsx
// import React, { useState } from 'react';
// import Image from 'next/image';
// import { LiaStarSolid } from 'react-icons/lia';
// import Link from 'next/link';
// import { useWishlist } from '../context/WishlistContext';
// import { allProducts } from '../lib/products'; // Import products

// export default function Items() {
//   const [sortBy, setSortBy] = useState('Most Popular');
//   const { addToWishlist } = useWishlist();

//   const handleAddToWishlist = (product: typeof allProducts[number]) => {
//     addToWishlist({
//       id: product.id.toString(),
//       title: product.name,
//       price: product.price,
//       image: product.imageUrl,
//     });
//   };

//   return (
//     <div className="flex flex-col lg:flex-row">
//       {/* Sidebar Filters */}
//       <aside className="w-full hidden lg:inline lg:w-[200px] xl:w-[250px] p-5 border-r">
//         {/* ...Filter UI... */}
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1">
//         <header className="flex justify-between items-center p-5 border-b">
//           <h1 className="text-2xl font-bold">Casual</h1>
//           <div>
//             <label className="text-sm">Sort by: </label>
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="border px-2 py-1"
//             >
//               <option>Most Popular</option>
//               <option>Price: Low to High</option>
//               <option>Price: High to Low</option>
//             </select>
//           </div>
//         </header>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-5">
//           {allProducts.map((product) => (
//             <div key={product.id} className="shadow rounded-md p-4">
//               <Link href={`/product/${product.id}`}>
//                 <Image
//                   src={product.imageUrl}
//                   alt={product.name}
//                   className="w-full h-[250px] object-cover rounded"
//                   width={300}
//                   height={250}
//                 />
//                 <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
//                 <div className="flex items-center gap-1">
//                   {Array.from({ length: 5 }).map((_, index) => (
//                     <LiaStarSolid
//                       key={index}
//                       color={index < product.rating ? 'orange' : 'gray'}
//                     />
//                   ))}
//                   <span className="text-sm">{product.rating}/5</span>
//                 </div>
//                 <p className="font-bold mt-1">${product.price}</p>
//               </Link>

//               <button
//                 onClick={() => handleAddToWishlist(product)}
//                 className="mt-3 px-4 py-2 border-2 border-black rounded hover:bg-black hover:text-white"
//               >
//                 Add to Wishlist
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center items-center gap-3 mt-5">
//           {/* ...Pagination UI... */}
//         </div>
//       </main>
//     </div>
//   );
// }
