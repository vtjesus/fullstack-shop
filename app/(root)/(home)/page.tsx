"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import React from "react";
import ProductCard from "@/components/home/ProductCard";

export default function Component(): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-start justify-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Discover the Best Products for Your Home
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Explore our wide range of high-quality products that will
                transform your living space.
              </p>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Shop Now
              </Link>
            </div>
            <Image
              src="/assets/images/hero-product.jpg"
              width={550}
              height={550}
              alt="Hero Product"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
        </section>

        {/* Category Section */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 md:gap-8 lg:grid-cols-4">
              {/* Furniture Category */}
              <motion.div
                className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-muted p-6 text-center"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 8px rgba(0,0,0,0.2)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SofaIcon className="h-10 w-10" />
                <h3 className="text-lg font-semibold">Furniture</h3>
                <Link
                  href="#"
                  className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4"
                  prefetch={false}
                >
                  Shop Furniture
                </Link>
              </motion.div>
              {/* Decor Category */}
              <motion.div
                className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-muted p-6 text-center"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 8px rgba(0,0,0,0.2)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <WallpaperIcon className="h-10 w-10" />
                <h3 className="text-lg font-semibold">Decor</h3>
                <Link
                  href="#"
                  className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4"
                  prefetch={false}
                >
                  Shop Decor
                </Link>
              </motion.div>
              {/* Lighting Category */}
              <motion.div
                className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-muted p-6 text-center"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 8px rgba(0,0,0,0.2)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <LightbulbIcon className="h-10 w-10" />
                <h3 className="text-lg font-semibold">Lighting</h3>
                <Link
                  href="#"
                  className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4"
                  prefetch={false}
                >
                  Shop Lighting
                </Link>
              </motion.div>
              {/* Appliances Category */}
              <motion.div
                className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-muted p-6 text-center"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 8px rgba(0,0,0,0.2)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ApertureIcon className="h-10 w-10" />
                <h3 className="text-lg font-semibold">Appliances</h3>
                <Link
                  href="#"
                  className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4"
                  prefetch={false}
                >
                  Shop Appliances
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <motion.div
            className="container mx-auto px-4 md:px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="space-y-2 text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Products
              </h2>
              <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
                Check out our best-selling products that are perfect for your
                home.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Product 1: Comfy Sofa */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              >
                <Card>
                  <Image
                    src="/assets/images/Featured-sofa.jpg"
                    width={300}
                    height={300}
                    alt="Product 1"
                    className="aspect-square rounded-t-lg object-cover"
                  />
                  <ProductCard id={1} name="Comfy Sofa" price={499.99} />
                </Card>
              </motion.div>
              {/* Product 2: Minimalist Lamp */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              >
                <Card>
                  <Image
                    src="/assets/images/Featured-lamp.jpg"
                    width={300}
                    height={300}
                    alt="Product 2"
                    className="aspect-square rounded-t-lg object-cover"
                  />
                  <ProductCard id={2} name="Minimalist Lamp" price={79.99} />
                </Card>
              </motion.div>
              {/* Product 3: Wooden Bookshelf */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
              >
                <Card>
                  <Image
                    src="/assets/images/Featured-bookshelf.jpg"
                    width={300}
                    height={300}
                    alt="Product 3"
                    className="aspect-square rounded-t-lg object-cover"
                  />
                  <ProductCard id={3} name="Wooden Bookshelf" price={299.99} />
                </Card>
              </motion.div>
              {/* Product 4: Modern Armchair */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
              >
                <Card>
                  <Image
                    src="/assets/images/Featured-armchair.jpg"
                    width={300}
                    height={300}
                    alt="Product 4"
                    className="aspect-square rounded-t-lg object-cover"
                  />
                  <ProductCard id={4} name="Modern Armchair" price={249.99} />
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </main>
      {/* Footer Section */}
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          {/* Company Information */}
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Link href="#" prefetch={false}>
              About Us
            </Link>
            <Link href="#" prefetch={false}>
              Our Team
            </Link>
            <Link href="#" prefetch={false}>
              Careers
            </Link>
            <Link href="#" prefetch={false}>
              News
            </Link>
          </div>
          {/* Product Categories */}
          <div className="grid gap-1">
            <h3 className="font-semibold">Products</h3>
            <Link href="#" prefetch={false}>
              Furniture
            </Link>
            <Link href="#" prefetch={false}>
              Decor
            </Link>
            <Link href="#" prefetch={false}>
              Lighting
            </Link>
            <Link href="#" prefetch={false}>
              Appliances
            </Link>
          </div>
          {/* Resources */}
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link href="#" prefetch={false}>
              Blog
            </Link>
            <Link href="#" prefetch={false}>
              FAQs
            </Link>
            <Link href="#" prefetch={false}>
              Support
            </Link>
            <Link href="#" prefetch={false}>
              Shipping &amp; Returns
            </Link>
          </div>
          {/* Legal Information */}
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Link href="#" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" prefetch={false}>
              Cookie Policy
            </Link>
          </div>
          {/* Newsletter Subscription */}
          <div className="grid gap-1">
            <h3 className="font-semibold">Newsletter</h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter to stay up-to-date with our latest
              products and offers.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button type="submit">Subscribe</Button>
            </form>
            {/* Social Media Links */}
            <div className="flex gap-4 text-muted-foreground">
              <Link href="#" className="hover:text-foreground" prefetch={false}>
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-foreground" prefetch={false}>
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-foreground" prefetch={false}>
                <InstagramIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  // You can add any additional props specific to your icons here
}

function ApertureIcon(props: IconProps): JSX.Element {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m14.31 8 5.74 9.94" />
      <path d="M9.69 8h11.48" />
      <path d="m7.38 12 5.74-9.94" />
      <path d="M9.69 16 3.95 6.06" />
      <path d="M14.31 16H2.83" />
      <path d="m16.62 12-5.74 9.94" />
    </svg>
  );
}

function FacebookIcon(props: IconProps): JSX.Element {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: IconProps): JSX.Element {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LightbulbIcon(props: IconProps): JSX.Element {
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
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

function SofaIcon(props: any) {
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
      <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
      <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" />
      <path d="M4 18v2" />
      <path d="M20 18v2" />
      <path d="M12 4v9" />
    </svg>
  );
}

function TwitterIcon(props: any) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function WallpaperIcon(props: any) {
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
      <circle cx="8" cy="9" r="2" />
      <path d="m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  );
}
