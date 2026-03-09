import { createElement, cn } from '../utils';

/**
 * Local interface for phone products.
 * (Used here to ensure type safety for the grid rendering).
 */
export interface PhoneProduct {
  id: string;
  name: string;
  tagline: string;
  price: number;
  specs: string[];
  colorClass: string;
}

// Mock data for the phone models
const products: PhoneProduct[] = [
  {
    id: 'nexus-pro-max',
    name: 'Nexus Pro Max',
    tagline: 'Titanium design. Epic power.',
    price: 1199,
    specs: [
      '6.9" Super Retina XDR display',
      'A17 Pro chip with 6-core GPU',
      'Pro camera system (48MP Main)',
      'Up to 29 hours video playback'
    ],
    colorClass: 'from-slate-700 to-slate-900'
  },
  {
    id: 'nexus-pro',
    name: 'Nexus Pro',
    tagline: 'The ultimate flagship.',
    price: 999,
    specs: [
      '6.1" Super Retina XDR display',
      'A17 Pro chip with 6-core GPU',
      'Pro camera system (48MP Main)',
      'Up to 23 hours video playback'
    ],
    colorClass: 'from-indigo-900 to-blue-900'
  },
  {
    id: 'nexus-standard',
    name: 'Nexus 15',
    tagline: 'A total powerhouse.',
    price: 799,
    specs: [
      '6.1" Super Retina XDR display',
      'A16 Bionic chip with 5-core GPU',
      'Advanced dual-camera system',
      'Up to 20 hours video playback'
    ],
    colorClass: 'from-sky-400 to-blue-500'
  }
];

/**
 * Renders the product grid section displaying available phone models.
 * 
 * @param container The DOM element to append the product grid to.
 */
export function renderProductGrid(container: HTMLElement): void {
  // Main section container
  const section = createElement('section', 'py-24 px-6 md:px-12 lg:px-24 bg-bg transition-colors duration-300 relative');
  section.id = 'models';

  // Section Header
  const headerContainer = createElement('div', 'max-w-7xl mx-auto mb-16 text-center');
  
  const badge = createElement('span', 'inline-block py-1 px-3 rounded-full bg-secondary text-primary text-sm font-semibold tracking-wider uppercase mb-4');
  badge.textContent = 'The Lineup';
  
  const title = createElement('h2', 'text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text mb-6 tracking-tight');
  title.textContent = 'Which Nexus is right for you?';
  
  const subtitle = createElement('p', 'text-xl text-muted max-w-2xl mx-auto');
  subtitle.textContent = 'Explore our latest collection of premium smartphones, engineered to elevate your everyday experience.';

  headerContainer.appendChild(badge);
  headerContainer.appendChild(title);
  headerContainer.appendChild(subtitle);
  section.appendChild(headerContainer);

  // Grid Container
  const grid = createElement('div', 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 max-w-7xl mx-auto');

  // Render Product Cards
  products.forEach(product => {
    const card = createElement('div', 'card flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden');

    // Image/Mockup Area
    const imageWrapper = createElement('div', 'w-full h-72 rounded-xl mb-8 flex items-center justify-center relative bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300');
    
    // Abstract Phone Mockup using Tailwind
    const phoneShape = createElement('div', cn(
      'w-36 h-64 rounded-[2rem] shadow-xl border-[6px] border-gray-800 dark:border-gray-300 bg-gradient-to-br relative transition-transform duration-500 group-hover:scale-105',
      product.colorClass
    ));
    
    // Camera bump detail on the mockup
    const cameraBump = createElement('div', 'absolute top-4 left-4 w-10 h-10 bg-black/30 rounded-xl backdrop-blur-md border border-white/10');
    phoneShape.appendChild(cameraBump);
    
    // Screen reflection detail
    const reflection = createElement('div', 'absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-[1.5rem]');
    phoneShape.appendChild(reflection);

    imageWrapper.appendChild(phoneShape);

    // Content Area
    const content = createElement('div', 'flex-grow flex flex-col');
    
    const name = createElement('h3', 'text-2xl font-heading font-bold text-text mb-1');
    name.textContent = product.name;
    
    const tagline = createElement('p', 'text-primary font-medium mb-6 h-6');
    tagline.textContent = product.tagline;

    // Specifications List
    const specsList = createElement('ul', 'space-y-3 mb-8 flex-grow');
    product.specs.forEach(spec => {
      const li = createElement('li', 'text-sm text-muted flex items-start');
      li.innerHTML = `
        <svg class="w-5 h-5 mr-3 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="leading-tight">${spec}</span>
      `;
      specsList.appendChild(li);
    });

    // Pricing
    const priceContainer = createElement('div', 'mb-6');
    const priceLabel = createElement('p', 'text-xs text-muted uppercase tracking-wider mb-1');
    priceLabel.textContent = 'Starting at';
    const price = createElement('div', 'text-3xl font-heading font-bold text-text');
    price.textContent = `$${product.price}`;
    
    priceContainer.appendChild(priceLabel);
    priceContainer.appendChild(price);

    // Action Buttons
    const actions = createElement('div', 'flex flex-col gap-3 mt-auto');
    
    const buyBtn = createElement('button', 'btn-primary py-3 text-base');
    buyBtn.textContent = 'Add to Cart';
    buyBtn.onclick = () => {
      // Dispatch a custom event that the cart component can listen to
      const event = new CustomEvent('cart-add', { 
        detail: { 
          id: product.id, 
          name: product.name, 
          price: product.price 
        } 
      });
      window.dispatchEvent(event);
      
      // Visual feedback on the button
      const originalText = buyBtn.textContent;
      buyBtn.textContent = 'Added to Cart!';
      buyBtn.classList.add('bg-green-600', 'hover:bg-green-700');
      buyBtn.classList.remove('bg-primary', 'hover:bg-primary-hover');
      
      setTimeout(() => {
        if (buyBtn) {
          buyBtn.textContent = originalText;
          buyBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
          buyBtn.classList.add('bg-primary', 'hover:bg-primary-hover');
        }
      }, 2000);
    };

    const learnBtn = createElement('button', 'btn-outline py-3 text-base');
    learnBtn.textContent = 'Learn More';

    actions.appendChild(buyBtn);
    actions.appendChild(learnBtn);

    // Assemble Card
    content.appendChild(name);
    content.appendChild(tagline);
    content.appendChild(specsList);
    content.appendChild(priceContainer);
    content.appendChild(actions);

    card.appendChild(imageWrapper);
    card.appendChild(content);
    grid.appendChild(card);
  });

  section.appendChild(grid);
  container.appendChild(section);
}