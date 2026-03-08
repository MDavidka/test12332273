import { ProductCardProps } from '../types';
import { formatCurrency } from '../utils';

export function ProductCard({ product, onAddToCart, className = '' }: ProductCardProps): HTMLElement {
  const card = document.createElement('article');
  card.className = `card ${className}`.trim();

  // Build the inner HTML structure using the design system tokens
  card.innerHTML = `
    <div class="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg)]">
      <img 
        src="${product.image}" 
        alt="${product.name}" 
        class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        loading="lazy"
        onerror="this.src='https://images.unsplash.com/photo-1497250681558-4439204f328f?auto=format&fit=crop&w=600&q=80'"
      />
      ${product.brand ? `
        <span class="absolute top-3 right-3 bg-[var(--color-secondary)]/90 backdrop-blur-sm text-[var(--color-text)] text-xs font-bold px-2.5 py-1 rounded-full border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
          ${product.brand}
        </span>
      ` : ''}
    </div>
    
    <div class="p-5 flex flex-col flex-grow gap-3">
      <div>
        <h3 class="text-lg font-bold text-[var(--color-text)] line-clamp-1" title="${product.name}">
          ${product.name}
        </h3>
        <p class="text-sm text-[var(--color-muted)] line-clamp-2 mt-1.5 leading-relaxed" title="${product.description}">
          ${product.description}
        </p>
      </div>

      <div class="mt-auto pt-4 flex items-center justify-between border-t border-[var(--color-border)]">
        <div class="flex flex-col">
          <span class="text-xs text-[var(--color-muted)] uppercase tracking-wider font-semibold mb-0.5">Price</span>
          <span class="text-xl font-bold text-[var(--color-primary)] drop-shadow-sm">
            ${formatCurrency(product.price)}
          </span>
        </div>
        
        <button 
          type="button" 
          class="btn-primary py-2 px-4 text-sm group"
          aria-label="Add ${product.name} to cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:-translate-y-0.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
            <path d="M3 6h18"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          Add
        </button>
      </div>
    </div>
  `;

  // Safely attach event listeners
  const addToCartBtn = card.querySelector('button');
  
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Visual feedback animation
      addToCartBtn.classList.add('scale-95', 'opacity-80');
      setTimeout(() => {
        addToCartBtn.classList.remove('scale-95', 'opacity-80');
      }, 150);

      // Trigger the callback
      onAddToCart(product);
    });
  }

  return card;
}