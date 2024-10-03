'use client';

import React from 'react';
import Link from "next/link";
import { RelatedProduct } from './shared.types';

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Related Products</h2>
          <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div key={product.id} className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                <Link href="#" className="absolute inset-0 z-10">
                  <span className="sr-only">View</span>
                </Link>
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  width={500}
                  height={400}
                  className="object-cover w-full h-64"
                  style={{ aspectRatio: "500/400", objectFit: "cover" }}
                />
                <div className="p-4 bg-background">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  <h4 className="text-lg font-semibold md:text-xl">${product.price.toFixed(2)}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}