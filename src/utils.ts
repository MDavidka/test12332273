import { CartItem } from './types';

/**
 * Formats a number as a currency string.
 * @param amount The amount to format.
 * @param currency The ISO 4217 currency code (default: 'USD').
 * @param locale The locale string (default: 'en-US').
 * @returns A formatted currency string.
 */
export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

/**
 * Safely retrieves and parses a value from localStorage.
 * @param key The localStorage key.
 * @param defaultValue The fallback value if the key does not exist or parsing fails.
 * @returns The parsed value or the default value.
 */
export function getLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Safely serializes and saves a value to localStorage.
 * @param key The localStorage key.
 * @param value The value to save.
 */
export function setLocalStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error setting localStorage key "${key}":`, error);
  }
}

/**
 * Removes an item from localStorage.
 * @param key The localStorage key.
 */
export function removeLocalStorage(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error);
  }
}

/**
 * Utility to conditionally join CSS class names together.
 * Useful for Tailwind CSS dynamic classes.
 * @param classes An array of class names, booleans, null, or undefined.
 * @returns A space-separated string of valid class names.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ').trim();
}

/**
 * Safely creates a DOM element with optional classes, attributes, and text content.
 * @param tag The HTML tag name.
 * @param options Optional configuration for the element.
 * @returns The created HTML element.
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options?: {
    classes?: string;
    attributes?: Record<string, string>;
    textContent?: string;
    innerHTML?: string;
  }
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  
  if (options?.classes) {
    element.className = options.classes;
  }
  
  if (options?.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }
  
  if (options?.textContent) {
    element.textContent = options.textContent;
  } else if (options?.innerHTML) {
    element.innerHTML = options.innerHTML;
  }
  
  return element;
}

/**
 * Calculates the total price of items in the cart.
 * @param cart Array of CartItem objects.
 * @returns The total sum.
 */
export function calculateCartTotal(cart: CartItem[]): number {
  if (!Array.isArray(cart)) return 0;
  return cart.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
}

/**
 * Calculates the final price after applying a discount percentage.
 * @param total The original total amount.
 * @param discountPercentage The discount percentage (0-100).
 * @returns The discounted total.
 */
export function calculateDiscountedTotal(total: number, discountPercentage: number): number {
  if (discountPercentage <= 0) return total;
  if (discountPercentage >= 100) return 0;
  
  const discountAmount = total * (discountPercentage / 100);
  return total - discountAmount;
}

/**
 * Debounces a function call.
 * @param func The function to debounce.
 * @param wait The wait time in milliseconds.
 * @returns A debounced version of the function.
 */
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}