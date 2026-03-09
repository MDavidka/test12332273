/**
 * Configuration options for creating an input field.
 */
export interface InputOptions {
  /** Unique identifier for the input and its label */
  id: string;
  /** Name attribute for the input */
  name: string;
  /** HTML input type (e.g., 'text', 'email', 'password') */
  type?: 'text' | 'email' | 'password' | 'number';
  /** Text to display in the label */
  label: string;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Whether the field is required for form submission */
  required?: boolean;
  /** Autocomplete attribute for browser autofill */
  autocomplete?: string;
}

/**
 * Creates a fully accessible input component with a label and error message container.
 * 
 * @param options - The configuration options for the input
 * @returns An HTMLDivElement containing the label, input, and error text
 */
export function createInput(options: InputOptions): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'w-full mb-4';

  // Create Label
  const label = document.createElement('label');
  label.htmlFor = options.id;
  label.className = 'block text-sm font-medium text-gray-700 mb-1';
  label.textContent = options.label;

  // Create Input Container (useful for adding icons later if needed)
  const inputContainer = document.createElement('div');
  inputContainer.className = 'relative';

  // Create Input Element
  const input = document.createElement('input');
  input.id = options.id;
  input.name = options.name;
  input.type = options.type || 'text';
  
  if (options.placeholder) input.placeholder = options.placeholder;
  if (options.required) input.required = true;
  if (options.autocomplete) input.autocomplete = options.autocomplete;
  
  // Base styling for input using Tailwind CSS
  input.className = 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200 bg-white text-gray-900';

  // Create Error Message Element
  const errorText = document.createElement('p');
  errorText.id = `${options.id}-error`;
  errorText.className = 'mt-1 text-sm text-red-600 hidden';
  
  // Accessibility linkage
  input.setAttribute('aria-describedby', errorText.id);

  // Assemble the component
  inputContainer.appendChild(input);
  wrapper.appendChild(label);
  wrapper.appendChild(inputContainer);
  wrapper.appendChild(errorText);

  return wrapper;
}

/**
 * Sets or clears the error state of an input component.
 * 
 * @param wrapper - The wrapper element returned by createInput
 * @param errorMessage - The error message to display. If undefined or empty, clears the error.
 */
export function setInputError(wrapper: HTMLElement, errorMessage?: string): void {
  const input = wrapper.querySelector('input');
  const errorText = wrapper.querySelector('p');
  
  if (!input || !errorText) return;

  if (errorMessage) {
    // Apply error styling
    input.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-indigo-500');
    input.classList.add('border-red-300', 'text-red-900', 'placeholder-red-300', 'focus:ring-red-500', 'focus:border-red-500');
    input.setAttribute('aria-invalid', 'true');
    
    // Show error message
    errorText.textContent = errorMessage;
    errorText.classList.remove('hidden');
  } else {
    // Revert to default styling
    input.classList.remove('border-red-300', 'text-red-900', 'placeholder-red-300', 'focus:ring-red-500', 'focus:border-red-500');
    input.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-indigo-500');
    input.removeAttribute('aria-invalid');
    
    // Hide error message
    errorText.textContent = '';
    errorText.classList.add('hidden');
  }
}

/**
 * Helper function to retrieve the current value of the input component.
 * 
 * @param wrapper - The wrapper element returned by createInput
 * @returns The current string value of the input
 */
export function getInputValue(wrapper: HTMLElement): string {
  const input = wrapper.querySelector('input');
  return input ? input.value : '';
}