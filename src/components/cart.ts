import { createElement, smoothScrollTo } from '../utils';

// Define the cart item structure locally to ensure type safety 
// regardless of the current state of types.ts
export interface CartItemData {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

/**
 * Slide-out shopping cart component.
 * Manages its own state via localStorage and listens to global events.
 */
export function Cart(): HTMLElement {
  // 1. Create Root Elements
  const cartRoot = createElement('div', 'fixed inset-0 z-50 pointer-events-none');
  cartRoot.id = 'shopping-cart-overlay';

  // Backdrop
  const backdrop = createElement('div', 'absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 pointer-events-none');
  
  // Slide-out Panel
  const panel = createElement('div', 'absolute right-0 top-0 h-full w-full max-w-md bg-[var(--color-surface)] shadow-2xl transform translate-x-full transition-transform duration-300 flex flex-col pointer-events-auto');

  // 2. Build Panel Structure
  panel.innerHTML = `
    <!-- Header -->
    <div class="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
      <h2 class="text-2xl font-heading font-bold text-[var(--color-text)] flex items-center gap-2">
        <svg class="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
        </svg>
        Kosár
        <span id="cart-count-badge" class="ml-2 bg-[var(--color-accent)] text-white text-xs font-bold px-2 py-1 rounded-full hidden">0</span>
      </h2>
      <button id="close-cart-btn" class="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors p-2 rounded-full hover:bg-black/5 focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Body (Scrollable Items) -->
    <div id="cart-items-container" class="flex-1 overflow-y-auto p-6 space-y-6">
      <!-- Items will be injected here -->
    </div>

    <!-- Footer (Total & Checkout) -->
    <div class="p-6 border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div class="flex justify-between items-center mb-6">
        <span class="text-lg font-medium text-[var(--color-muted)]">Összesen:</span>
        <span id="cart-total-price" class="text-2xl font-heading font-bold text-[var(--color-text)]">0 Ft</span>
      </div>
      <button id="checkout-btn" class="btn-primary w-full py-4 text-lg justify-center shadow-lg">
        Tovább a pénztárhoz
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </button>
    </div>
  `;

  cartRoot.appendChild(backdrop);
  cartRoot.appendChild(panel);

  // 3. State Management
  const getCart = (): CartItemData[] => {
    try {
      return JSON.parse(localStorage.getItem('flower_cart') || '[]');
    } catch {
      return [];
    }
  };

  const saveCart = (cart: CartItemData[]) => {
    localStorage.setItem('flower_cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
    renderCart();
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF', maximumFractionDigits: 0 }).format(price);
  };

  // 4. DOM Elements References
  const itemsContainer = panel.querySelector('#cart-items-container') as HTMLElement;
  const totalPriceEl = panel.querySelector('#cart-total-price') as HTMLElement;
  const countBadge = panel.querySelector('#cart-count-badge') as HTMLElement;
  const closeBtn = panel.querySelector('#close-cart-btn') as HTMLButtonElement;
  const checkoutBtn = panel.querySelector('#checkout-btn') as HTMLButtonElement;

  // 5. Render Logic
  const renderCart = () => {
    const cart = getCart();
    itemsContainer.innerHTML = '';

    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-center opacity-70">
          <svg class="w-16 h-16 text-[var(--color-muted)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
          <p class="text-lg font-medium text-[var(--color-text)]">A kosara jelenleg üres.</p>
          <p class="text-sm text-[var(--color-muted)] mt-2">Válasszon gyönyörű virágaink közül!</p>
        </div>
      `;
      totalPriceEl.textContent = '0 Ft';
      countBadge.classList.add('hidden');
      checkoutBtn.disabled = true;
      checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
      return;
    }

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      count += item.quantity;

      const itemEl = document.createElement('div');
      itemEl.className = 'flex gap-4 bg-[var(--color-surface)] p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]';
      
      itemEl.innerHTML = `
        <div class="w-20 h-20 flex-shrink-0 rounded-[var(--radius-sm)] overflow-hidden bg-[var(--color-bg)]">
          <img src="${item.imageUrl}" alt="${item.name}" class="w-full h-full object-cover" loading="lazy" />
        </div>
        <div class="flex-1 flex flex-col justify-between">
          <div class="flex justify-between items-start">
            <h3 class="font-heading font-semibold text-[var(--color-text)] text-sm leading-tight pr-2">${item.name}</h3>
            <button class="remove-btn text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors p-1" data-id="${item.id}" aria-label="Eltávolítás">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
          <div class="flex justify-between items-center mt-2">
            <span class="font-bold text-[var(--color-primary)] text-sm">${formatPrice(item.price)}</span>
            <div class="flex items-center border border-[var(--color-border)] rounded-[var(--radius-sm)] overflow-hidden">
              <button class="qty-btn minus-btn px-2 py-1 bg-[var(--color-bg)] hover:bg-[var(--color-border)] text-[var(--color-text)] transition-colors" data-id="${item.id}">-</button>
              <span class="px-3 py-1 text-sm font-medium text-[var(--color-text)] min-w-[2rem] text-center">${item.quantity}</span>
              <button class="qty-btn plus-btn px-2 py-1 bg-[var(--color-bg)] hover:bg-[var(--color-border)] text-[var(--color-text)] transition-colors" data-id="${item.id}">+</button>
            </div>
          </div>
        </div>
      `;

      itemsContainer.appendChild(itemEl);
    });

    totalPriceEl.textContent = formatPrice(total);
    countBadge.textContent = count.toString();
    countBadge.classList.remove('hidden');
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');

    // Attach event listeners to newly rendered buttons
    attachItemListeners();
  };

  const attachItemListeners = () => {
    const cart = getCart();

    itemsContainer.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).dataset.id;
        saveCart(cart.filter(item => item.id !== id));
      });
    });

    itemsContainer.querySelectorAll('.minus-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).dataset.id;
        const item = cart.find(i => i.id === id);
        if (item) {
          item.quantity -= 1;
          if (item.quantity <= 0) {
            saveCart(cart.filter(i => i.id !== id));
          } else {
            saveCart(cart);
          }
        }
      });
    });

    itemsContainer.querySelectorAll('.plus-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).dataset.id;
        const item = cart.find(i => i.id === id);
        if (item) {
          item.quantity += 1;
          saveCart(cart);
        }
      });
    });
  };

  // 6. UI Interaction Logic (Open/Close)
  const openCart = () => {
    cartRoot.classList.remove('pointer-events-none');
    backdrop.classList.remove('pointer-events-none', 'opacity-0');
    backdrop.classList.add('opacity-100', 'pointer-events-auto');
    panel.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    renderCart();
  };

  const closeCart = () => {
    backdrop.classList.remove('opacity-100', 'pointer-events-auto');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    panel.classList.add('translate-x-full');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Wait for transition to finish before hiding completely
    setTimeout(() => {
      cartRoot.classList.add('pointer-events-none');
    }, 300);
  };

  // 7. Global Event Listeners
  window.addEventListener('open-cart', openCart);
  window.addEventListener('close-cart', closeCart);
  
  // Listen for add-to-cart events from product cards
  window.addEventListener('add-to-cart', ((e: CustomEvent<CartItemData>) => {
    const product = e.detail;
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += (product.quantity || 1);
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: product.quantity || 1
      });
    }
    
    saveCart(cart);
    openCart(); // Automatically open cart to show feedback
  }) as EventListener);

  // 8. Local Event Listeners
  closeBtn.addEventListener('click', closeCart);
  backdrop.addEventListener('click', closeCart);
  
  checkoutBtn.addEventListener('click', () => {
    closeCart();
    // Small delay to allow cart to close smoothly before scrolling
    setTimeout(() => {
      smoothScrollTo('checkout', 80); // 80px offset for header
    }, 300);
  });

  // Initial render
  renderCart();

  return cartRoot;
}