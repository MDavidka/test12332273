import { siteConfig, navItems } from '../utils';

export function renderHeader(container: HTMLElement): void {
  // Generate desktop navigation links
  const desktopLinks = navItems.map(item => `
    <a href="${item.href}" class="text-body hover:text-accent transition-colors font-medium text-sm uppercase tracking-wider">
      ${item.label}
    </a>
  `).join('');

  // Generate mobile navigation links
  const mobileLinks = navItems.map(item => `
    <a href="${item.href}" class="block px-3 py-3 rounded-md text-base font-medium text-body hover:text-accent hover:bg-theme transition-colors mobile-nav-link">
      ${item.label}
    </a>
  `).join('');

  // Botanical Leaf Icon SVG
  const leafIcon = `
    <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.5,2.5c-2.5,0-5.5,1.5-7.5,4c-2,2.5-3,6-2.5,9.5c-1.5,1.5-3.5,3.5-4.5,5l1.5,1.5c1.5-1,3.5-3,5-4.5c3.5,0.5,7-0.5,9.5-2.5c2.5-2,4-5,4-7.5C23,4.5,19.5,2.5,17.5,2.5z M16.5,11.5c-1.5,1.5-4,2-6,1.5c1-2,1.5-4.5,0-6c2,1,4.5,0.5,6-1C17.5,7.5,18,10,16.5,11.5z"/>
    </svg>
  `;

  // Construct the header HTML
  container.innerHTML = `
    <header class="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-subtle shadow-sm transition-all duration-300" id="main-header">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
            <div class="transform group-hover:scale-110 transition-transform duration-300">
              ${leafIcon}
            </div>
            <span class="font-heading text-2xl md:text-3xl font-bold text-primary tracking-tight">
              ${siteConfig.storeName}
            </span>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex space-x-8 items-center">
            ${desktopLinks}
            <a href="#catalog" class="bg-primary hover:bg-primary-light text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-soft hover:shadow-soft-hover transform hover:-translate-y-0.5">
              Shop Collection
            </a>
          </nav>

          <!-- Mobile menu button -->
          <div class="flex items-center md:hidden">
            <button type="button" id="mobile-menu-btn" class="text-body hover:text-primary focus:outline-none p-2 rounded-md transition-colors" aria-controls="mobile-menu" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <!-- Hamburger icon -->
              <svg class="block h-7 w-7" id="icon-menu" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!-- Close icon -->
              <svg class="hidden h-7 w-7" id="icon-close" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Dropdown -->
      <div class="md:hidden hidden absolute w-full bg-surface border-b border-subtle shadow-lg z-40 origin-top transition-all duration-200 ease-in-out" id="mobile-menu">
        <div class="px-4 pt-2 pb-6 space-y-2 sm:px-6">
          ${mobileLinks}
          <div class="pt-4 pb-2">
            <a href="#catalog" class="block w-full text-center bg-primary hover:bg-primary-light text-white px-5 py-3 rounded-md font-medium transition-colors mobile-nav-link shadow-soft">
              Shop Collection
            </a>
          </div>
        </div>
      </div>
    </header>
  `;

  // Initialize mobile menu interactivity
  initMobileMenu();
}

/**
 * Handles the mobile menu toggle logic and event listeners
 */
function initMobileMenu(): void {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!btn || !menu || !iconMenu || !iconClose) return;

  const toggleMenu = () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', (!isExpanded).toString());
    
    // Toggle visibility classes
    menu.classList.toggle('hidden');
    iconMenu.classList.toggle('hidden');
    iconMenu.classList.toggle('block');
    iconClose.classList.toggle('hidden');
    iconClose.classList.toggle('block');
  };

  // Toggle menu on button click
  btn.addEventListener('click', toggleMenu);

  // Close menu when a navigation link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!menu.classList.contains('hidden')) {
        toggleMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    const target = event.target as Node;
    const isClickInsideHeader = document.getElementById('main-header')?.contains(target);
    
    if (!isClickInsideHeader && !menu.classList.contains('hidden')) {
      toggleMenu();
    }
  });
}