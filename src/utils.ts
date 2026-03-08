import type { Product, CartItem } from './types';

export const CART_STORAGE_KEY = 'flower_shop_cart';

/**
 * Formats a number as Hungarian Forint (HUF)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency: 'HUF',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Retrieves the cart from local storage
 */
export function getCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to parse cart from local storage:', error);
    return [];
  }
}

/**
 * Saves the cart to local storage and dispatches a custom event
 * so that UI components (like the header cart count) can update reactively.
 */
export function saveCart(cart: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
  } catch (error) {
    console.error('Failed to save cart to local storage:', error);
  }
}

/**
 * Adds a product to the cart or increments its quantity if it already exists
 */
export function addToCart(product: Product, quantity: number = 1): void {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  saveCart(cart);
  
  // Dispatch a specific event for UI feedback (e.g., opening the cart or showing a toast)
  window.dispatchEvent(new CustomEvent('itemAddedToCart', { detail: { product, quantity } }));
}

/**
 * Removes a product entirely from the cart
 */
export function removeFromCart(productId: string): void {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.product.id !== productId);
  saveCart(updatedCart);
}

/**
 * Updates the quantity of a specific product in the cart
 */
export function updateCartQuantity(productId: string, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  
  const cart = getCart();
  const item = cart.find(item => item.product.id === productId);
  
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
}

/**
 * Clears all items from the cart
 */
export function clearCart(): void {
  saveCart([]);
}

/**
 * Calculates the total price of all items in the cart
 */
export function getCartTotal(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

/**
 * Calculates the total number of items in the cart
 */
export function getCartItemCount(): number {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}

/**
 * Smooth scrolls to a specific element by ID
 * @param targetId The ID of the element to scroll to
 * @param offset Optional offset (e.g., for fixed headers)
 */
export function smoothScrollTo(targetId: string, offset: number = 0): void {
  const target = document.getElementById(targetId);
  if (target) {
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}