import { Product, ComponentProps } from '../types';
import { formatCurrency } from '../utils';

interface ProductCardProps extends ComponentProps {
  product: Product;
}

export function ProductCard(props: ProductCardProps): HTMLElement {
  const card = document.createElement('div');
  card.className = `bg-white rounded-md shadow-md p-4 ${props.className || ''}`;
  card.innerHTML = `
    <img src="${props.product.image}" alt="${props.product.name}" class="w-full h-48 object-cover rounded-md mb-2">
    <h3 class="text-lg font-semibold text-color-text">${props.product.name}</h3>
    <p class="text-color-muted">${formatCurrency(props.product.price)}</p>
    <a href="/product/${props.product.id}" class="inline-block mt-2 px-4 py-2 bg-color-primary text-white rounded-md hover:bg-color-secondary">View Details</a>
  `;
  return card;
}