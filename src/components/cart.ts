import { store } from '../store';
import { formatCurrency } from '../utils';

export function Cart(): HTMLElement {
  const container = document.createElement('div');
  container.id = 'cart-container';

  const render = () => {
    const state = store.getState();
    const isOpen = state.isCartOpen;
    const cartItems = state.cart;
    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    container.innerHTML = `
      <!-- Overlay -->
      <div 
        id="cart-overlay" 
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}"
        aria-hidden="true"
      ></div>

      <!-- Drawer -->
      <div 
        id="cart-drawer" 
        class="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-surface)] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}"
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="cart-title"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
          <h2 id="cart-title" class="text-2xl font-heading font-semibold text-[var(--color-text)]">Your Cart</h2>
          <button id="close-cart" class="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors p-2 -mr-2 rounded-full hover:bg-[var(--color-bg)]" aria-label="Close cart">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          ${cartItems.length === 0 ? `
            <div class="flex flex-col items-center justify-center h-full text-center text-[var(--color-muted)] space-y-4">
              <div class="w-24 h-24 bg-[var(--color-bg)] rounded-full flex items-center justify-center mb-2">
                <svg class="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </div>
              <p class="text-lg font-medium text-[var(--color-text)]">Your cart is empty</p>
              <p class="text-sm">Looks like you haven't added any plants yet.</p>
              <button id="continue-shopping" class="btn-secondary mt-4">
                Continue Shopping
              </button>
            </div>
          ` : cartItems.map(item => `
            <div class="flex items-center gap-4 bg-[var(--color-bg)] p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] group transition-colors hover:border-[var(--color-primary)]/50">
              <img src="${item.product.image}" alt="${item.product.name}" class="w-20 h-20 object-cover rounded-[var(--radius-sm)] bg-[var(--color-surface)]">
              
              <div class="flex-1 min-w-0">
                <h3 class="font-medium text-[var(--color-text)] truncate" title="${item.product.name}">${item.product.name}</h3>
                <p class="text-[var(--color-primary)] font-semibold mt-0.5">${formatCurrency(item.product.price)}</p>
                
                <div class="flex items-center gap-3 mt-2">
                  <div class="flex items-center bg-[var(--color-surface)] rounded-full border border-[var(--color-border)] overflow-hidden">
                    <button data-action="decrease" data-id="${item.product.id}" class="w-8 h-8 flex items-center justify-center text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors" aria-label="Decrease quantity">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                    </button>
                    <span class="text-sm font-medium w-6 text-center text-[var(--color-text)]">${item.quantity}</span>
                    <button data-action="increase" data-id="${item.product.id}" class="w-8 h-8 flex items-center justify-center text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors" aria-label="Increase quantity">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                    </button>
                  </div>
                </div>
              </div>

              <button data-action="remove" data-id="${item.product.id}" class="text-[var(--color-muted)] hover:text-[var(--color-accent)] p-2 transition-colors rounded-full hover:bg-[var(--color-surface)]" aria-label="Remove ${item.product.name} from cart">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          `).join('')}
        </div>

        <!-- Footer -->
        ${cartItems.length > 0 ? `
          <div class="p-6 border-t border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div class="space-y-3 mb-6">
              <div class="flex justify-between items-center text-sm text-[var(--color-muted)]">
                <span>Subtotal</span>
                <span>${formatCurrency(total)}</span>
              </div>
              <div class="flex justify-between items-center text-sm text-[var(--color-muted)]">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div class="flex justify-between items-center pt-3 border-t border-[var(--color-border)]">
                <span class="text-base font-medium text-[var(--color-text)]">Total</span>
                <span class="text-xl font-bold text-[var(--color-primary)]">${formatCurrency(total)}</span>
              </div>
            </div>
            <button id="checkout-btn" class="btn-primary w-full py-3.5 text-base shadow-lg shadow-[var(--color-primary)]/20">
              Proceed to Checkout
            </button>
          </div>
        ` : ''}
      </div>
    `;
  };

  // Initial render
  render();

  // Event Delegation for interactions
  container.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    
    // Close cart actions
    if (
      target.id === 'cart-overlay' || 
      target.closest('#close-cart') || 
      target.closest('#continue-shopping')
    ) {
      store.setIsCartOpen(false);
      return;
    }

    // Proceed to checkout
    if (target.closest('#checkout-btn')) {
      store.setIsCartOpen(false);
      store.setIsCheckoutOpen(true);
      return;
    }

    // Item quantity and removal actions
    const actionBtn = target.closest('[data-action]') as HTMLButtonElement;
    if (actionBtn) {
      const action = actionBtn.dataset.action;
      const id = actionBtn.dataset.id;
      
      if (!id) return;

      const state = store.getState();
      const item = state.cart.find(i => i.product.id === id);
      
      if (action === 'remove') {
        store.removeFromCart(id);
      } else if (action === 'increase' && item) {
        store.updateQuantity(id, item.quantity + 1);
      } else if (action === 'decrease' && item) {
        if (item.quantity > 1) {
          store.updateQuantity(id, item.quantity - 1);
        } else {
          store.removeFromCart(id);
        }
      }
    }
  });

  // Re-render when store state changes
  store.subscribe(() => {
    render();
  });

  return container;
}