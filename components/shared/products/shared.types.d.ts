export interface Product {
    name: string;
    description: string;
    price: number;
    features: string[];
    inStock: boolean;
    imageSrc: string;
  }
  
  export interface Review {
    id: string;
    name: string;
    avatar: string;
    date: string;
    rating: number;
    content: string;
  }
  
  export interface RelatedProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    imageSrc: string;
  }