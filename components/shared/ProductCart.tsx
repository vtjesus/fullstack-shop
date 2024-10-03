import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface ProductCardProps {
  product: {
    imageUrl?: string;
    name: string;
    inStock: boolean;
    description?: string;
    price: number;
    category?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="w-full transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <Image
            src={product.imageUrl || "/placeholder.svg"}
            alt={`${product.name} Image`}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
          <Badge variant={product.inStock ? "secondary" : "destructive"} className="absolute top-4 right-4">
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm md:text-base mb-4 line-clamp-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-primary font-bold text-lg md:text-xl">${product.price.toFixed(2)}</span>
          {product.category && (
            <Badge variant="outline" className="text-xs md:text-sm">
              {product.category}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button size="sm" className="w-full" disabled={!product.inStock}>
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  )
}