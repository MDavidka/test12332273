import { store } from '../store';

export function Header(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'sticky top-0 z-40 w-full backdrop-blur-md transition-colors duration-500 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80';

  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
          <div class="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors">
            <svg class="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <!-- Stylized Leaf Icon -->
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </div>
          <span class="font-heading font-bold text-xl tracking-tight text-[var(--color-text)]">
            Leaf<span class="text-[var(--color-primary)]">&</span>Stem
          </span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <a href="#" class="text-[var(--color-text)] hover:text-[var(--color-primary)] px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
          <a href="#shop" class="text-[var(--color-text)] hover:text-[var(--color-primary)] px-3 py-2 rounded-md text-sm font-medium transition-colors">Shop Plants</a>
          <a href="#care" class="text-[var(--color-text)] hover:text-[var(--color-primary)] px-3 py-2 rounded-md text-sm font-medium transition-colors">Care Guide</a>
        </nav>

        <!-- Actions (Cart) -->
        <div class="flex items-center">
          <button id="cart-btn" class="relative p-2 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 shadow-sm">
            <span class="sr-only">Open cart</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <!-- Shopping Bag Icon -->
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <!-- Cart Badge -->
            <span id="cart-badge" class="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 text-[10px] font-bold leading-none text-white bg-[var(--color-accent)] rounded-full hidden shadow-sm border-2 border-[var(--color-bg)] transition-transform duration-300 scale-0">
              0
            </span>
          </button>
        </div>

      </div>
    </div>
  `;

  // Event Listeners
  const cartBtn = header.querySelector('#cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      store.toggleCart();
    });
  }

  // State Subscription for Cart Badge
  const cartBadge = header.querySelector('#cart-badge') as HTMLSpanElement;
  
  store.subscribe((state) => {
    if (!cartBadge) return;
    
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
      cartBadge.textContent = totalItems > 99 ? '99+' : totalItems.toString();
      cartBadge.classList.remove('hidden');
      // Small timeout to allow display:block to apply before scaling up for animation
      requestAnimationFrame(() => {
        cartBadge.classList.remove('scale-0');
        cartBadge.classList.add('scale-100');
      });
    } else {
      cartBadge.classList.remove('scale-100');
      cartBadge.classList.add('scale-0');
      // Wait for animation to finish before hiding
      setTimeout(() => {
        if (state.cart.length === 0) {
          cartBadge.classList.add('hidden');
        }
      }, 300);
    }
  });

  return header;
}