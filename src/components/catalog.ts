import { plants, formatCurrency, getCareLevelBadgeClasses, escapeHtml } from '../utils';
import { Plant } from '../types';

export function renderCatalog(container: HTMLElement): void {
  // Generate the HTML for individual plant cards
  const plantCardsHTML = plants.map((plant: Plant) => {
    const safeName = escapeHtml(plant.name);
    const safeScientificName = plant.scientificName ? escapeHtml(plant.scientificName) : '';
    const safeDescription = escapeHtml(plant.description);
    const formattedPrice = formatCurrency(plant.price);
    const careBadgeClasses = getCareLevelBadgeClasses(plant.careLevel);

    return `
      <article class="bg-surface rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all duration-300 group flex flex-col h-full border border-subtle transform hover:-translate-y-1">
        <!-- Image Container -->
        <div class="relative h-72 overflow-hidden bg-theme">
          <img 
            src="${plant.imageUrl}" 
            alt="${safeName}" 
            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          
          <!-- Badges -->
          <div class="absolute top-4 left-4 flex flex-col gap-2">
            ${plant.isFeatured ? `
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-accent text-white shadow-sm">
                Featured
              </span>
            ` : ''}
          </div>
          <div class="absolute top-4 right-4">
            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-md ${careBadgeClasses}">
              ${plant.careLevel} Care
            </span>
          </div>
        </div>

        <!-- Card Content -->
        <div class="p-6 flex flex-col flex-grow">
          <div class="flex justify-between items-start mb-1 gap-4">
            <h3 class="font-heading text-xl font-bold text-primary leading-tight">
              ${safeName}
            </h3>
            <span class="font-body font-semibold text-lg text-primary-light whitespace-nowrap">
              ${formattedPrice}
            </span>
          </div>
          
          ${safeScientificName ? `
            <p class="text-sm text-muted italic mb-4 font-body">
              ${safeScientificName}
            </p>
          ` : '<div class="mb-4"></div>'}
          
          <p class="text-body text-sm text-muted mb-6 flex-grow line-clamp-3">
            ${safeDescription}
          </p>
          
          <!-- Plant Requirements -->
          <div class="flex items-center gap-4 mb-6 text-xs font-medium text-muted">
            <div class="flex items-center gap-1.5" title="Light Requirement">
              <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <span>${plant.lightRequirement}</span>
            </div>
          </div>
          
          <!-- Action Button -->
          <div class="mt-auto pt-4 border-t border-subtle">
            <button 
              type="button"
              class="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-300 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onclick="alert('In a full application, this would add ${safeName} to your cart or open an inquiry form.')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              Add to Collection
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Construct the full catalog section HTML
  const catalogHTML = `
    <section class="py-16 lg:py-24 bg-theme" id="catalog">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Our Curated Collection
          </h2>
          <p class="text-base sm:text-lg text-muted font-body">
            Explore our hand-picked selection of premium indoor plants. Whether you're a seasoned plant parent or just starting out, we have the perfect green companion for your space.
          </p>
        </div>

        <!-- Filters / Sorting (Visual Only for Static Demo) -->
        <div class="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-subtle gap-4">
          <p class="text-sm text-muted font-medium">
            Showing all <span class="text-primary font-bold">${plants.length}</span> plants
          </p>
          <div class="flex gap-2">
            <select class="block w-full pl-3 pr-10 py-2 text-base border-subtle focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-surface text-body shadow-sm cursor-pointer" aria-label="Sort plants">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Care: Easiest First</option>
            </select>
          </div>
        </div>

        <!-- Plant Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          ${plantCardsHTML}
        </div>
        
        <!-- Load More (Visual Only) -->
        <div class="mt-16 text-center">
          <button type="button" class="inline-flex items-center px-6 py-3 border border-subtle shadow-sm text-base font-medium rounded-full text-primary bg-surface hover:bg-theme transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            View More Plants
          </button>
        </div>

      </div>
    </section>
  `;

  container.innerHTML = catalogHTML;
}