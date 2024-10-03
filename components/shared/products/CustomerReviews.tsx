'use client';

import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Review } from './shared.types';

interface CustomerReviewsProps {
  reviews: Review[];
}

export function CustomerReviews({ reviews }: CustomerReviewsProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Customer Reviews</h2>
            <div className="mt-4 grid gap-8">
              {reviews.map((review) => (
                <div key={review.id} className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-4">
                    <div className="flex gap-4 items-start">
                      <div className="grid gap-0.5 text-sm">
                        <h3 className="font-semibold">{review.name}</h3>
                        <time className="text-sm text-muted-foreground">{review.date}</time>
                      </div>
                      <div className="flex items-center gap-0.5 ml-auto">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <StarIcon
                            key={index}
                            className={`w-5 h-5 ${
                              index < review.rating ? 'fill-primary' : 'fill-muted stroke-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm leading-loose text-muted-foreground">
                      <p>{review.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}