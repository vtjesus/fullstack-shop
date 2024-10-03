import { generateClient } from 'aws-amplify/api';
import { Schema } from '../amplify/data/resource';



const client = generateClient<Schema>();

// Create a new product
type ProductInput = {
  name: string;
  description?: string;
  price: string;
  category?: string;
  inStock: boolean;
  imageUrl?: string;
};

export async function createProduct(product: ProductInput) {
  try {
    const newProduct = await client.models.Product.create(product);
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

// Read all products
export async function listProducts() {
  try {
    const products = await client.models.Product.list();
    console.log(products)
    return products;
  } catch (error) {
    console.error('Error listing products:', error);
    throw error;
  }
}


// Read a single product by ID
export async function getProduct(id: string) {
  try {
    const product = await client.models.Product.get({ id });
    return product;
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
}

// Update a product
export async function updateProduct(id: string, updates: Partial<Schema['Product']>) {
  try {
    const updatedProduct = await client.models.Product.update({
      id,
      ...updates,
    });
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    const deletedProduct = await client.models.Product.delete({ id });
    return deletedProduct;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

// Get related products
export async function getRelatedProducts(category: string, limit: number = 3) {
  try {
    const relatedProducts = await client.models.Product.list({
      filter: {
        category: { eq: category }
      },
      limit: limit
    });

    return relatedProducts;
  } catch (error) {
    console.error('Error getting related products:', error);
    throw error;
  }
}