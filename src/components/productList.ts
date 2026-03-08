import { ProductListProps } from '../types';
import { ProductCard } from './productCard';

export function ProductList(props: ProductListProps): HTMLElement {
  const container = document.createElement('div');
  
  // Apply responsive grid classes and any custom classes passed via props
  container.className = `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full ${props.className || ''}`.trim();

  // Handle empty state
  if (!props.products || !Array.isArray(props.products) || props.products.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'col-span-full flex flex-col items-center justify-center py-16 text-[var(--color-muted)] bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border)] border-dashed';
    emptyState.innerHTML = `
      <svg class="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <h3 class="text-lg font-heading font-semibold text-[var(--color-text)]">No plants found</h3>
      <p class="text-sm mt-2 max-w-sm text-center">We couldn't find any plants matching your criteria. Please check back later or adjust your search.</p>
    `;
    container.appendChild(emptyState);
    return container;
  }

  // Render product cards
  props.products.forEach(product => {
    const card = ProductCard({
      product,
      onAddToCart: props.onAddToCart
    });
    container.appendChild(card);
  });

  return container;
}