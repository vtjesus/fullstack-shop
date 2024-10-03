'use client';

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from './shared.types';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', product.name);
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:gap-12 md:px-6">
        <div>
          <img
            src={product.imageSrc}
            alt={product.name}
            width={600}
            height={600}
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
          />
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{product.name}</h1>
            <p className="text-muted-foreground md:text-xl">{product.description}</p>
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <h3 className="text-lg font-semibold">Key Features:</h3>
              <ul className="grid gap-2 text-muted-foreground">
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-2">
              <h3 className="text-lg font-semibold">Price and Availability</h3>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                <Badge variant="outline">{product.inStock ? 'In Stock' : 'Out of Stock'}</Badge>
              </div>
              <Button size="lg" onClick={handleAddToCart}>Add to Cart</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}