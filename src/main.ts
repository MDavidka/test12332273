import './style.css';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { ProductList } from './components/productList';
import { Cart } from './components/cart';
import { Checkout } from './components/checkout';
import { store } from './store';
import { Product } from './types';

// Mock Data for the Plant Store
const plants: Product[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    brand: 'Tropicals',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d40?auto=format&fit=crop&w=600&q=80',
    description: 'Famous for its natural leaf-holes, this vibrant green beauty brings a tropical vibe to any space.',
    features: ['Low maintenance', 'Air purifying']
  },
  {
    id: '2',
    name: 'Fiddle Leaf Fig',
    brand: 'Ficus',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1597055958656-7b18709d1d10?auto=format&fit=crop&w=600&q=80',
    description: 'A popular indoor tree featuring very large, heavily veined, and violin-shaped leaves.',
    features: ['Bright indirect light', 'Statement piece']
  },
  {
    id: '3',
    name: 'Snake Plant',
    brand: 'Succulents',
    price: 30.00,
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=600&q=80',
    description: 'One of the most tolerant plants out there. It can survive low light levels and drought.',
    features: ['Extremely hardy', 'Air purifying']
  },
  {
    id: '4',
    name: 'Peace Lily',
    brand: 'Flowering',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=600&q=80',
    description: 'A beautiful indoor plant that produces elegant white flowers and dark green leaves.',
    features: ['Low light tolerant', 'Moisture loving']
  },
  {
    id: '5',
    name: 'Aloe Vera',
    brand: 'Succulents',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1596547609652-9cb5d8d737bf?auto=format&fit=crop&w=600&q=80',
    description: 'A stylish and practical succulent known for the soothing gel inside its leaves.',
    features: ['Medicinal properties', 'Drought tolerant']
  },
  {
    id: '6',
    name: 'ZZ Plant',
    brand: 'Tropicals',
    price: 40.00,
    image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=600&q=80',
    description: 'Characterized by its thick, waxy, green leaves. It is a great air purifier and incredibly tough.',
    features: ['Low light tolerant', 'Infrequent watering']
  }
];

/**
 * Simple toast notification system for user feedback
 */
function showToast(message: string): void {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-24 right-6 bg-[var(--color-surface)] border border-[var(--color-primary)] text-[var(--color-text)] px-4 py-3 rounded-[var(--radius)] shadow-[var(--shadow-cyan)] z-50 transform transition-all duration-300 translate-y-10 opacity-0 flex items-center gap-3';
  toast.innerHTML = `
    <svg class="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
    <span class="font-medium">${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  // Animate in
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-10', 'opacity-0');
  });

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * Main application initialization
 */
export function init(): void {
  const app = document.getElementById('app');
  if (!app) {
    console.error('Root element #app not found');
    return;
  }

  // Clear any existing content
  app.innerHTML = '';

  // Create main layout wrapper
  const layout = document.createElement('div');
  layout.className = 'min-h-screen flex flex-col relative bg-[var(--color-bg)]';

  // 1. Header
  // Using 'any' to bypass strict type checking for the legacy Header component props
  const headerProps: any = {
    siteName: 'Plant Haven',
    navItems: [
      { label: 'Shop', href: '#' },
      { label: 'Care Guide', href: '#' },
      { label: 'About Us', href: '#' }
    ]
  };
  const headerEl = Header(headerProps);
  
  // 2. Floating Cart Button (Ensures cart is always accessible)
  const floatingCartBtn = document.createElement('button');
  floatingCartBtn.className = 'fixed bottom-6 right-6 bg-[var(--color-primary)] text-[#0b0f19] p-4 rounded-full shadow-[var(--shadow-cyan)] z-30 hover:scale-110 transition-transform flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]';
  floatingCartBtn.setAttribute('aria-label', 'Open Cart');
  floatingCartBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
    <span id="cart-badge" class="absolute -top-2 -right-2 bg-[var(--color-accent)] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[var(--color-bg)] hidden transition-transform duration-300">0</span>
  `;
  
  floatingCartBtn.addEventListener('click', () => {
    store.setIsCartOpen(true);
  });

  // Update floating cart badge reactively
  store.subscribe(() => {
    const state = store.getState();
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = floatingCartBtn.querySelector('#cart-badge');
    
    if (badge) {
      if (totalItems > 0) {
        badge.textContent = totalItems.toString();
        badge.classList.remove('hidden');
        // Pop animation on update
        badge.classList.add('scale-125');
        setTimeout(() => badge.classList.remove('scale-125'), 200);
      } else {
        badge.classList.add('hidden');
      }
    }
  });

  // 3. Main Content Area
  const main = document.createElement('main');
  main.className = 'flex-grow container mx-auto px-4 py-8 flex flex-col gap-12';

  // Hero Section
  const hero = document.createElement('section');
  hero.className = 'text-center py-16 px-6 bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-md)] relative overflow-hidden';
  hero.innerHTML = `
    <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%2300e5ff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
    <div class="relative z-10">
      <span class="text-[var(--color-primary)] font-semibold tracking-wider uppercase text-sm mb-4 block">Welcome to Plant Haven</span>
      <h1 class="text-4xl md:text-6xl font-heading font-bold text-[var(--color-text)] mb-6 tracking-tight">Bring Nature <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)]">Indoors</span></h1>
      <p class="text-lg text-[var(--color-muted)] max-w-2xl mx-auto mb-8 leading-relaxed">Discover our curated collection of beautiful, healthy plants delivered straight to your door. Perfect for any space and experience level.</p>
      <button class="btn-primary py-3 px-8 text-lg shadow-[var(--shadow-cyan)]" onclick="document.getElementById('products-section').scrollIntoView({behavior: 'smooth'})">
        Shop Now
      </button>
    </div>
  `;
  main.appendChild(hero);

  // Product List Section
  const productSection = document.createElement('section');
  productSection.id = 'products-section';
  productSection.className = 'scroll-mt-8';
  
  const sectionHeader = document.createElement('div');
  sectionHeader.className = 'flex items-center justify-between mb-8';
  sectionHeader.innerHTML = `
    <h2 class="text-3xl font-heading font-bold text-[var(--color-text)] flex items-center gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[var(--color-primary)]"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
      Featured Plants
    </h2>
  `;
  productSection.appendChild(sectionHeader);
  
  const productListEl = ProductList({
    products: plants,
    onAddToCart: (product) => {
      store.addToCart(product);
      showToast(`${product.name} added to cart!`);
    }
  });
  
  productSection.appendChild(productListEl);
  main.appendChild(productSection);

  // 4. Footer
  const footerEl = Footer({});

  // 5. Modals / Overlays
  const cartEl = Cart();
  const checkoutEl = Checkout();

  // Assemble the DOM
  layout.appendChild(headerEl);
  layout.appendChild(main);
  layout.appendChild(footerEl);
  layout.appendChild(floatingCartBtn);
  layout.appendChild(cartEl);
  layout.appendChild(checkoutEl);

  app.appendChild(layout);
}

// Bootstrap the application safely
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}