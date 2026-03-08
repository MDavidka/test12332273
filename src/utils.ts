/**
 * Smoothly scrolls the page to the target element by its ID.
 * 
 * @param targetId - The ID of the HTML element to scroll to (without the '#' prefix).
 * @param offset - Optional offset in pixels (useful for sticky headers).
 */
export function smoothScrollTo(targetId: string, offset: number = 0): void {
  const target = document.getElementById(targetId);
  if (!target) {
    console.warn(`Element with id "${targetId}" not found.`);
    return;
  }

  const elementPosition = target.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

/**
 * Creates an HTML element with the specified tag, classes, and inner HTML.
 * 
 * @param tag - The HTML tag name (e.g., 'div', 'span', 'section').
 * @param className - A string of CSS classes to apply to the element.
 * @param innerHTML - Optional HTML string to set as the element's content.
 * @returns The created HTML element typed as T.
 */
export function createElement<T extends HTMLElement>(
  tag: string,
  className: string = '',
  innerHTML: string = ''
): T {
  const el = document.createElement(tag) as T;
  if (className) {
    el.className = className;
  }
  if (innerHTML) {
    el.innerHTML = innerHTML;
  }
  return el;
}

/**
 * Creates a debounced function that delays invoking the provided function until after 
 * `wait` milliseconds have elapsed since the last time the debounced function was invoked.
 * Useful for window resize or scroll events.
 * 
 * @param func - The function to debounce.
 * @param wait - The number of milliseconds to delay.
 * @returns A new debounced function.
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function (...args: Parameters<T>) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Sets up an IntersectionObserver to trigger animations or lazy loading when elements enter the viewport.
 * 
 * @param elements - An array or NodeList of elements to observe.
 * @param onIntersect - Callback function executed when an element intersects.
 * @param options - Optional IntersectionObserver configuration.
 */
export function observeIntersection(
  elements: Element[] | NodeListOf<Element>,
  onIntersect: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void,
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
): void {
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers: trigger immediately
    elements.forEach(el => {
      onIntersect({ target: el, isIntersecting: true } as IntersectionObserverEntry, {} as IntersectionObserver);
    });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        onIntersect(entry, obs);
      }
    });
  }, options);

  elements.forEach(el => observer.observe(el));
}