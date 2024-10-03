"use client"
import React from 'react';
import { useCart } from '../../context/CartContext';
import { CardContent } from '../ui/card';

interface ProductCardProps {
  id: number | number;
  name: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price, quantity: 1 });
  };

  return (

    <CardContent className="p-4 space-y-2">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-muted-foreground">₹{price}</p>


      <button onClick={handleAddToCart} className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">Add to Cart</button>
    </CardContent>

  );
};

export default ProductCard;