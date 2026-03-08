import { StoreInfo, NavItem } from '../types';

export function Header(storeInfo: StoreInfo, navItems: NavItem[]): HTMLElement {
  const header = document.createElement('header');
  // Fixed header with transition for scroll effects
  header.className = 'fixed w-full top-0 z-50 transition-all duration-300 bg-[var(--color-surface)] shadow-[var(--shadow-sm)]';

  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        
        <!-- Logo -->
        <a href="#" class="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded-md p-1">
          <!-- Heart/Leaf hybrid icon fitting for a flower delivery shop -->
          <svg class="w-8 h-8 text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          <span class="font-heading font-bold text-2xl text-[var(--color-text)] tracking-tight group-hover:text-[var(--color-primary)] transition-colors duration-300">
            ${storeInfo.name}
          </span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          ${navItems.map(item => `
            <a href="${item.href}" class="text-[var(--color-text)] hover:text-[var(--color-primary)] font-medium transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[var(--color-primary)] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded-sm">
              ${item.label}
            </a>
          `).join('')}
        </nav>

        <!-- Actions (Cart & Mobile Menu Toggle) -->
        <div class="flex items-center gap-2 sm:gap-4">
          
          <!-- Shopping Cart Button -->
          <button id="cart-toggle" class="relative p-2 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded-full group" aria-label="Kosár megnyitása">
            <svg class="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <span id="cart-badge" class="absolute top-0 right-0 bg-[var(--color-accent)] text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1/4 -translate-y-1/4 border-2 border-[var(--color-surface)] shadow-sm transition-transform duration-300">
              0
            </span>
          </button>

          <!-- Mobile Menu Toggle -->
          <button id="mobile-menu-toggle" class="md:hidden p-2 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded-md" aria-label="Menü megnyitása">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Dropdown -->
    <div id="mobile-menu" class="hidden md:hidden bg-[var(--color-surface)] border-t border-[var(--color-border)] shadow-[var(--shadow-md)] absolute w-full left-0 top-20 origin-top transition-all duration-300">
      <nav class="flex flex-col px-4 py-4 space-y-2">
        ${navItems.map(item => `
          <a href="${item.href}" class="mobile-nav-link block px-4 py-3 rounded-[var(--radius-md)] text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 font-medium text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
            ${item.label}
          </a>
        `).join('')}
      </nav>
    </div>
  `;

  // --- Event Listeners ---

  const mobileToggle = header.querySelector('#mobile-menu-toggle');
  const mobileMenu = header.querySelector('#mobile-menu');
  const mobileLinks = header.querySelectorAll('.mobile-nav-link');
  const cartToggle = header.querySelector('#cart-toggle');

  // Toggle mobile menu visibility
  mobileToggle?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });

  // Close mobile menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
    });
  });

  // Dispatch custom event to open the cart sidebar/modal
  cartToggle?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('toggle-cart'));
  });

  // Listen for global cart updates to animate and update the badge count
  window.addEventListener('cart-updated', ((e: CustomEvent) => {
    const badge = header.querySelector('#cart-badge');
    if (badge && e.detail && typeof e.detail.count === 'number') {
      badge.textContent = e.detail.count.toString();
      
      // Pop animation on update
      badge.classList.add('scale-125');
      setTimeout(() => {
        badge.classList.remove('scale-125');
      }, 200);
    }
  }) as EventListener);

  // Add shadow on scroll for better depth perception
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('shadow-[var(--shadow-md)]');
      header.classList.remove('shadow-[var(--shadow-sm)]');
    } else {
      header.classList.add('shadow-[var(--shadow-sm)]');
      header.classList.remove('shadow-[var(--shadow-md)]');
    }
  });

  return header;
}