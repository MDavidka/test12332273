import { Product } from './types';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function filterProducts(products: Product[], query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
}