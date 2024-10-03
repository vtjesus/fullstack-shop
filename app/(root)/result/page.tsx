"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const { user } = useUser();
  console.log(user);


  // Mock search results (replace with actual data fetching logic)
  const searchResults = [
    {
      id: 1,
      name: "Modern Sofa",
      price: 599.99,
      image: "/assets/images/Featured-sofa.jpg",
    },
    {
      id: 2,
      name: "Elegant Dining Table",
      price: 399.99,
      image: "/assets/images/Featured-table.jpg",
    },
    {
      id: 3,
      name: "Wooden Bookshelf",
      price: 299.99,
      image: "/assets/images/Featured-bookshelf.jpg",
    },
    {
      id: 4,
      name: "Modern Armchair",
      price: 249.99,
      image: "/assets/images/Featured-armchair.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results for &quot;{query}&quot;</h1>
      {searchResults.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {searchResults.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card>
                <CardContent className="p-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover mb-4 rounded-md"
                  />
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-lg font-bold mb-4">
                    ₹{product.price.toFixed(2)}
                  </p>
                  <Button className="w-full">View Details</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl mb-4">No results found for &quot;{query}&quot;</p>
          <Link href="/" passHref>
            <Button>Back to Home</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

const SearchResultPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
};

export default SearchResultPage;
