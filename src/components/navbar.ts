import { account } from '../appwrite';
import { User, CartItem } from '../types';
import { getLocalStorage } from '../utils';

/**
 * Renders the main navigation bar including logo, links, auth state, and cart toggle.
 * 
 * Dispatches:
 * - `TOGGLE_CART`: When the cart button is clicked.
 * - `OPEN_AUTH_MODAL`: When the login button is clicked.
 * - `USER_LOGGED_OUT`: When the user successfully logs out.
 * 
 * Listens to:
 * - `CART_UPDATED`: To update the cart item count badge.
 * - `USER_LOGGED_IN`: To refresh the user profile state.
 * 
 * @param container The DOM element to mount the navbar into.
 */
export async function renderNavbar(container: HTMLElement): Promise<void> {
  // Component State
  let currentUser: User | null = null;
  let isAuthLoading = true;
  let isMobileMenuOpen = false;
  let cartCount = 0;

  // Initialize Cart Count from Local Storage
  const initialCart = getLocalStorage<CartItem[]>('cart', []);
  cartCount = initialCart.reduce((total, item) => total + item.quantity, 0);

  // Fetch initial auth state
  try {
    const sessionUser = await account.get();
    currentUser = sessionUser as unknown as User;
  } catch (error) {
    // User is not logged in or session expired
    currentUser = null;
  } finally {
    isAuthLoading = false;
  }

  // Core Render Function
  const render = () => {
    container.innerHTML = `
      <header class="sticky top-0 z-50 glass w-full border-b border-[var(--color-border)] transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center cursor-pointer group" id="nav-logo">
              <svg class="w-8 h-8 text-[var(--color-primary)] group-hover:text-[var(--color-primary-hover)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
              <span class="ml-2 text-xl font-bold text-[var(--color-text)] tracking-tight">
                Cell<span class="text-[var(--color-primary)]">Store</span>
              </span>
            </div>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex space-x-8">
              <a href="#new-arrivals" class="text-[var(--color-text)] hover:text-[var(--color-primary)] font-medium text-sm transition-colors">New Arrivals</a>
              <a href="#premium" class="text-[var(--color-text)] hover:text-[var(--color-primary)] font-medium text-sm transition-colors">Premium Flagships</a>
              <a href="#budget" class="text-[var(--color-text)] hover:text-[var(--color-primary)] font-medium text-sm transition-colors">Budget Friendly</a>
              <a href="#accessories" class="text-[var(--color-text)] hover:text-[var(--color-primary)] font-medium text-sm transition-colors">Accessories</a>
            </nav>

            <!-- Actions (Auth & Cart) -->
            <div class="flex items-center space-x-2 sm:space-x-4">
              
              <!-- Auth / Profile Bar -->
              <div class="hidden sm:flex items-center min-w-[100px] justify-end" id="auth-container">
                ${isAuthLoading 
                  ? `<div class="animate-pulse h-4 w-16 bg-[var(--color-border)] rounded"></div>` 
                  : currentUser
                    ? `<div class="flex items-center space-x-4">
                        <div class="flex flex-col items-end">
                          <span class="text-sm font-semibold text-[var(--color-text)]">${currentUser.name.split(' ')[0]}</span>
                          <button id="btn-logout" class="text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">Log Out</button>
                        </div>
                        <div class="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm">
                          ${currentUser.name.charAt(0).toUpperCase()}
                        </div>
                       </div>`
                    : `<button id="btn-login" class="px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-full transition-colors shadow-sm">
                        Sign In
                       </button>`
                }
              </div>

              <!-- Cart Toggle -->
              <button id="btn-cart" class="relative p-2 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Open Cart">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                ${cartCount > 0 
                  ? `<span class="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white transform translate-x-1/4 -translate-y-1/4 bg-[var(--color-accent)] rounded-full border-2 border-[var(--color-surface)]">
                      ${cartCount > 99 ? '99+' : cartCount}
                     </span>` 
                  : ''
                }
              </button>

              <!-- Mobile Menu Toggle -->
              <button id="btn-mobile-menu" class="md:hidden p-2 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors rounded-md" aria-label="Toggle Menu">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  ${isMobileMenuOpen 
                    ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`
                    : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Dropdown -->
        <div id="mobile-menu" class="${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-[var(--color-surface)] border-t border-[var(--color-border)] shadow-lg absolute w-full left-0">
          <div class="px-4 pt-2 pb-4 space-y-1">
            <a href="#new-arrivals" class="block px-3 py-3 rounded-md text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-bg)] hover:text-[var(--color-primary)]">New Arrivals</a>
            <a href="#premium" class="block px-3 py-3 rounded-md text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-bg)] hover:text-[var(--color-primary)]">Premium Flagships</a>
            <a href="#budget" class="block px-3 py-3 rounded-md text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-bg)] hover:text-[var(--color-primary)]">Budget Friendly</a>
            <a href="#accessories" class="block px-3 py-3 rounded-md text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-bg)] hover:text-[var(--color-primary)]">Accessories</a>
            
            <div class="border-t border-[var(--color-border)] mt-4 pt-4">
              ${isAuthLoading 
                ? `<div class="animate-pulse h-4 w-24 bg-[var(--color-border)] rounded mx-3"></div>`
                : currentUser
                  ? `<div class="px-3 flex flex-col space-y-3">
                      <span class="text-base font-medium text-[var(--color-text)]">Signed in as ${currentUser.name}</span>
                      <button id="btn-mobile-logout" class="text-left text-base font-medium text-[var(--color-accent)] hover:underline">Log Out</button>
                     </div>`
                  : `<button id="btn-mobile-login" class="w-full text-center px-4 py-3 text-base font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-md transition-colors">
                      Sign In / Register
                     </button>`
              }
            </div>
          </div>
        </div>
      </header>
    `;

    attachEventListeners();
  };

  // Attach DOM Event Listeners
  const attachEventListeners = () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('btn-mobile-menu');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        isMobileMenuOpen = !isMobileMenuOpen;
        render();
      });
    }

    // Cart Toggle
    const cartBtn = document.getElementById('btn-cart');
    if (cartBtn) {
      cartBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('TOGGLE_CART'));
      });
    }

    // Logo Click (Scroll to top)
    const logoBtn = document.getElementById('nav-logo');
    if (logoBtn) {
      logoBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Close mobile menu if open
        if (isMobileMenuOpen) {
          isMobileMenuOpen = false;
          render();
        }
      });
    }

    // Auth Actions
    const handleLoginClick = () => {
      window.dispatchEvent(new CustomEvent('OPEN_AUTH_MODAL'));
      if (isMobileMenuOpen) {
        isMobileMenuOpen = false;
        render();
      }
    };

    const handleLogoutClick = async () => {
      try {
        // Optimistic UI update
        const previousUser = currentUser;
        currentUser = null;
        render();
        
        await account.deleteSession('current');
        window.dispatchEvent(new CustomEvent('USER_LOGGED_OUT'));
      } catch (error) {
        console.error('Logout failed:', error);
        // Revert optimistic update on failure
        currentUser = previousUser;
        render();
        alert('Failed to log out. Please try again.');
      }
    };

    document.getElementById('btn-login')?.addEventListener('click', handleLoginClick);
    document.getElementById('btn-mobile-login')?.addEventListener('click', handleLoginClick);
    
    document.getElementById('btn-logout')?.addEventListener('click', handleLogoutClick);
    document.getElementById('btn-mobile-logout')?.addEventListener('click', handleLogoutClick);

    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        isMobileMenuOpen = false;
        render();
      });
    });
  };

  // Listen for Global State Changes
  
  // Update cart badge when cart changes
  window.addEventListener('CART_UPDATED', ((e: CustomEvent<CartItem[]>) => {
    const cart = e.detail || getLocalStorage<CartItem[]>('cart', []);
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    render();
  }) as EventListener);

  // Update profile bar when user logs in
  window.addEventListener('USER_LOGGED_IN', (async () => {
    isAuthLoading = true;
    render();
    try {
      const sessionUser = await account.get();
      currentUser = sessionUser as unknown as User;
    } catch (error) {
      console.error('Failed to fetch user after login event:', error);
      currentUser = null;
    } finally {
      isAuthLoading = false;
      render();
    }
  }) as EventListener);

  // Initial Render
  render();
}