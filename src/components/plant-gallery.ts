import { Plant } from '../types';
import { plants, formatCurrency } from '../utils';

/**
 * Renders the plant gallery section displaying a grid of plant cards.
 * @param container The DOM element to mount the gallery into.
 */
export function renderPlantGallery(container: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'shop';
  section.className = 'py-20 px-6 md:px-12 lg:px-24 bg-[var(--color-bg)]';

  // Create the header for the gallery
  const headerHTML = `
    <div class="max-w-7xl mx-auto mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="max-w-2xl">
        <h2 class="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4 tracking-tight">
          Our Curated Collection
        </h2>
        <p class="text-lg text-[var(--color-text-muted)]">
          Discover our hand-picked selection of beautiful, healthy plants ready to transform your space. From easy-care beginners to rare collector's items.
        </p>
      </div>
      <div class="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
        <button class="px-4 py-2 rounded-full bg-[var(--color-primary)] text-white text-sm font-medium whitespace-nowrap transition-transform hover:scale-105">All Plants</button>
        <button class="px-4 py-2 rounded-full bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] text-sm font-medium whitespace-nowrap transition-colors hover:border-[var(--color-primary)]">Indoor</button>
        <button class="px-4 py-2 rounded-full bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] text-sm font-medium whitespace-nowrap transition-colors hover:border-[var(--color-primary)]">Pet Friendly</button>
      </div>
    </div>
  `;

  // Generate the HTML for the plant cards
  const cardsHTML = plants.map((plant: Plant) => `
    <article class="group flex flex-col bg-[var(--color-surface)] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[var(--color-border)]">
      <div class="relative aspect-[4/5] overflow-hidden bg-[#eef2ef]">
        <img 
          src="${plant.imageUrl}" 
          alt="${plant.name}" 
          class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        ${plant.isPopular ? `
          <div class="absolute top-4 left-4 bg-[var(--color-accent)] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            Bestseller
          </div>
        ` : ''}
        <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button class="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[var(--color-text)] flex items-center justify-center hover:text-[var(--color-accent)] shadow-sm transition-colors" aria-label="Add to favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
        </div>
      </div>
      
      <div class="p-6 flex flex-col flex-grow">
        <div class="flex justify-between items-start mb-2 gap-4">
          <div>
            <h3 class="text-xl font-semibold text-[var(--color-text)] leading-tight group-hover:text-[var(--color-primary)] transition-colors">${plant.name}</h3>
            <p class="text-sm text-[var(--color-text-muted)] mt-1 italic">${plant.botanicalName}</p>
          </div>
          <span class="text-lg font-bold text-[var(--color-secondary)]">${formatCurrency(plant.price)}</span>
        </div>
        
        <p class="text-sm text-[var(--color-text-muted)] mt-3 line-clamp-2 flex-grow">
          ${plant.description}
        </p>
        
        <div class="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center px-2.5 py-1 rounded-md bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text-muted)] border border-[var(--color-border)]">
              ${plant.difficulty}
            </span>
            <span class="inline-flex items-center px-2.5 py-1 rounded-md bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text-muted)] border border-[var(--color-border)]">
              ${plant.lightRequirement}
            </span>
          </div>
          
          <button 
            class="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center hover:bg-[var(--color-secondary)] transition-colors duration-300 shadow-sm flex-shrink-0" 
            aria-label="Add ${plant.name} to cart"
            onclick="alert('Added ${plant.name} to cart!')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </button>
        </div>
      </div>
    </article>
  `).join('');

  // Combine header and grid
  section.innerHTML = `
    ${headerHTML}
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        ${cardsHTML}
      </div>
    </div>
  `;

  container.appendChild(section);
}