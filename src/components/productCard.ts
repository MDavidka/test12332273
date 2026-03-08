import { createElement } from '../utils';

export interface FlowerProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  /** Optional badge text, e.g., "Új", "Népszerű", "Szezonális" */
  badge?: string;
}

export interface ProductCardProps {
  product: FlowerProduct;
  onAddToCart: (product: FlowerProduct) => void;
}

/**
 * Renders an individual flower bouquet product card with an "Add to Cart" button.
 * 
 * @param props - The product data and the callback for adding to cart.
 * @returns The constructed HTMLElement representing the product card.
 */
export function ProductCard({ product, onAddToCart }: ProductCardProps): HTMLElement {
  // Create the main article container using the utility function
  const card = createElement<HTMLElement>(
    'article', 
    'card group flex flex-col h-full bg-[var(--color-surface)] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-md)] transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:-translate-y-1 border border-[var(--color-border)] relative'
  );

  // Format price in Hungarian Forint (HUF)
  const formattedPrice = new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency: 'HUF',
    maximumFractionDigits: 0
  }).format(product.price);

  // Generate badge HTML if a badge is provided
  const badgeHtml = product.badge 
    ? `<span class="absolute top-4 left-4 bg-[var(--color-accent)] text-white text-xs font-bold px-3 py-1 rounded-[var(--radius-full)] z-20 shadow-sm uppercase tracking-wider">${product.badge}</span>` 
    : '';

  // Set the inner HTML structure of the card
  card.innerHTML = `
    <div class="relative h-64 sm:h-72 overflow-hidden bg-[var(--color-bg)]">
      ${badgeHtml}
      <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none"></div>
      <img 
        src="${product.imageUrl}" 
        alt="${product.name}" 
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    
    <div class="p-5 sm:p-6 flex flex-col flex-grow">
      <div class="flex justify-between items-start mb-3 gap-4">
        <h3 class="text-lg sm:text-xl font-heading font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
          ${product.name}
        </h3>
        <span class="text-lg font-bold text-[var(--color-primary)] whitespace-nowrap">
          ${formattedPrice}
        </span>
      </div>
      
      <p class="text-[var(--color-muted)] text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
        ${product.description}
      </p>
      
      <button 
        type="button"
        class="btn-primary w-full mt-auto flex items-center justify-center gap-2 group/btn relative overflow-hidden"
        aria-label="${product.name} kosárba tétele"
      >
        <span class="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></span>
        <svg class="w-5 h-5 relative z-10 transition-transform group-hover/btn:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <span class="relative z-10 font-medium">Kosárba</span>
      </button>
    </div>
  `;

  // Attach event listener to the "Add to Cart" button
  const button = card.querySelector('button');
  if (button) {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Visual feedback animation on click
      button.classList.add('scale-95', 'bg-[var(--color-primary-hover)]');
      
      // Change text temporarily to provide feedback
      const textSpan = button.querySelector('span.font-medium');
      const originalText = textSpan?.textContent || 'Kosárba';
      if (textSpan) textSpan.textContent = 'Hozzáadva!';
      
      setTimeout(() => {
        button.classList.remove('scale-95', 'bg-[var(--color-primary-hover)]');
        if (textSpan) textSpan.textContent = originalText;
      }, 800);

      // Trigger the provided callback
      onAddToCart(product);
    });
  }

  return card;
}