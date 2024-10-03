'use client';

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}


export default function ProductDisplay({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="block">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="relative h-64 w-full">
          <Image
            src={product.imageUrl.startsWith('http') ? product.imageUrl : `/${product.imageUrl}`}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-6">
          <Badge variant="secondary" className="mb-2">
            {product.id}
          </Badge>
          <h2 className="text-2xl font-bold text-primary mb-2 line-clamp-1">
            {product.name}
          </h2>
          <p className="text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
          <div className="text-3xl font-bold text-primary">
            ₹{product.price.toFixed(2)}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Add to Cart</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}