import { siteConfig } from '../utils';

/**
 * Renders the main header and navigation for the website.
 * Includes a responsive mobile menu with toggle functionality.
 * 
 * @param container The DOM element to append the header to.
 */
export function renderHeader(container: HTMLElement): void {
  // Create the main header element
  const header = document.createElement('header');
  // Apply Tailwind classes and custom design tokens (bg-surface)
  header.className = 'sticky top-0 z-50 w-full border-b border-gray-200 dark:border-slate-700 bg-surface/95 backdrop-blur-sm transition-colors duration-300 shadow-sm';

  // Generate desktop navigation links
  const navItemsHtml = siteConfig.navItems.map(item => `
    <a href="${item.href}" class="text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200">
      ${item.label}
    </a>
  `).join('');

  // Generate mobile navigation links
  const mobileNavItemsHtml = siteConfig.navItems.map(item => `
    <a href="${item.href}" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-200 mobile-link">
      ${item.label}
    </a>
  `).join('');

  // Set the inner HTML structure
  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        
        <!-- Logo & Brand -->
        <div class="flex-shrink-0 flex items-center">
          <a href="#home" class="text-3xl font-heading font-bold text-primary flex items-center gap-2 group">
            <!-- Leaf Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-hover:-rotate-12">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
            ${siteConfig.title}
          </a>
        </div>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex space-x-8 items-center">
          ${navItemsHtml}
          <a href="#catalog" class="btn-primary text-sm px-5 py-2.5">
            Katalógus megtekintése
          </a>
        </nav>

        <!-- Mobile Menu Toggle Button -->
        <div class="flex items-center md:hidden">
          <button type="button" id="mobile-menu-btn" class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors" aria-expanded="false">
            <span class="sr-only">Főmenü megnyitása</span>
            <!-- Hamburger Icon -->
            <svg id="icon-menu" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Close Icon -->
            <svg id="icon-close" class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div id="mobile-menu" class="hidden md:hidden border-t border-gray-200 dark:border-slate-700 bg-surface shadow-lg absolute w-full">
      <div class="px-4 pt-2 pb-4 space-y-1 sm:px-6">
        ${mobileNavItemsHtml}
        <div class="pt-2">
          <a href="#catalog" class="btn-primary w-full text-center text-sm px-5 py-2.5 mobile-link">
            Katalógus megtekintése
          </a>
        </div>
      </div>
    </div>
  `;

  // Append to the DOM
  container.appendChild(header);

  // Attach event listeners for mobile menu functionality
  const mobileBtn = header.querySelector('#mobile-menu-btn');
  const mobileMenu = header.querySelector('#mobile-menu');
  const iconMenu = header.querySelector('#icon-menu');
  const iconClose = header.querySelector('#icon-close');
  const mobileLinks = header.querySelectorAll('.mobile-link');

  if (mobileBtn && mobileMenu && iconMenu && iconClose) {
    let isMenuOpen = false;

    const toggleMenu = () => {
      isMenuOpen = !isMenuOpen;
      if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        iconMenu.classList.add('hidden');
        iconClose.classList.remove('hidden');
        mobileBtn.setAttribute('aria-expanded', 'true');
      } else {
        mobileMenu.classList.add('hidden');
        iconMenu.classList.remove('hidden');
        iconClose.classList.add('hidden');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    };

    // Toggle menu on button click
    mobileBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
      });
    });
  }
}