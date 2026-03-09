import { PhoneProduct } from './productGrid';

/**
 * Represents an item in the shopping cart, extending the base product with a quantity.
 */
export interface CartItem extends PhoneProduct {
  quantity: number;
}

// Internal state for the cart
let cart: CartItem[] = [];

// DOM Element references
let wrapperEl: HTMLElement | null = null;
let overlayEl: HTMLElement | null = null;
let panelEl: HTMLElement | null = null;
let itemsContainerEl: HTMLElement | null = null;
let totalEl: HTMLElement | null = null;
let cartCountBadge: HTMLElement | null = null;

/**
 * Renders the slide-out cart modal component.
 * 
 * @param container The DOM element to append the cart modal to.
 */
export function renderCartModal(container: HTMLElement): void {
  // Create the main wrapper (fixed over the entire screen)
  wrapperEl = document.createElement('div');
  wrapperEl.id = 'cart-modal-wrapper';
  wrapperEl.className = 'fixed inset-0 z-50 pointer-events-none flex justify-end';

  // Create the dark overlay backdrop
  overlayEl = document.createElement('div');
  overlayEl.className = 'absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 transition-opacity duration-300';
  overlayEl.addEventListener('click', closeCart);

  // Create the sliding panel
  panelEl = document.createElement('div');
  // Using CSS variables from style.css for colors
  panelEl.className = 'relative w-full max-w-md h-full shadow-2xl transform translate-x-full transition-transform duration-300 flex flex-col pointer-events-auto';
  panelEl.style.backgroundColor = 'var(--color-surface)';

  // Header
  const header = document.createElement('div');
  header.className = 'flex items-center justify-between p-6 border-b';
  header.style.borderColor = 'var(--color-border)';
  header.innerHTML = `
    <div class="flex items-center gap-3">
      <h2 class="text-2xl font-heading font-bold" style="color: var(--color-text)">Your Cart</h2>
      <span id="cart-count-badge" class="hidden items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold text-white" style="background-color: var(--color-primary)">0</span>
    </div>
    <button id="close-cart-btn" class="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" style="color: var(--color-text-muted)">
      <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
        <path d="M18 6L6 18M6 6l12 12"></path>
      </svg>
    </button>
  `;

  // Items Container
  itemsContainerEl = document.createElement('div');
  itemsContainerEl.className = 'flex-1 overflow-y-auto p-6 space-y-4';
  itemsContainerEl.id = 'cart-items-container';

  // Event delegation for quantity buttons
  itemsContainerEl.addEventListener('click', handleCartAction);

  // Footer
  const footer = document.createElement('div');
  footer.className = 'p-6 border-t';
  footer.style.borderColor = 'var(--color-border)';
  footer.style.backgroundColor = 'var(--color-bg)';
  footer.innerHTML = `
    <div class="flex justify-between items-center mb-6">
      <span class="text-lg font-medium" style="color: var(--color-text-muted)">Subtotal</span>
      <span id="cart-total" class="text-2xl font-bold" style="color: var(--color-text)">$0.00</span>
    </div>
    <p class="text-sm mb-4 text-center" style="color: var(--color-text-muted)">Taxes and shipping calculated at checkout</p>
    <button class="w-full flex justify-center items-center px-6 py-4 rounded-xl text-lg font-bold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/25" style="background-color: var(--color-primary)">
      Proceed to Checkout
    </button>
  `;

  // Assemble the component
  panelEl.appendChild(header);
  panelEl.appendChild(itemsContainerEl);
  panelEl.appendChild(footer);
  
  wrapperEl.appendChild(overlayEl);
  wrapperEl.appendChild(panelEl);
  container.appendChild(wrapperEl);

  // Cache elements that need frequent updates
  totalEl = footer.querySelector('#cart-total');
  cartCountBadge = header.querySelector('#cart-count-badge');

  // Attach event listeners
  header.querySelector('#close-cart-btn')?.addEventListener('click', closeCart);

  // Listen for global custom events to interact with the cart
  window.addEventListener('open-cart', openCart);
  window.addEventListener('add-to-cart', ((e: CustomEvent<PhoneProduct>) => {
    addToCart(e.detail);
    openCart();
  }) as EventListener);

  // Initial render
  updateCartUI();
}

/**
 * Opens the cart modal with a slide-in animation.
 */
export function openCart(): void {
  if (!wrapperEl || !overlayEl || !panelEl) return;
  
  wrapperEl.classList.remove('pointer-events-none');
  
  // Animate overlay
  overlayEl.classList.remove('opacity-0');
  overlayEl.classList.add('opacity-100');
  
  // Animate panel
  panelEl.classList.remove('translate-x-full');
  panelEl.classList.add('translate-x-0');
  
  // Prevent body scrolling
  document.body.style.overflow = 'hidden';
}

/**
 * Closes the cart modal with a slide-out animation.
 */
export function closeCart(): void {
  if (!wrapperEl || !overlayEl || !panelEl) return;
  
  // Animate overlay
  overlayEl.classList.remove('opacity-100');
  overlayEl.classList.add('opacity-0');
  
  // Animate panel
  panelEl.classList.remove('translate-x-0');
  panelEl.classList.add('translate-x-full');
  
  // Restore body scrolling
  document.body.style.overflow = '';
  
  // Wait for transition to finish before disabling pointer events
  setTimeout(() => {
    wrapperEl?.classList.add('pointer-events-none');
  }, 300);
}

/**
 * Adds a product to the cart or increments its quantity if it already exists.
 * 
 * @param product The phone product to add.
 */
function addToCart(product: PhoneProduct): void {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCartUI();
  
  // Dispatch event to update header cart icon if needed
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: { count: getCartCount() } }));
}

/**
 * Updates the quantity of a specific item in the cart.
 * 
 * @param productId The ID of the product to update.
 * @param delta The amount to change the quantity by (e.g., 1 or -1).
 */
function updateQuantity(productId: string, delta: number): void {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex === -1) return;

  cart[itemIndex].quantity += delta;

  // Remove item if quantity drops to 0 or below
  if (cart[itemIndex].quantity <= 0) {
    cart.splice(itemIndex, 1);
  }

  updateCartUI();
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: { count: getCartCount() } }));
}

/**
 * Calculates the total number of items in the cart.
 */
function getCartCount(): number {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Handles click events within the cart items container for quantity adjustments.
 */
function handleCartAction(e: MouseEvent): void {
  const target = e.target as HTMLElement;
  const btn = target.closest('button');
  
  if (!btn) return;
  
  const action = btn.dataset.action;
  const id = btn.dataset.id;
  
  if (!id) return;

  if (action === 'increase') {
    updateQuantity(id, 1);
  } else if (action === 'decrease') {
    updateQuantity(id, -1);
  } else if (action === 'remove') {
    // Find current quantity and subtract it all to remove
    const item = cart.find(i => i.id === id);
    if (item) {
      updateQuantity(id, -item.quantity);
    }
  }
}

/**
 * Re-renders the cart items and updates the total price.
 */
function updateCartUI(): void {
  if (!itemsContainerEl || !totalEl) return;

  const totalItems = getCartCount();

  // Update Badge
  if (cartCountBadge) {
    if (totalItems > 0) {
      cartCountBadge.textContent = totalItems.toString();
      cartCountBadge.classList.remove('hidden');
      cartCountBadge.classList.add('inline-flex');
    } else {
      cartCountBadge.classList.add('hidden');
      cartCountBadge.classList.remove('inline-flex');
    }
  }

  // Empty State
  if (cart.length === 0) {
    itemsContainerEl.innerHTML = `
      <div class="flex flex-col items-center justify-center h-full space-y-6 opacity-60">
        <div class="w-24 h-24 rounded-full flex items-center justify-center" style="background-color: var(--color-bg)">
          <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="color: var(--color-text-muted)">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
        </div>
        <p class="text-xl font-medium" style="color: var(--color-text)">Your cart is empty</p>
        <button onclick="document.getElementById('close-cart-btn').click()" class="text-sm font-medium hover:underline" style="color: var(--color-primary)">
          Continue Shopping
        </button>
      </div>
    `;
    totalEl.textContent = '$0.00';
    return;
  }

  // Render Items
  itemsContainerEl.innerHTML = '';
  let totalPrice = 0;

  cart.forEach(item => {
    totalPrice += item.price * item.quantity;
    
    const itemEl = document.createElement('div');
    itemEl.className = 'flex gap-4 p-4 rounded-2xl border transition-all hover:shadow-md';
    itemEl.style.backgroundColor = 'var(--color-bg)';
    itemEl.style.borderColor = 'var(--color-border)';
    
    // Fallback image if not provided by PhoneProduct
    const imageUrl = (item as any).imageUrl || (item as any).image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80';
    
    itemEl.innerHTML = `
      <div class="w-20 h-24 rounded-xl p-2 flex-shrink-0 flex items-center justify-center" style="background-color: var(--color-surface)">
        <img src="${imageUrl}" alt="${item.name}" class="max-w-full max-h-full object-contain drop-shadow-md" />
      </div>
      
      <div class="flex-1 flex flex-col justify-between py-1">
        <div class="flex justify-between items-start gap-2">
          <div>
            <h3 class="font-bold text-base leading-tight mb-1" style="color: var(--color-text)">${item.name}</h3>
            <p class="text-sm font-medium" style="color: var(--color-primary)">$${item.price.toLocaleString()}</p>
          </div>
          <button data-action="remove" data-id="${item.id}" class="p-1.5 rounded-md opacity-50 hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-all" aria-label="Remove item">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
        
        <div class="flex items-center gap-3 mt-3">
          <div class="flex items-center rounded-lg border" style="background-color: var(--color-surface); border-color: var(--color-border)">
            <button data-action="decrease" data-id="${item.id}" class="w-8 h-8 flex items-center justify-center rounded-l-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" style="color: var(--color-text)">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4"></path></svg>
            </button>
            <span class="w-8 text-center text-sm font-bold" style="color: var(--color-text)">${item.quantity}</span>
            <button data-action="increase" data-id="${item.id}" class="w-8 h-8 flex items-center justify-center rounded-r-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" style="color: var(--color-text)">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `;
    
    itemsContainerEl.appendChild(itemEl);
  });

  // Update Total
  totalEl.textContent = `$${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}