/**
 * Shared utility functions for DOM manipulation, validation, and formatting.
 */

/**
 * Creates an HTML element with specified classes, attributes, and content.
 * 
 * @param tag The HTML tag name to create.
 * @param options Configuration object for the element.
 * @returns The created HTML element.
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options?: {
    className?: string;
    attributes?: Record<string, string>;
    text?: string;
    html?: string;
    children?: HTMLElement[];
  }
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  
  if (!options) return element;

  if (options.className) {
    element.className = options.className;
  }
  
  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  if (options.text) {
    element.textContent = options.text;
  } else if (options.html) {
    element.innerHTML = options.html;
  }

  if (options.children) {
    options.children.forEach(child => element.appendChild(child));
  }

  return element;
}

/**
 * Safely clears all child elements from a container.
 * 
 * @param container The HTML element to clear.
 */
export function clearContainer(container: HTMLElement | null): void {
  if (!container) return;
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

/**
 * Validates an email address format using a standard regex.
 * 
 * @param email The email string to validate.
 * @returns True if the email format is valid, false otherwise.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Utility to delay execution (useful for simulating network requests or animations).
 * 
 * @param ms Milliseconds to delay.
 * @returns A promise that resolves after the specified delay.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Basic HTML sanitizer to prevent XSS when rendering dynamic text content.
 * 
 * @param str The string to sanitize.
 * @returns The sanitized string safe for insertion into the DOM.
 */
export function escapeHTML(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Combines multiple class names conditionally.
 * A lightweight alternative to libraries like 'clsx' or 'tailwind-merge'.
 * 
 * @param classes An array of class names or falsy values.
 * @returns A single string of combined class names.
 */
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}