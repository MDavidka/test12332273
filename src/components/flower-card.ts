import { Flower } from '../types';
import { getDifficultyBadgeClasses, createElement } from '../utils';

/**
 * Creates a DOM element representing a single flower card.
 * Displays the flower's image, name, description, and key properties.
 * 
 * @param flower The flower data object to render
 * @returns An HTMLElement containing the fully constructed flower card
 */
export function createFlowerCard(flower: Flower): HTMLElement {
  // Create the main article container using the utility function
  // 'card' class is defined in src/style.css with custom design tokens
  const article = createElement('article', ['card', 'flex', 'flex-col', 'h-full', 'group', 'bg-surface']);
  
  // Define SVG icons for the properties
  const iconSun = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`;
  const iconWater = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 15a9 9 0 0018 0c0-5.5-9-12-9-12s-9 6.5-9 12z" /></svg>`;
  const iconLeaf = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>`;
  const iconHeart = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>`;

  // Construct the inner HTML structure
  article.innerHTML = `
    <!-- Image Section -->
    <div class="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-slate-800">
      <img 
        src="${flower.imageUrl}" 
        alt="${flower.name}" 
        class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
      />
      <!-- Difficulty Badge overlay -->
      <div class="absolute top-4 right-4 z-10">
        <span class="${getDifficultyBadgeClasses(flower.properties.difficulty)} px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md border border-white/20 dark:border-black/20">
          ${flower.properties.difficulty}
        </span>
      </div>
      <!-- Gradient overlay for better text contrast if needed, though currently image is clean -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>

    <!-- Content Section -->
    <div class="p-6 flex flex-col flex-grow">
      <!-- Header -->
      <div class="mb-3">
        <h3 class="text-2xl font-heading font-bold text-text mb-1 group-hover:text-primary transition-colors duration-200">
          ${flower.name}
        </h3>
        <p class="text-sm text-text-muted italic font-medium">
          ${flower.scientificName}
        </p>
      </div>

      <!-- Description -->
      <p class="text-text-muted text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
        ${flower.description}
      </p>

      <!-- Properties Grid -->
      <div class="grid grid-cols-2 gap-y-3 gap-x-4 text-sm border-t border-border pt-5 mt-auto">
        
        <!-- Light Requirement -->
        <div class="flex items-center text-text-muted" title="Fényigény: ${flower.properties.lightRequirement}">
          ${iconSun}
          <span class="truncate font-medium">${flower.properties.lightRequirement}</span>
        </div>
        
        <!-- Water Requirement -->
        <div class="flex items-center text-text-muted" title="Vízigény: ${flower.properties.waterRequirement}">
          ${iconWater}
          <span class="truncate font-medium">${flower.properties.waterRequirement}</span>
        </div>
        
        <!-- Blooming Season -->
        <div class="flex items-center text-text-muted" title="Virágzási idő: ${flower.properties.bloomingSeason}">
          ${iconLeaf}
          <span class="truncate font-medium">${flower.properties.bloomingSeason}</span>
        </div>

        <!-- Symbolism (Optional) -->
        ${flower.properties.symbolism ? `
          <div class="flex items-center text-text-muted" title="Jelentés: ${flower.properties.symbolism}">
            ${iconHeart}
            <span class="truncate font-medium">${flower.properties.symbolism}</span>
          </div>
        ` : '<div></div>'}
      </div>
    </div>
  `;

  return article;
}