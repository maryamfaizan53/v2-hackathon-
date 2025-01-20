"use client"
// components/ProductCard.tsx
import React from 'react';
import { WishlistItem, useWishlist } from '../context/WishlistContext';
import Image from 'next/image';

interface ProductCardProps {
  product: WishlistItem; // Reusing the same interface for simplicity
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist } = useWishlist();

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  return (
    <div className="border rounded-md p-4 flex flex-col items-center gap-2">
      {product.image && (
        <Image
         src={product.image}
         width={500}
         height={500}
         alt={product.title}
         className="w-32 h-32 object-cover" />
      )}
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-gray-600">${product.price}</p>
      <button
        onClick={handleAddToWishlist}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add to Wishlist
      </button>
    </div>
  );
};

export default ProductCard;
