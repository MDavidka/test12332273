import { Product, ComponentProps } from '../types';
import { ProductCard } from './product-card';

interface ProductListProps extends ComponentProps {
  products: Product[];
}

export function ProductList(props: ProductListProps): HTMLElement {
  const list = document.createElement('div');
  list.className = `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${props.className || ''}`;
  props.products.forEach(product => {
    const card = ProductCard({ product });
    list.appendChild(card);
  });
  return list;
}