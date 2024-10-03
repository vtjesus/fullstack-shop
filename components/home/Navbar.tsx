"use client"

// Importing necessary components and hooks
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import { useCart } from "@/context/CartContext"
import { signOut } from "aws-amplify/auth"
import { useUser } from '@/context/UserContext'

import GlobalSearch from "./GlobalSearch"

export default function Navbar() {
  // State and hooks for navbar functionality
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const [cartItemCount, setCartItemCount] = useState(0)
  const { cart } = useCart()
  const { user, refreshUser } = useUser()

  // Dynamic styles for header based on scroll position
  const headerBackground = useTransform(
    scrollY,
    [0, 50],
    ["hsla(var(--background) / 0)", "hsla(var(--background) / 1)"]
  )

  const headerShadow = useTransform(
    scrollY,
    [0, 50],
    ["0px 0px 0px hsla(var(--foreground) / 0)", "0px 1px 2px hsla(var(--foreground) / 0.1)"]
  )

  // Effect to update scroll state
  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", updateScroll)
    return () => window.removeEventListener("scroll", updateScroll)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut();
      await refreshUser();
      // Redirect or update state as needed after sign out
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  }

  return (
    // Main header component with dynamic styling
    <motion.header
      className="w-full sticky top-0 z-50"
      style={{
        backgroundColor: headerBackground,
        boxShadow: headerShadow,
      }}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="text-lg font-bold">Acme Inc</span>
          </Link>
        </motion.div>

        {/* Search form for desktop */}
        <GlobalSearch />

        {/* Navigation links for desktop */}
        <motion.nav
          className="hidden gap-4 md:flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/" className="text-sm font-medium hover:underline hover:underline-offset-4" prefetch={false}>
            Home
          </Link>
          <Link href="/products" className="text-sm font-medium hover:underline hover:underline-offset-4" prefetch={false}>
            Products
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:underline hover:underline-offset-4" prefetch={false}>
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline hover:underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline hover:underline-offset-4" prefetch={false}>
            Contact
          </Link>
          {/* Shopping cart icon with item count */}
          <Link href="/cart">
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cart.length > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  {cart.length}
                </motion.span>
              )}
            </motion.div>
          </Link>
          {/* Sign In/Sign Out Button */}
          {user ? (
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <Link href="/sign-in">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </motion.nav>

        {/* Mobile menu sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            {/* Mobile menu header */}
            <div className="flex h-16 items-center justify-between px-4">
              <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <MountainIcon className="h-6 w-6" />
                <span className="text-lg font-bold">Acme Inc</span>
              </Link>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <XIcon className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </SheetClose>
            </div>
            {/* Mobile menu content */}
            <div className="grid gap-4 px-4 py-6">
              {/* Mobile search input */}
              <div className="relative">
                <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                  <SearchIcon className="h-4 w-4" />
                </div>
                <Input type="search" placeholder="Search..." className="w-full rounded-md pl-8" />
              </div>
              {/* Mobile navigation links */}
              <Link
                href="/"
                className="flex items-center gap-2 text-sm font-medium hover:underline hover:underline-offset-4"
                prefetch={false}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-2 text-sm font-medium hover:underline hover:underline-offset-4"
                prefetch={false}
              >
                Products
              </Link>
              <Link
                href="/pricing"
                className="flex items-center gap-2 text-sm font-medium hover:underline hover:underline-offset-4"
                prefetch={false}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-2 text-sm font-medium hover:underline hover:underline-offset-4"
                prefetch={false}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-sm font-medium hover:underline hover:underline-offset-4"
                prefetch={false}
              >
                Contact
              </Link>
              {/* Mobile shopping cart */}
              <Link href="/cart" className="flex items-center gap-2">
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="text-sm font-medium">Cart ({cart.length})</span>
              </Link> 
              {/* Mobile Sign In/Sign Out Button */}
              {user ? (
                <Button variant="outline" size="sm" className="w-full" onClick={handleSignOut}>
                  Sign Out
                </Button>
              ) : (
                <Link href="/sign-in">
                  <Button variant="outline" size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}

// Icon components
function MenuIcon(props: any) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function MountainIcon(props: any) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function XIcon(props: any) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function ShoppingCartIcon(props: any) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}