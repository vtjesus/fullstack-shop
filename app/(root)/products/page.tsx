import React from 'react';

import { Product, Review, RelatedProduct } from '@/components/shared/products/shared.types';
import { RelatedProducts } from '@/components/shared/products/RelatedProducts';
import { CustomerReviews } from '@/components/shared/products/CustomerReviews';
import { ProductDetails } from '@/components/shared/products/ProductDetails';

// This would typically come from a database or API
const product: Product = {
  name: "Acme Wireless Headphones",
  description: "Experience the ultimate in audio quality and comfort with our Acme Wireless Headphones.",
  price: 99.99,
  features: [
    "Noise-cancelling technology",
    "Wireless Bluetooth connectivity",
    "Up to 20 hours of battery life",
    "Comfortable, adjustable design"
  ],
  inStock: true,
  imageSrc: "/placeholder.svg"
};

const reviews: Review[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder-user.jpg",
    date: "2 days ago",
    rating: 3,
    content: "I've been using the Acme Wireless Headphones for a few weeks now, and they've been a game-changer. The noise-cancelling feature is incredible, and the battery life is impressive. Highly recommended!"
  },
  {
    id: "2",
    name: "Alex Smith",
    avatar: "/placeholder-user.jpg",
    date: "3 weeks ago",
    rating: 3,
    content: "The Acme Wireless Headphones have exceeded my expectations. The sound quality is fantastic, and the comfortable design makes them a pleasure to wear for extended periods. I highly recommend them to anyone looking for a great pair of wireless headphones."
  }
];

const relatedProducts: RelatedProduct[] = [
  {
    id: "1",
    name: "Acme Wireless Earbuds",
    description: "Immersive audio experience",
    price: 79.99,
    imageSrc: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Acme Wireless Speakers",
    description: "Powerful audio for any room",
    price: 149.99,
    imageSrc: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Acme Wireless Headphones",
    description: "Premium audio experience",
    price: 99.99,
    imageSrc: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Acme Wireless Charger",
    description: "Fast and convenient charging",
    price: 49.99,
    imageSrc: "/placeholder.svg"
  }
];

export default function ProductPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <ProductDetails product={product} />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Product Description</h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our Acme Wireless Headphones are designed to provide you with the ultimate audio experience. With
                advanced noise-cancelling technology, you can immerse yourself in your music, podcasts, or calls without
                distractions. The wireless Bluetooth connectivity allows you to move freely, while the long-lasting
                battery life ensures you can enjoy your audio for up to 20 hours on a single charge.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose Acme?</h2>
              <ul className="mt-4 grid gap-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                  Exceptional sound quality for an immersive listening experience
                </li>
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                  Comfortable, adjustable design for all-day wear
                </li>
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                  Durable construction to withstand everyday use
                </li>
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-primary" />
                  Backed by our industry-leading warranty and customer support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <CustomerReviews reviews={reviews} />
      <RelatedProducts products={relatedProducts} />
    </div>
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