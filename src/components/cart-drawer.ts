import { CartItem } from '../types';
import { getLocalStorage, setLocalStorage, formatCurrency, calculateCartTotal } from '../utils';

/**
 * Renders the sliding cart drawer component.
 * Manages cart state, item quantities, and initiates the checkout flow.
 * 
 * Listens to:
 * - `TOGGLE_CART`: Opens or closes the drawer.
 * - `CART_UPDATED`: Refreshes the cart contents when items are added/removed elsewhere.
 * 
 * Dispatches:
 * - `CART_UPDATED`: When quantities change or items are removed within the drawer.
 * - `OPEN_CHECKOUT`: When the user clicks the checkout button.
 * 
 * @param container The DOM element to mount the cart drawer into (usually document.body).
 */
export function renderCartDrawer(container: HTMLElement): void {
  // Component State
  let isOpen = false;
  let cart: CartItem[] = getLocalStorage<CartItem[]>('cart', []);

  // Create the shell elements
  const drawerWrapper = document.createElement('div');
  drawerWrapper.id = 'cart-drawer-wrapper';
  drawerWrapper.className = 'relative z-[100]';
  drawerWrapper.setAttribute('aria-labelledby', 'slide-over-title');
  drawerWrapper.setAttribute('role', 'dialog');
  drawerWrapper.setAttribute('aria-modal', 'true');

  // Initial Shell HTML (Overlay + Drawer)
  drawerWrapper.innerHTML = `
    <!-- Background overlay -->
    <div id="cart-overlay" class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 opacity-0 pointer-events-none" aria-hidden="true"></div>

    <!-- Drawer panel -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute inset-0 overflow-hidden">
        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
          <div id="cart-panel" class="pointer-events-auto w-screen max-w-md transform transition-transform duration-300 ease-in-out translate-x-full flex flex-col bg-[var(--color-surface)] shadow-2xl border-l border-[var(--color-border)]">
            
            <!-- Header -->
            <div class="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-[var(--color-border)]">
              <h2 class="text-xl font-bold text-[var(--color-text)]" id="slide-over-title">Shopping Cart</h2>
              <div class="ml-3 flex h-7 items-center">
                <button type="button" id="btn-close-cart" class="relative -m-2 p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors rounded-full hover:bg-[var(--color-bg)]">
                  <span class="absolute -inset-0.5"></span>
                  <span class="sr-only">Close panel</span>
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Cart Items Container -->
            <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6" id="cart-items-container">
              <!-- Items will be injected here dynamically -->
            </div>

            <!-- Footer (Subtotal & Checkout) -->
            <div class="border-t border-[var(--color-border)] px-4 py-6 sm:px-6 bg-[var(--color-bg)]">
              <div class="flex justify-between text-base font-medium text-[var(--color-text)] mb-4">
                <p>Subtotal</p>
                <p id="cart-subtotal" class="font-bold">$0.00</p>
              </div>
              <p class="mt-0.5 text-sm text-[var(--color-text-muted)] mb-6">Shipping and taxes calculated at checkout.</p>
              <div class="mt-6">
                <button id="btn-checkout" class="flex w-full items-center justify-center rounded-full border border-transparent bg-[var(--color-primary)] px-6 py-4 text-base font-medium text-white shadow-md hover:bg-[var(--color-primary-hover)] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-primary)] disabled:hover:shadow-md">
                  Checkout
                </button>
              </div>
              <div class="mt-6 flex justify-center text-center text-sm text-[var(--color-text-muted)]">
                <p>
                  or
                  <button type="button" id="btn-continue-shopping" class="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(drawerWrapper);

  // DOM Element References
  const overlay = document.getElementById('cart-overlay')!;
  const panel = document.getElementById('cart-panel')!;
  const itemsContainer = document.getElementById('cart-items-container')!;
  const subtotalEl = document.getElementById('cart-subtotal')!;
  const checkoutBtn = document.getElementById('btn-checkout') as HTMLButtonElement;
  const closeBtn = document.getElementById('btn-close-cart')!;
  const continueBtn = document.getElementById('btn-continue-shopping')!;

  /**
   * Toggles the visibility of the cart drawer.
   */
  const toggleCart = (forceState?: boolean) => {
    isOpen = forceState !== undefined ? forceState : !isOpen;
    
    if (isOpen) {
      // Open
      overlay.classList.remove('opacity-0', 'pointer-events-none');
      overlay.classList.add('opacity-100', 'pointer-events-auto');
      panel.classList.remove('translate-x-full');
      panel.classList.add('translate-x-0');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      // Close
      overlay.classList.remove('opacity-100', 'pointer-events-auto');
      overlay.classList.add('opacity-0', 'pointer-events-none');
      panel.classList.remove('translate-x-0');
      panel.classList.add('translate-x-full');
      document.body.style.overflow = ''; // Restore background scrolling
    }
  };

  /**
   * Updates the cart state, saves to local storage, and dispatches event.
   */
  const updateCart = (newCart: CartItem[]) => {
    cart = newCart;
    setLocalStorage('cart', cart);
    window.dispatchEvent(new CustomEvent('CART_UPDATED', { detail: cart }));
    renderItems();
  };

  /**
   * Renders the cart items and updates totals.
   */
  const renderItems = () => {
    // Update Subtotal
    const total = calculateCartTotal(cart);
    subtotalEl.textContent = formatCurrency(total);

    // Update Checkout Button State
    checkoutBtn.disabled = cart.length === 0;

    // Render Empty State
    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
          <div class="w-24 h-24 rounded-full bg-[var(--color-bg)] flex items-center justify-center mb-4">
            <svg class="w-12 h-12 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-[var(--color-text)]">Your cart is empty</h3>
          <p class="text-[var(--color-text-muted)] max-w-[200px]">Looks like you haven't added any premium devices yet.</p>
          <button type="button" class="mt-4 px-6 py-2 bg-[var(--color-bg)] text-[var(--color-text)] rounded-full font-medium hover:bg-[var(--color-border)] transition-colors" onclick="document.getElementById('btn-close-cart').click()">
            Start Shopping
          </button>
        </div>
      `;
      return;
    }

    // Render Items List
    itemsContainer.innerHTML = `
      <ul role="list" class="-my-6 divide-y divide-[var(--color-border)]">
        ${cart.map((item, index) => `
          <li class="flex py-6 group">
            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-2">
              ${item.product.imageUrl 
                ? `<img src="${item.product.imageUrl}" alt="${item.product.name}" class="h-full w-full object-contain object-center">`
                : `<div class="h-full w-full flex items-center justify-center text-[var(--color-text-muted)]"><svg class="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>`
              }
            </div>

            <div class="ml-4 flex flex-1 flex-col">
              <div>
                <div class="flex justify-between text-base font-medium text-[var(--color-text)]">
                  <h3 class="line-clamp-2 pr-4"><a href="#">${item.product.name}</a></h3>
                  <p class="ml-4 font-bold whitespace-nowrap">${formatCurrency(item.product.price * item.quantity)}</p>
                </div>
                <p class="mt-1 text-sm text-[var(--color-text-muted)]">${item.product.brand}</p>
              </div>
              <div class="flex flex-1 items-end justify-between text-sm">
                
                <!-- Quantity Controls -->
                <div class="flex items-center border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)]">
                  <button type="button" class="btn-qty-decrease px-3 py-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)] rounded-l-lg transition-colors" data-index="${index}" aria-label="Decrease quantity">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                  </button>
                  <span class="px-3 py-1 font-medium text-[var(--color-text)] min-w-[2.5rem] text-center">${item.quantity}</span>
                  <button type="button" class="btn-qty-increase px-3 py-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)] rounded-r-lg transition-colors" data-index="${index}" aria-label="Increase quantity" ${item.quantity >= item.product.stock ? 'disabled' : ''}>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  </button>
                </div>

                <div class="flex">
                  <button type="button" class="btn-remove font-medium text-[var(--color-accent)] hover:text-red-700 transition-colors flex items-center space-x-1" data-index="${index}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        `).join('')}
      </ul>
    `;
  };

  // Attach Event Listeners
  
  // Close triggers
  closeBtn.addEventListener('click', () => toggleCart(false));
  continueBtn.addEventListener('click', () => toggleCart(false));
  overlay.addEventListener('click', () => toggleCart(false));

  // Checkout trigger
  checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
      toggleCart(false);
      window.dispatchEvent(new CustomEvent('OPEN_CHECKOUT'));
    }
  });

  // Global Event Listeners
  window.addEventListener('TOGGLE_CART', () => toggleCart());
  
  window.addEventListener('CART_UPDATED', ((e: CustomEvent<CartItem[]>) => {
    // Only update local state if the event was dispatched from outside this component
    // to prevent infinite loops, though our updateCart method handles it safely.
    if (e.detail) {
      cart = e.detail;
      renderItems();
    }
  }) as EventListener);

  // Event Delegation for dynamically rendered cart items
  itemsContainer.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    
    // Find closest button
    const decreaseBtn = target.closest('.btn-qty-decrease') as HTMLButtonElement;
    const increaseBtn = target.closest('.btn-qty-increase') as HTMLButtonElement;
    const removeBtn = target.closest('.btn-remove') as HTMLButtonElement;

    if (decreaseBtn) {
      const index = parseInt(decreaseBtn.getAttribute('data-index') || '0', 10);
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        updateCart([...cart]);
      } else {
        // If quantity is 1, remove the item
        cart.splice(index, 1);
        updateCart([...cart]);
      }
    }

    if (increaseBtn) {
      const index = parseInt(increaseBtn.getAttribute('data-index') || '0', 10);
      const item = cart[index];
      if (item.quantity < item.product.stock) {
        cart[index].quantity += 1;
        updateCart([...cart]);
      } else {
        // Optional: Show a toast that max stock is reached
        alert(`Sorry, only ${item.product.stock} units available in stock.`);
      }
    }

    if (removeBtn) {
      const index = parseInt(removeBtn.getAttribute('data-index') || '0', 10);
      cart.splice(index, 1);
      updateCart([...cart]);
    }
  });

  // Initial Render
  renderItems();
}