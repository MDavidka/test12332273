import type { ComponentProps } from '../types';
import { createElement, clearContainer, isValidEmail } from '../utils';
import { loginUser } from '../firebase';

/**
 * Renders the Login page component.
 * Provides a secure authentication form connected to Firebase.
 * 
 * @param props Component initialization properties.
 */
export function renderLogin({ container, state, onViewChange }: ComponentProps): void {
  if (!container) return;

  // Clear previous content
  clearContainer(container);

  // Main wrapper for centering the login card
  const wrapper = createElement('div', {
    className: 'w-full min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 animate-fade-in'
  });

  // The Login Card
  const card = createElement('div', {
    className: 'glass-card w-full max-w-md p-8 relative overflow-hidden shadow-2xl shadow-black/50'
  });

  // Decorative background glow
  const glow = createElement('div', {
    className: 'absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none'
  });

  // Header Section
  const headerContainer = createElement('div', {
    className: 'mb-8 text-center relative z-10'
  });

  const title = createElement('h2', {
    className: 'text-2xl md:text-3xl font-bold text-slate-50 mb-2',
    text: 'Client Portal'
  });

  const subtitle = createElement('p', {
    className: 'text-sm text-slate-400',
    text: 'Sign in to access your project dashboard.'
  });

  headerContainer.appendChild(title);
  headerContainer.appendChild(subtitle);

  // Form Section
  const form = createElement('form', {
    className: 'flex flex-col gap-5 relative z-10'
  });

  // --- Email Input ---
  const emailGroup = createElement('div', { className: 'flex flex-col gap-1.5' });
  const emailLabel = createElement('label', {
    className: 'text-sm font-medium text-slate-300',
    text: 'Email Address',
    attributes: { for: 'email' }
  });
  const emailInput = createElement('input', {
    className: 'w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all',
    attributes: {
      type: 'email',
      id: 'email',
      name: 'email',
      placeholder: 'hello@example.com',
      required: 'true',
      autocomplete: 'email'
    }
  });
  emailGroup.appendChild(emailLabel);
  emailGroup.appendChild(emailInput);

  // --- Password Input ---
  const passwordGroup = createElement('div', { className: 'flex flex-col gap-1.5' });
  const passwordLabel = createElement('label', {
    className: 'text-sm font-medium text-slate-300',
    text: 'Password',
    attributes: { for: 'password' }
  });
  const passwordInput = createElement('input', {
    className: 'w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all',
    attributes: {
      type: 'password',
      id: 'password',
      name: 'password',
      placeholder: '••••••••',
      required: 'true',
      autocomplete: 'current-password'
    }
  });
  passwordGroup.appendChild(passwordLabel);
  passwordGroup.appendChild(passwordInput);

  // --- Error Message Container ---
  const errorContainer = createElement('div', {
    className: 'hidden text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center'
  });

  // --- Actions ---
  const actionsGroup = createElement('div', {
    className: 'flex flex-col gap-3 mt-2'
  });

  const submitBtn = createElement('button', {
    className: 'btn-primary w-full justify-center py-2.5',
    text: 'Sign In',
    attributes: { type: 'submit' }
  });

  const cancelBtn = createElement('button', {
    className: 'text-sm text-slate-400 hover:text-slate-200 transition-colors py-2',
    text: '← Back to Home',
    attributes: { type: 'button' }
  });

  cancelBtn.addEventListener('click', () => {
    if (onViewChange) onViewChange('welcome');
  });

  actionsGroup.appendChild(submitBtn);
  actionsGroup.appendChild(cancelBtn);

  // Assemble Form
  form.appendChild(emailGroup);
  form.appendChild(passwordGroup);
  form.appendChild(errorContainer);
  form.appendChild(actionsGroup);

  // Form Submission Handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Reset error state
    errorContainer.classList.add('hidden');
    errorContainer.textContent = '';
    
    const email = (emailInput as HTMLInputElement).value.trim();
    const password = (passwordInput as HTMLInputElement).value;

    // Basic Validation
    if (!isValidEmail(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      showError('Password must be at least 6 characters.');
      return;
    }

    // Set Loading State
    const originalBtnText = submitBtn.textContent || 'Sign In';
    submitBtn.textContent = 'Signing in...';
    submitBtn.setAttribute('disabled', 'true');
    submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
    emailInput.setAttribute('disabled', 'true');
    passwordInput.setAttribute('disabled', 'true');

    try {
      // Attempt Firebase Login
      await loginUser(email, password);
      
      // On success, navigate to dashboard
      if (onViewChange) {
        onViewChange('dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle common Firebase auth errors gracefully
      let errorMessage = 'An error occurred during sign in.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showError(errorMessage);
    } finally {
      // Reset Loading State (only if we haven't navigated away)
      submitBtn.textContent = originalBtnText;
      submitBtn.removeAttribute('disabled');
      submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
      emailInput.removeAttribute('disabled');
      passwordInput.removeAttribute('disabled');
    }
  });

  /**
   * Helper to display error messages in the UI
   */
  function showError(message: string) {
    errorContainer.textContent = message;
    errorContainer.classList.remove('hidden');
    // Shake animation effect for error
    card.classList.add('animate-pulse');
    setTimeout(() => card.classList.remove('animate-pulse'), 500);
  }

  // Assemble Card and Wrapper
  card.appendChild(glow);
  card.appendChild(headerContainer);
  card.appendChild(form);
  
  // Add a subtle hint for portfolio reviewers
  const hint = createElement('p', {
    className: 'text-xs text-slate-500 text-center mt-6 relative z-10',
    text: 'Demo: Use any valid Firebase credentials configured for this project.'
  });
  card.appendChild(hint);

  wrapper.appendChild(card);
  container.appendChild(wrapper);

  // Auto-focus email input on load
  setTimeout(() => {
    emailInput.focus();
  }, 100);
}