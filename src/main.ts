import './style.css';
import { Header } from './components/header';
import { Hero } from './components/hero';
import { Catalog } from './components/catalog';
import { Cart } from './components/cart';
import { CheckoutForm } from './components/checkoutForm';
import { Footer } from './components/footer';
import { StoreInfo, NavItem } from './types';
import { store } from './store';

// --- Configuration Data ---

const storeInfo: StoreInfo = {
  name: 'PlantHaven',
  tagline: 'Hozd el a természetet az otthonodba',
  description: 'Különleges szobanövények, stílusos kiegészítők és szakértő ápolási tanácsadás egy helyen.',
  address: '1051 Budapest, Növény utca 42.',
  phone: '+36 1 234 5678',
  email: 'hello@planthaven.hu',
  openingHours: [
    { days: 'Hétfő - Péntek', hours: '10:00 - 18:00' },
    { days: 'Szombat', hours: '10:00 - 14:00' },
    { days: 'Vasárnap', hours: 'Zárva' }
  ],
  socialLinks: [
    { platform: 'Facebook', url: '#', iconSvg: '' },
    { platform: 'Instagram', url: '#', iconSvg: '' }
  ]
};

const navItems: NavItem[] = [
  { label: 'Kezdőlap', href: '#hero' },
  { label: 'Kínálatunk', href: '#katalogus' },
  { label: 'Pénztár', href: '#penztar' }
];

// --- Main Initialization ---

/**
 * Initializes the application, mounts all components to the DOM,
 * and sets up global event listeners.
 */
export function init(): void {
  const app = document.getElementById('app');
  
  if (!app) {
    console.error('Critical Error: Root element #app not found in the DOM.');
    return;
  }

  // Clear any existing content (useful for HMR in Vite)
  app.innerHTML = '';

  // Create the main layout wrapper
  // pt-20 offsets the content so it isn't hidden behind the fixed header
  const main = document.createElement('main');
  main.className = 'flex-grow pt-20 flex flex-col min-h-screen';

  // 1. Mount Header
  app.appendChild(Header(storeInfo, navItems));

  // 2. Mount Page Sections
  main.appendChild(Hero());
  main.appendChild(Catalog());
  main.appendChild(CheckoutForm());

  app.appendChild(main);

  // 3. Mount Footer
  app.appendChild(Footer());

  // 4. Mount Global Overlays (Cart Drawer)
  app.appendChild(Cart());

  // 5. Add Floating Cart Button for easy access
  app.appendChild(createFloatingCartButton());

  // 6. Setup Global Navigation Events
  setupCheckoutNavigation();
}

// --- Helper Functions ---

/**
 * Creates a floating action button to toggle the shopping cart.
 * Includes a dynamic badge that updates when items are added.
 */
function createFloatingCartButton(): HTMLElement {
  const btn = document.createElement('button');
  btn.className = 'fixed bottom-6 right-6 z-40 bg-[var(--color-primary)] text-white p-4 rounded-full shadow-[var(--shadow-lg)] hover:bg-[var(--color-primary-hover)] hover:scale-105 hover:shadow-[var(--shadow-hover)] transition-all duration-300 flex items-center justify-center group border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/30';
  btn.setAttribute('aria-label', 'Kosár megnyitása');
  
  // Function to re-render the button content based on store state
  const updateBadge = () => {
    const state = store.getState();
    const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:-rotate-12">
        <circle cx="8" cy="21" r="1"></circle>
        <circle cx="19" cy="21" r="1"></circle>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
      </svg>
      ${count > 0 ? `
        <span class="absolute -top-2 -right-2 bg-[var(--color-accent)] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-[var(--color-bg)] shadow-sm animate-fade-in">
          ${count}
        </span>
      ` : ''}
    `;
  };

  // Toggle cart visibility on click
  btn.addEventListener('click', () => {
    store.setIsCartOpen(true);
  });

  // Subscribe to store changes to keep the badge updated
  store.subscribe(updateBadge);
  updateBadge(); // Initial render

  return btn;
}

/**
 * Listens to the global store to detect when the user clicks "Proceed to Checkout"
 * from the Cart drawer, and smoothly scrolls them to the Checkout section.
 */
function setupCheckoutNavigation(): void {
  let wasCheckoutOpen = false;
  
  store.subscribe(() => {
    const state = store.getState();
    
    // Detect transition: checkout just became true
    if (state.isCheckoutOpen && !wasCheckoutOpen) {
      const checkoutSection = document.getElementById('penztar');
      
      if (checkoutSection) {
        // Calculate position with offset for the fixed header
        const headerOffset = 80;
        const elementPosition = checkoutSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      
      // Reset the state immediately so the action can be triggered again later
      setTimeout(() => store.setIsCheckoutOpen(false), 100);
    }
    
    wasCheckoutOpen = state.isCheckoutOpen;
  });
}

// --- Bootstrap ---

// Automatically initialize the app when the DOM is fully loaded
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', init);
}