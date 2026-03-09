import type { CartItem } from './types';

/**
 * Formats a numeric value into a localized currency string.
 * 
 * @param amount - The numeric amount to format
 * @param currency - The ISO 4217 currency code (default: 'USD')
 * @param locale - The locale string (default: 'en-US')
 * @returns A formatted currency string (e.g., "$999.00")
 */
export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0, // Don't show .00 for whole numbers if preferred, but standard is 2
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculates the total price of items in a shopping cart.
 * Assumes CartItem has `price` and `quantity` properties.
 * 
 * @param items - Array of cart items
 * @returns The total cost
 */
export function calculateCartTotal(items: CartItem[]): number {
  if (!Array.isArray(items)) return 0;
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Calculates a discounted price based on a percentage.
 * 
 * @param originalPrice - The base price
 * @param discountPercentage - The percentage to discount (0-100)
 * @returns The new discounted price
 */
export function calculateDiscount(originalPrice: number, discountPercentage: number): number {
  if (discountPercentage < 0 || discountPercentage > 100) return originalPrice;
  return originalPrice - (originalPrice * (discountPercentage / 100));
}

/**
 * Utility for conditionally joining Tailwind CSS classes.
 * Filters out falsy values and normalizes whitespace.
 * 
 * @param classes - An array of class strings or falsy values
 * @returns A clean, space-separated string of classes
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * A lightweight Vanilla JS DOM element creator.
 * Simplifies building complex DOM structures without a framework.
 * 
 * @param tag - The HTML tag name to create
 * @param attributes - An object of HTML attributes or event listeners (e.g., onClick)
 * @param children - Child elements or text nodes to append
 * @returns The constructed HTMLElement
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attributes: Record<string, string | boolean | EventListener> = {},
  ...children: (HTMLElement | string | undefined | null)[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries(attributes)) {
    if (key.startsWith('on') && typeof value === 'function') {
      // Handle event listeners (e.g., onClick -> click)
      const eventName = key.toLowerCase().substring(2);
      element.addEventListener(eventName, value as EventListener);
    } else if (typeof value === 'boolean') {
      // Handle boolean attributes (e.g., disabled, checked)
      if (value) element.setAttribute(key, '');
    } else if (value !== undefined && value !== null) {
      // Handle standard string attributes
      if (key === 'className') {
        element.setAttribute('class', String(value));
      } else {
        element.setAttribute(key, String(value));
      }
    }
  }

  for (const child of children) {
    if (!child) continue;
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  }

  return element;
}

/**
 * Safe LocalStorage wrapper with JSON parsing and fallback values.
 */
export const storage = {
  /**
   * Retrieves and parses a value from localStorage.
   * @param key - The storage key
   * @param fallback - The default value if the key doesn't exist or parsing fails
   */
  get<T>(key: string, fallback: T): T {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (error) {
      console.warn(`Error reading ${key} from localStorage`, error);
      return fallback;
    }
  },
  
  /**
   * Stringifies and saves a value to localStorage.
   * @param key - The storage key
   * @param value - The value to store
   */
  set<T>(key: string, value: T): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error writing ${key} to localStorage`, error);
    }
  }
};

/**
 * Debounces a function call, ensuring it only runs after a specified delay
 * of inactivity. Useful for window resize or scroll events.
 * 
 * @param func - The function to debounce
 * @param wait - The delay in milliseconds
 */
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}