// src/app/wishlist/page.tsx
"use client";

import React from 'react';
import { useWishlist } from '@/context/WishlistContext';
import Image from 'next/image';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="border rounded-md p-4 shadow-sm">
              <Link href={`/product/${item.id}`}>
                <Image
                  src={item.image || '/placeholder.png'}
                  alt={item.title}
                  width={300}
                  height={300}
                  className="object-cover w-full h-[300px] rounded"
                />
                <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
                <p className="font-bold">${item.price}</p>
              </Link>

              <button
                onClick={() => removeFromWishlist(item.id)}
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


