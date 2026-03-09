import { createElement } from '../utils';

/**
 * Renders the main navigation header with a glassmorphism effect,
 * responsive mobile menu, and a cart trigger button.
 * 
 * @param container - The DOM element where the header will be mounted.
 */
export function renderHeader(container: HTMLElement): void {
  // Create the main header element with glassmorphism styling
  const header = createElement(
    'header',
    'sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300'
  );

  // Define the inner HTML structure
  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center cursor-pointer group">
          <div class="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center mr-2 group-hover:bg-indigo-700 transition-colors">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
          <span class="text-xl font-bold tracking-tighter text-gray-900 dark:text-white">AURA</span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <a href="#home" class="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</a>
          <a href="#shop" class="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Shop</a>
          <a href="#specs" class="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Specs</a>
          <a href="#support" class="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Support</a>
        </nav>

        <!-- Actions (Cart & Mobile Toggle) -->
        <div class="flex items-center space-x-4">
          
          <!-- Cart Trigger -->
          <button id="cart-trigger" class="relative p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full" aria-label="Open cart">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <!-- Cart Badge -->
            <span id="cart-badge" class="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full border-2 border-white dark:border-gray-900 hidden">
              0
            </span>
          </button>

          <!-- Mobile Menu Button -->
          <button id="mobile-menu-btn" class="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md" aria-label="Toggle mobile menu">
            <svg id="menu-icon-open" class="w-6 h-6 block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg id="menu-icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

      </div>
    </div>

    <!-- Mobile Menu (Hidden by default) -->
    <div id="mobile-menu" class="hidden md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 absolute w-full shadow-lg">
      <div class="px-4 pt-2 pb-4 space-y-1 sm:px-6">
        <a href="#home" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Home</a>
        <a href="#shop" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Shop</a>
        <a href="#specs" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Specs</a>
        <a href="#support" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Support</a>
      </div>
    </div>
  `;

  container.appendChild(header);

  // --- Interactivity & Event Listeners ---

  const mobileBtn = header.querySelector('#mobile-menu-btn') as HTMLButtonElement;
  const mobileMenu = header.querySelector('#mobile-menu') as HTMLDivElement;
  const iconOpen = header.querySelector('#menu-icon-open') as SVGSVGElement;
  const iconClose = header.querySelector('#menu-icon-close') as SVGSVGElement;
  const cartBtn = header.querySelector('#cart-trigger') as HTMLButtonElement;

  // Toggle Mobile Menu
  if (mobileBtn && mobileMenu && iconOpen && iconClose) {
    mobileBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        iconOpen.classList.add('hidden');
        iconOpen.classList.remove('block');
        iconClose.classList.remove('hidden');
        iconClose.classList.add('block');
      } else {
        mobileMenu.classList.add('hidden');
        iconOpen.classList.remove('hidden');
        iconOpen.classList.add('block');
        iconClose.classList.add('hidden');
        iconClose.classList.remove('block');
      }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        iconOpen.classList.remove('hidden');
        iconOpen.classList.add('block');
        iconClose.classList.add('hidden');
        iconClose.classList.remove('block');
      });
    });
  }

  // Handle Cart Trigger
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      // Dispatch a custom event that the cartModal component can listen to
      const event = new CustomEvent('toggle-cart');
      window.dispatchEvent(event);
    });
  }

  // Listen for cart updates to update the badge
  window.addEventListener('cart-updated', (e: Event) => {
    const customEvent = e as CustomEvent<{ itemCount: number }>;
    const badge = header.querySelector('#cart-badge') as HTMLSpanElement;
    
    if (badge && customEvent.detail) {
      const count = customEvent.detail.itemCount;
      badge.textContent = count.toString();
      
      if (count > 0) {
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }
  });
}