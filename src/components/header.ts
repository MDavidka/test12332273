import { StoreInfo, NavItem } from '../types';
import { createEl } from '../utils';

/**
 * Renders the main navigation header for the website.
 * Includes a responsive mobile menu and scroll-based styling.
 * 
 * @param storeInfo - Information about the store (name, etc.)
 * @param navItems - Array of navigation links
 * @returns The constructed header HTMLElement
 */
export function Header(storeInfo: StoreInfo, navItems: NavItem[]): HTMLElement {
  // Create the main header element
  const header = createEl('header', {
    className: 'fixed w-full top-0 z-50 bg-[var(--color-bg)]/95 backdrop-blur-md border-b border-[var(--color-border)] transition-all duration-300'
  });

  // Container for max-width and padding
  const container = createEl('div', {
    className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
  });

  // Flex container for the nav items
  const nav = createEl('nav', {
    className: 'flex justify-between items-center h-20'
  });

  // 1. Logo & Brand Name
  const logoContainer = createEl('a', {
    href: '#',
    className: 'flex items-center gap-3 group'
  });
  
  // Leaf icon for the plant store
  logoContainer.innerHTML = `
    <div class="bg-[var(--color-primary)]/10 p-2 rounded-[var(--radius-md)] group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
      </svg>
    </div>
    <span class="font-heading font-bold text-2xl text-[var(--color-text)] tracking-tight">${storeInfo.name}</span>
  `;

  // 2. Desktop Navigation
  const desktopNav = createEl('div', {
    className: 'hidden md:flex items-center gap-8'
  });

  navItems.forEach(item => {
    const link = createEl('a', {
      href: item.href,
      className: 'text-[var(--color-text)] hover:text-[var(--color-primary)] font-medium transition-colors text-sm uppercase tracking-wider relative after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--color-primary)] after:transition-all hover:after:w-full'
    });
    link.textContent = item.label;
    desktopNav.appendChild(link);
  });

  // 3. Mobile Menu Toggle Button
  const mobileBtn = createEl('button', {
    className: 'md:hidden p-2 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors rounded-[var(--radius-md)] hover:bg-[var(--color-border)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]',
    ariaLabel: 'Toggle menu'
  });
  
  // Hamburger icon
  mobileBtn.innerHTML = `
    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  `;

  // 4. Mobile Navigation Menu (Hidden by default)
  const mobileMenu = createEl('div', {
    className: 'md:hidden hidden bg-[var(--color-bg)] border-t border-[var(--color-border)] absolute top-full left-0 w-full shadow-lg origin-top transition-all duration-300'
  });
  
  const mobileNavList = createEl('div', {
    className: 'flex flex-col px-4 py-6 space-y-4'
  });

  navItems.forEach(item => {
    const link = createEl('a', {
      href: item.href,
      className: 'text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 px-4 py-3 rounded-[var(--radius-md)] font-medium transition-colors text-lg block'
    });
    link.textContent = item.label;
    
    // Close mobile menu when a link is clicked
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
    
    mobileNavList.appendChild(link);
  });

  mobileMenu.appendChild(mobileNavList);

  // Toggle mobile menu visibility
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Add scroll effect to header (shadow on scroll)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('shadow-sm');
      header.classList.replace('bg-[var(--color-bg)]/95', 'bg-[var(--color-bg)]/98');
    } else {
      header.classList.remove('shadow-sm');
      header.classList.replace('bg-[var(--color-bg)]/98', 'bg-[var(--color-bg)]/95');
    }
  });

  // Assemble the header
  nav.appendChild(logoContainer);
  nav.appendChild(desktopNav);
  nav.appendChild(mobileBtn);
  
  container.appendChild(nav);
  header.appendChild(container);
  header.appendChild(mobileMenu);

  return header;
}