import { createIcons, Menu, X, ShoppingBag, Leaf } from 'lucide';
import { NavItem } from '../types';

// Define navigation links for the header
const navItems: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Shop', href: '#shop' },
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
];

/**
 * Renders the main navigation header.
 * Includes a responsive mobile menu and glassmorphism styling.
 * 
 * @param container The DOM element to append the header to.
 */
export function renderHeader(container: HTMLElement): void {
  const header = document.createElement('header');
  // Using the .glass utility class defined in style.css for a modern, airy feel
  header.className = 'sticky top-0 z-50 w-full glass transition-all duration-300';

  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        
        <!-- Logo -->
        <a href="#" class="flex items-center gap-2 group" aria-label="Botanica Home">
          <div class="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
            <i data-lucide="leaf" class="w-6 h-6 text-primary"></i>
          </div>
          <span class="font-bold text-2xl tracking-tight text-secondary">Botanica</span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          ${navItems.map(item => `
            <a href="${item.href}" class="text-sm font-medium text-text-muted hover:text-primary transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">
              ${item.label}
            </a>
          `).join('')}
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-4">
          <!-- Mock Cart Button -->
          <button class="p-2 text-text-muted hover:text-primary transition-colors relative group" aria-label="Shopping Cart">
            <i data-lucide="shopping-bag" class="w-6 h-6 group-hover:scale-110 transition-transform"></i>
            <!-- Notification Dot -->
            <span class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-accent border-2 border-surface rounded-full"></span>
          </button>
          
          <!-- Mobile Menu Toggle -->
          <button id="mobile-menu-btn" class="md:hidden p-2 text-text-muted hover:text-primary transition-colors" aria-label="Toggle Menu">
            <i data-lucide="menu" class="w-6 h-6" id="menu-icon"></i>
            <i data-lucide="x" class="w-6 h-6 hidden" id="close-icon"></i>
          </button>
        </div>

      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <div id="mobile-menu" class="hidden md:hidden bg-surface border-b border-border absolute w-full shadow-lg">
      <div class="px-4 pt-2 pb-6 space-y-2">
        ${navItems.map(item => `
          <a href="${item.href}" class="block px-4 py-3 rounded-lg text-base font-medium text-secondary hover:text-primary hover:bg-bg transition-colors">
            ${item.label}
          </a>
        `).join('')}
      </div>
    </div>
  `;

  container.appendChild(header);

  // Initialize Lucide icons for the header
  createIcons({
    icons: {
      Menu,
      X,
      ShoppingBag,
      Leaf
    },
    attrs: {
      'stroke-width': '2'
    }
  });

  // Mobile Menu Interactivity
  const mobileBtn = header.querySelector('#mobile-menu-btn');
  const mobileMenu = header.querySelector('#mobile-menu');
  const menuIcon = header.querySelector('#menu-icon');
  const closeIcon = header.querySelector('#close-icon');
  const mobileLinks = mobileMenu?.querySelectorAll('a');

  let isMenuOpen = false;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
      mobileMenu?.classList.remove('hidden');
      menuIcon?.classList.add('hidden');
      closeIcon?.classList.remove('hidden');
    } else {
      mobileMenu?.classList.add('hidden');
      menuIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
    }
  };

  mobileBtn?.addEventListener('click', toggleMenu);

  // Close mobile menu when a link is clicked
  mobileLinks?.forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) toggleMenu();
    });
  });
}