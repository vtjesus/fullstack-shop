"use client"
import React, { useState, useEffect } from 'react';
import { createProduct, listProducts, getProduct, updateProduct, deleteProduct } from '@/lib/productOperation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Schema } from '../../../amplify/data/resource';
import FileUpload from '@/components/FileUpload';

type Product = Schema['Product'];

type ProductFormData = {
  id?: string;
  name: string;
  description: string;
  price: string;
  category: string;
  inStock: boolean;
  imageUrl: string;
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    category: '',
    inStock: true,
    imageUrl: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState<'form' | 'list'>('form');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await listProducts();
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setCurrentProduct({ ...currentProduct, inStock: checked });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEditing && currentProduct.id) {
        await updateProduct(currentProduct.id, currentProduct);
      } else {
        await createProduct(currentProduct);
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const product = await getProduct(id);
      if (product.data) {
        setCurrentProduct(product.data as ProductFormData);
        setIsEditing(true);
        setViewMode('form');
      }
    } catch (error) {
      console.error('Error fetching product for edit:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const resetForm = () => {
    setCurrentProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      inStock: true,
      imageUrl: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      
      <div className="mb-4">
        <Button onClick={() => setViewMode('form')} className="mr-2">Add/Edit Product</Button>
        <Button onClick={() => setViewMode('list')}>View All Products</Button>
      </div>

      {viewMode === 'form' && (
        <form onSubmit={handleSubmit} className="mb-8">
          <Input
            type="text"
            name="name"
            value={currentProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="mb-2"
          />
          <Textarea
            name="description"
            value={currentProduct.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="mb-2"
          />
          <Input
            type="text"
            name="price"
            value={currentProduct.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="mb-2"
          />
          <Input
            type="text"
            name="category"
            value={currentProduct.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="mb-2"
          />
          <Input
            type="text"
            name="imageUrl"
            value={currentProduct.imageUrl}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="mb-2"
          />
          <div className="mb-2">
            <FileUpload />
          </div>
          <div className="flex items-center mb-2">
            <Checkbox
              id="inStock"
              checked={currentProduct.inStock}
              onCheckedChange={handleCheckboxChange}
            />
            <label htmlFor="inStock" className="ml-2">In Stock</label>
          </div>
          <Button type="submit">{isEditing ? 'Update' : 'Create'} Product</Button>
          {isEditing && (
            <Button type="button" onClick={resetForm} className="ml-2">Cancel</Button>
          )}
        </form>
      )}

      {viewMode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product:any) => (
            <div key={product.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category || 'N/A'}</p>
              <p>In Stock: {product.inStock ? 'Yes' : 'No'}</p>
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name} className="mt-2 w-full h-40 object-cover" />
              )}
              <div className="mt-2">
                <Button onClick={() => handleEdit(product.id)} className="mr-2">Edit</Button>
                <Button onClick={() => handleDelete(product.id)} variant="destructive">Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}