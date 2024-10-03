import React, { useEffect, useState } from 'react';
import { listProducts } from '../../../app/lib/productOperations';
import { Schema } from '../../database/product.model';

function ProductList() {
  const [products, setProducts] = useState<Schema['Product'][]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productList = await listProducts();
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      {products.map((product:any) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <p>In Stock: {product.inStock ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;