/**
 * Options for creating a button component.
 */
export interface ButtonOptions {
  /** The text to display inside the button */
  text: string;
  /** The HTML button type (default: 'button') */
  type?: 'button' | 'submit' | 'reset';
  /** The visual style variant of the button (default: 'primary') */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Whether the button should take up the full width of its container */
  fullWidth?: boolean;
  /** Additional custom Tailwind classes */
  className?: string;
  /** Whether the button is initially disabled */
  disabled?: boolean;
  /** Optional click event handler */
  onClick?: (e: MouseEvent) => void;
}

/**
 * SVG markup for the loading spinner.
 */
const spinnerSvg = `
<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>
`;

/**
 * Creates a reusable, styled button element.
 * 
 * @param options Configuration options for the button
 * @returns A configured HTMLButtonElement
 */
export function createButton(options: ButtonOptions): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = options.type || 'button';
  btn.disabled = options.disabled || false;

  // Base Tailwind classes for all buttons
  const baseClasses = 'inline-flex items-center justify-center px-4 py-2.5 border text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed';

  // Determine variant-specific classes
  let variantClasses = '';
  switch (options.variant || 'primary') {
    case 'primary':
      variantClasses = 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm';
      break;
    case 'secondary':
      variantClasses = 'border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500';
      break;
    case 'outline':
      variantClasses = 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500 shadow-sm';
      break;
    case 'ghost':
      variantClasses = 'border-transparent text-gray-600 bg-transparent hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500';
      break;
  }

  const widthClass = options.fullWidth ? 'w-full' : '';
  const customClasses = options.className || '';

  // Combine and clean up classes
  btn.className = `${baseClasses} ${variantClasses} ${widthClass} ${customClasses}`
    .trim()
    .replace(/\s+/g, ' ');

  // Wrap text in a span to easily swap with a spinner later
  btn.innerHTML = `<span class="btn-content flex items-center justify-center">${options.text}</span>`;

  // Attach event listener if provided
  if (options.onClick) {
    btn.addEventListener('click', options.onClick);
  }

  // Store the original text in a data attribute for loading state restoration
  btn.dataset.originalText = options.text;

  return btn;
}

/**
 * Toggles the loading state of a button created with `createButton`.
 * 
 * @param btn The button element to update
 * @param isLoading Whether the button should be in a loading state
 * @param loadingText Optional text to display while loading (defaults to original text)
 */
export function setButtonLoading(btn: HTMLButtonElement, isLoading: boolean, loadingText?: string): void {
  const contentSpan = btn.querySelector('.btn-content');
  if (!contentSpan) return;

  if (isLoading) {
    btn.disabled = true;
    const text = loadingText || btn.dataset.originalText || '';
    contentSpan.innerHTML = `${spinnerSvg} ${text}`;
  } else {
    btn.disabled = false;
    contentSpan.innerHTML = btn.dataset.originalText || '';
  }
}