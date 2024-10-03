"use client"

import React from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2Icon, PlusIcon, MinusIcon, ShoppingCartIcon } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] sm:h-[60vh]">
          <ShoppingCartIcon className="w-16 h-16 sm:w-24 sm:h-24 text-primary mb-3 sm:mb-4" />
          <p className="text-xl sm:text-2xl text-gray-600 mb-2">Your cart is empty</p>
          <p className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4 text-center">Looks like you haven&apos;t added any items to your cart yet.</p>
          <Link href="/" passHref>
            <Button className="mt-2 sm:mt-4">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
          <div className="w-full lg:w-2/3 space-y-6 sm:space-y-8 mb-8 lg:mb-0 lg:mr-8">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="w-full">
                  <CardContent className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6">
                    <div className="mb-3 sm:mb-0 text-center sm:text-left">
                      <h3 className="text-base sm:text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm sm:text-base text-gray-600">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <MinusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      <span className="mx-2 sm:mx-3 text-sm sm:text-base">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <PlusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="w-full lg:w-1/3 lg:sticky lg:top-20">
            <Card className="w-full">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5">Cart Summary</h2>
                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <p>Total Items: {totalItems}</p>
                  <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
                </div>
                <Link href="/checkout" passHref>
                  <Button className="w-full mt-4 sm:mt-5">
                    Proceed to Checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
