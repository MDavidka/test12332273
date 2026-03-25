import './style.css';
import { renderNavbar } from './components/navbar';
import { renderHero } from './components/hero';
import { renderProductSegments } from './components/product-segments';
import { renderCartDrawer } from './components/cart-drawer';
import { renderCheckoutModal } from './components/checkout-modal';
import { renderFooter } from './components/footer';
import { account, ID } from './appwrite';

/**
 * Main application initialization.
 * Sets up the DOM structure and mounts all UI components.
 */
function setupApp() {
  const app = document.getElementById('app');
  
  if (!app) {
    console.error('Critical Error: Root element #app not found in index.html');
    return;
  }

  // 1. Create the global layout structure
  app.innerHTML = `
    <div class="min-h-screen flex flex-col relative bg-[var(--color-bg)] text-[var(--color-text)] font-sans selection:bg-[var(--color-primary)] selection:text-white">
      
      <!-- Header / Navigation -->
      <div id="nav-container"></div>
      
      <!-- Main Content Area -->
      <main id="main-content" class="flex-grow flex flex-col">
        <div id="hero-container"></div>
        <div id="products-container"></div>
      </main>
      
      <!-- Footer -->
      <div id="footer-container"></div>
      
      <!-- Portals / Overlays -->
      <div id="cart-container"></div>
      <div id="checkout-container"></div>
      <div id="auth-modal-container"></div>
      
    </div>
  `;

  // 2. Get references to the container elements
  const navContainer = document.getElementById('nav-container')!;
  const heroContainer = document.getElementById('hero-container')!;
  const productsContainer = document.getElementById('products-container')!;
  const cartContainer = document.getElementById('cart-container')!;
  const checkoutContainer = document.getElementById('checkout-container')!;
  const footerContainer = document.getElementById('footer-container')!;
  const authModalContainer = document.getElementById('auth-modal-container')!;

  // 3. Initialize and mount all UI Components
  renderNavbar(navContainer);
  renderHero(heroContainer);
  renderProductSegments(productsContainer);
  renderCartDrawer(cartContainer);
  renderCheckoutModal(checkoutContainer);
  renderFooter(footerContainer);

  // 4. Initialize the Authentication Modal (Inline Component)
  initAuthModal(authModalContainer);

  // 5. Global Event Listeners for cross-component communication
  window.addEventListener('NAVIGATE_TO', ((e: CustomEvent<string>) => {
    const targetId = e.detail;
    const element = document.getElementById(targetId);
    if (element) {
      // Smooth scroll to the requested section with a slight offset for the sticky header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }) as EventListener);
}

/**
 * Initializes the Authentication Modal.
 * Handles user login and registration via Appwrite.
 * 
 * @param container The DOM element to mount the auth modal into.
 */
function initAuthModal(container: HTMLElement) {
  // Component State
  let isOpen = false;
  let isLoginMode = true;
  let isLoading = false;
  let errorMessage = '';

  /**
   * Renders the modal UI based on current state.
   */
  const render = () => {
    if (!isOpen) {
      container.innerHTML = '';
      document.body.style.overflow = '';
      return;
    }

    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';

    container.innerHTML = `
      <div class="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" id="auth-backdrop" aria-hidden="true"></div>
        
        <!-- Modal Panel -->
        <div class="relative w-full max-w-md bg-[var(--color-surface)] rounded-2xl shadow-2xl overflow-hidden border border-[var(--color-border)] transform transition-all animate-in fade-in zoom-in-95 duration-200">
          
          <!-- Header -->
          <div class="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-bg)]">
            <h3 class="text-lg font-bold text-[var(--color-text)]" id="modal-title">
              ${isLoginMode ? 'Welcome Back' : 'Create an Account'}
            </h3>
            <button type="button" id="btn-close-auth" class="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors p-1.5 rounded-full hover:bg-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
              <span class="sr-only">Close</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 sm:p-8">
            
            <!-- Error Message -->
            ${errorMessage ? `
              <div class="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-start shadow-sm">
                <svg class="w-5 h-5 mr-2.5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span class="font-medium">${errorMessage}</span>
              </div>
            ` : ''}

            <!-- Auth Form -->
            <form id="auth-form" class="space-y-5">
              ${!isLoginMode ? `
                <div>
                  <label for="auth-name" class="block text-sm font-medium text-[var(--color-text-muted)] mb-1.5">Full Name</label>
                  <input type="text" id="auth-name" name="name" required class="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 outline-none transition-all placeholder-gray-400" placeholder="John Doe">
                </div>
              ` : ''}
              
              <div>
                <label for="auth-email" class="block text-sm font-medium text-[var(--color-text-muted)] mb-1.5">Email Address</label>
                <input type="email" id="auth-email" name="email" required class="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 outline-none transition-all placeholder-gray-400" placeholder="you@example.com">
              </div>
              
              <div>
                <label for="auth-password" class="block text-sm font-medium text-[var(--color-text-muted)] mb-1.5">Password</label>
                <input type="password" id="auth-password" name="password" required minlength="8" class="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 outline-none transition-all placeholder-gray-400" placeholder="••••••••">
                ${!isLoginMode ? `<p class="mt-1.5 text-xs text-[var(--color-text-muted)]">Must be at least 8 characters long.</p>` : ''}
              </div>

              <button type="submit" class="w-full mt-8 rounded-xl bg-[var(--color-primary)] px-4 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[var(--color-primary-hover)] hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center disabled:opacity-70 disabled:transform-none disabled:cursor-not-allowed" ${isLoading ? 'disabled' : ''}>
                ${isLoading 
                  ? `<svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...` 
                  : isLoginMode ? 'Sign In' : 'Create Account'
                }
              </button>
            </form>

            <!-- Toggle Mode -->
            <div class="mt-8 pt-6 border-t border-[var(--color-border)] text-center text-sm text-[var(--color-text-muted)]">
              ${isLoginMode ? "Don't have an account?" : "Already have an account?"}
              <button type="button" id="btn-toggle-mode" class="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] ml-1 transition-colors focus:outline-none focus:underline">
                ${isLoginMode ? 'Sign up' : 'Log in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    attachEvents();
  };

  /**
   * Attaches event listeners to the modal elements.
   */
  const attachEvents = () => {
    if (!isOpen) return;

    // Close Modal Triggers
    document.getElementById('btn-close-auth')?.addEventListener('click', () => {
      isOpen = false;
      render();
    });

    document.getElementById('auth-backdrop')?.addEventListener('click', () => {
      isOpen = false;
      render();
    });

    // Toggle Login/Register Mode
    document.getElementById('btn-toggle-mode')?.addEventListener('click', () => {
      isLoginMode = !isLoginMode;
      errorMessage = '';
      render();
    });

    // Form Submission (Appwrite Integration)
    const form = document.getElementById('auth-form') as HTMLFormElement;
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      isLoading = true;
      errorMessage = '';
      render();

      const email = (document.getElementById('auth-email') as HTMLInputElement).value;
      const password = (document.getElementById('auth-password') as HTMLInputElement).value;
      const nameInput = document.getElementById('auth-name') as HTMLInputElement | null;

      try {
        if (isLoginMode) {
          // Login
          await account.createEmailPasswordSession(email, password);
        } else {
          // Register
          const name = nameInput?.value || 'User';
          await account.create(ID.unique(), email, password, name);
          // Automatically log in after successful registration
          await account.createEmailPasswordSession(email, password);
        }
        
        // Success: Close modal and notify other components (like Navbar)
        isOpen = false;
        window.dispatchEvent(new CustomEvent('USER_LOGGED_IN'));
        
      } catch (error: any) {
        console.error('Authentication error:', error);
        // Provide user-friendly error messages based on Appwrite response
        if (error.code === 401) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (error.code === 409) {
          errorMessage = 'An account with this email already exists.';
        } else {
          errorMessage = error.message || 'Authentication failed. Please try again.';
        }
      } finally {
        isLoading = false;
        render();
      }
    });
  };

  // Listen for the global event to open the modal
  window.addEventListener('OPEN_AUTH_MODAL', () => {
    isOpen = true;
    isLoginMode = true; // Default to login view
    errorMessage = '';
    render();
  });
}

// Bootstrap the application once the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupApp);
} else {
  setupApp();
}