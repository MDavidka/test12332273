import { Query } from 'appwrite';
import { CartItem } from '../types';
import { getLocalStorage, setLocalStorage, formatCurrency, calculateCartTotal, calculateDiscountedTotal } from '../utils';
import { databases, account, DATABASE_ID, COLLECTION_ORDERS, COLLECTION_DISCOUNTS, ID } from '../appwrite';

/**
 * Renders the Checkout Modal component.
 * Handles user shipping details, discount code validation, and order submission via Appwrite.
 * 
 * Listens to:
 * - `OPEN_CHECKOUT`: Opens the modal and initializes the checkout flow.
 * 
 * Dispatches:
 * - `CART_UPDATED`: Clears the cart after a successful order.
 * 
 * @param container The DOM element to mount the checkout modal into.
 */
export function renderCheckoutModal(container: HTMLElement): void {
  // Component State
  let isOpen = false;
  let cart: CartItem[] = [];
  let appliedDiscount: { code: string; percentage: number } | null = null;
  let isProcessing = false;
  let isApplyingDiscount = false;
  let discountError = '';
  let checkoutStep: 'form' | 'success' = 'form';
  let orderId = '';

  // Create the shell element
  const modalWrapper = document.createElement('div');
  modalWrapper.id = 'checkout-modal-wrapper';
  modalWrapper.className = 'relative z-[110]';
  modalWrapper.setAttribute('aria-labelledby', 'checkout-modal-title');
  modalWrapper.setAttribute('role', 'dialog');
  modalWrapper.setAttribute('aria-modal', 'true');
  
  container.appendChild(modalWrapper);

  /**
   * Calculates the various totals for the order summary.
   */
  const getTotals = () => {
    const subtotal = calculateCartTotal(cart);
    const discountAmount = appliedDiscount ? subtotal * (appliedDiscount.percentage / 100) : 0;
    const afterDiscount = subtotal - discountAmount;
    const shipping = afterDiscount > 500 ? 0 : 25; // Free shipping over $500
    const tax = afterDiscount * 0.08; // 8% flat tax rate for demo
    const total = afterDiscount + shipping + tax;

    return { subtotal, discountAmount, shipping, tax, total };
  };

  /**
   * Validates and applies a discount code via Appwrite.
   */
  const handleApplyDiscount = async (code: string) => {
    if (!code.trim()) return;
    
    isApplyingDiscount = true;
    discountError = '';
    render(); // Update UI to show loading state

    try {
      // Query the discounts collection
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_DISCOUNTS,
        [Query.equal('code', code.toUpperCase())]
      );

      if (response.documents.length > 0) {
        const discountDoc = response.documents[0];
        
        // Check if discount is active (assuming an 'isActive' boolean attribute exists)
        if (discountDoc.isActive === false) {
          discountError = 'This discount code is no longer active.';
          appliedDiscount = null;
        } else {
          appliedDiscount = {
            code: discountDoc.code,
            percentage: discountDoc.percentage || 0
          };
        }
      } else {
        discountError = 'Invalid discount code.';
        appliedDiscount = null;
      }
    } catch (error: any) {
      console.error('Failed to apply discount:', error);
      discountError = 'Error validating code. Please try again.';
      appliedDiscount = null;
    } finally {
      isApplyingDiscount = false;
      render();
    }
  };

  /**
   * Submits the order to the Appwrite database.
   */
  const handlePlaceOrder = async (formData: FormData) => {
    isProcessing = true;
    render();

    try {
      // Try to get the current user, fallback to null if guest
      let userId = null;
      try {
        const user = await account.get();
        userId = user.$id;
      } catch (e) {
        // User is not logged in, proceed as guest
      }

      const { total } = getTotals();
      
      // Construct the order payload
      // Note: Ensure these attributes exist in your Appwrite Orders collection
      const orderData = {
        userId: userId || 'guest',
        customerName: `${formData.get('firstName')} ${formData.get('lastName')}`,
        customerEmail: formData.get('email') as string,
        shippingAddress: `${formData.get('address')}, ${formData.get('city')}, ${formData.get('country')} ${formData.get('zip')}`,
        totalAmount: total,
        status: 'pending',
        // Store items as a JSON string since Appwrite doesn't support complex nested arrays natively without relationships
        items: JSON.stringify(cart.map(item => ({
          productId: item.product.$id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        }))),
        discountCode: appliedDiscount?.code || null
      };

      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ORDERS,
        ID.unique(),
        orderData
      );

      orderId = response.$id;
      checkoutStep = 'success';
      
      // Clear cart
      setLocalStorage('cart', []);
      window.dispatchEvent(new CustomEvent('CART_UPDATED', { detail: [] }));

    } catch (error: any) {
      console.error('Failed to place order:', error);
      alert(`Failed to place order: ${error.message || 'Unknown error'}`);
    } finally {
      isProcessing = false;
      render();
    }
  };

  /**
   * Closes the modal and resets state.
   */
  const closeModal = () => {
    isOpen = false;
    render();
    // Reset state after animation completes
    setTimeout(() => {
      checkoutStep = 'form';
      appliedDiscount = null;
      discountError = '';
    }, 300);
  };

  /**
   * Core render function.
   */
  const render = () => {
    if (!isOpen) {
      modalWrapper.innerHTML = '';
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    const { subtotal, discountAmount, shipping, tax, total } = getTotals();

    modalWrapper.innerHTML = `
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity z-40" aria-hidden="true" id="checkout-backdrop"></div>

      <!-- Modal Panel -->
      <div class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-2xl bg-[var(--color-bg)] text-left shadow-2xl transition-all sm:my-8 w-full max-w-5xl border border-[var(--color-border)] flex flex-col max-h-[90vh]">
            
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] sticky top-0 z-10">
              <h2 class="text-xl font-bold text-[var(--color-text)]" id="checkout-modal-title">
                ${checkoutStep === 'success' ? 'Order Confirmed' : 'Secure Checkout'}
              </h2>
              <button type="button" id="btn-close-checkout" class="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors p-2 rounded-full hover:bg-[var(--color-bg)]">
                <span class="sr-only">Close</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div class="flex-1 overflow-y-auto">
              ${checkoutStep === 'success' ? renderSuccessState() : renderFormState(subtotal, discountAmount, shipping, tax, total)}
            </div>

          </div>
        </div>
      </div>
    `;

    attachEventListeners();
  };

  /**
   * Renders the main checkout form and order summary.
   */
  const renderFormState = (subtotal: number, discountAmount: number, shipping: number, tax: number, total: number) => `
    <div class="flex flex-col lg:flex-row">
      
      <!-- Left Column: Forms -->
      <div class="flex-1 p-6 sm:p-8 lg:p-10 bg-[var(--color-surface)]">
        <form id="checkout-form" class="space-y-8">
          
          <!-- Contact Info -->
          <div>
            <h3 class="text-lg font-semibold text-[var(--color-text)] mb-4">Contact Information</h3>
            <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">First Name</label>
                <input type="text" id="firstName" name="firstName" required class="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all outline-none">
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">Last Name</label>
                <input type="text" id="lastName" name="lastName" required class="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all outline-none">
              </div>
              <div class="sm:col-span-2">
                <label for="email" class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">Email Address</label>
                <input type="email" id="email" name="email" required class="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all outline-none">
              </div>
            </div>
          </div>

          <!-- Shipping Info -->
          <div class="pt-6 border-t border-[var(--color-border)]">
            <h3 class="text-lg font-semibold text-[var(--color-text)] mb-4">Shipping Address</h3>
            <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
              <div class="sm:col-span-2">
                <label for="address" class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">Street Address</label>
                <input type="text" id="address" name="address" required class="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all outline-none">
              </div>
              <div>
                <label for="city" class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">City</label>
                <input type="text" id="city" name="city" required class="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all outline-none">
              </div>
              <div>
                <label for="country" class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">Country</label>
                <select id="country" name="country" required class="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all outline-none appearance-none">
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="EU">European Union</option>
                </select>
              </div>
              <div>
                <label for="zip" class="block text-sm font-medium text-[var(--color-text-muted)] mb-1">ZIP / Postal Code</label>
                <input type="text" id="zip" name="zip" required class="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all outline-none">
              </div>
            </div>
          </div>

          <!-- Payment Mock -->
          <div class="pt-6 border-t border-[var(--color-border)]">
            <h3 class="text-lg font-semibold text-[var(--color-text)] mb-4">Payment</h3>
            <div class="bg-[var(--color-bg)] rounded-xl p-4 border border-[var(--color-border)] flex items-center space-x-3">
              <svg class="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
              <span class="text-sm text-[var(--color-text-muted)]">Secure payment processing is simulated for this demo.</span>
            </div>
          </div>

          <!-- Submit Button (Mobile only, hidden on lg) -->
          <div class="lg:hidden pt-6">
            <button type="submit" form="checkout-form" class="w-full rounded-full bg-[var(--color-primary)] px-6 py-4 text-base font-bold text-white shadow-md hover:bg-[var(--color-primary-hover)] transition-all flex items-center justify-center disabled:opacity-70" ${isProcessing ? 'disabled' : ''}>
              ${isProcessing 
                ? `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...` 
                : `Pay ${formatCurrency(total)}`
              }
            </button>
          </div>
        </form>
      </div>

      <!-- Right Column: Order Summary -->
      <div class="w-full lg:w-[400px] xl:w-[450px] bg-[var(--color-bg)] p-6 sm:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-[var(--color-border)] flex flex-col">
        <h3 class="text-lg font-semibold text-[var(--color-text)] mb-6">Order Summary</h3>
        
        <!-- Items List -->
        <ul class="space-y-4 mb-8 flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[40vh] lg:max-h-none">
          ${cart.map(item => `
            <li class="flex items-center space-x-4">
              <div class="relative h-16 w-16 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-1 flex-shrink-0">
                ${item.product.imageUrl 
                  ? `<img src="${item.product.imageUrl}" alt="${item.product.name}" class="h-full w-full object-contain">`
                  : `<div class="h-full w-full bg-[var(--color-bg)] rounded"></div>`
                }
                <span class="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-text)] text-[10px] font-bold text-[var(--color-surface)] shadow-sm">
                  ${item.quantity}
                </span>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium text-[var(--color-text)] truncate">${item.product.name}</h4>
                <p class="text-xs text-[var(--color-text-muted)]">${item.product.brand}</p>
              </div>
              <div class="text-sm font-semibold text-[var(--color-text)]">
                ${formatCurrency(item.product.price * item.quantity)}
              </div>
            </li>
          `).join('')}
        </ul>

        <!-- Discount Code -->
        <div class="mb-8 pt-6 border-t border-[var(--color-border)]">
          <label for="discount-code" class="sr-only">Discount code</label>
          <div class="flex space-x-2">
            <input type="text" id="discount-code" placeholder="Discount code" class="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 outline-none uppercase" ${appliedDiscount ? 'disabled' : ''} value="${appliedDiscount?.code || ''}">
            <button type="button" id="btn-apply-discount" class="rounded-xl bg-[var(--color-secondary)] px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-colors disabled:opacity-50" ${appliedDiscount || isApplyingDiscount ? 'disabled' : ''}>
              ${isApplyingDiscount ? '...' : appliedDiscount ? 'Applied' : 'Apply'}
            </button>
          </div>
          ${discountError ? `<p class="mt-2 text-xs text-[var(--color-accent)]">${discountError}</p>` : ''}
          ${appliedDiscount ? `
            <div class="mt-2 flex items-center justify-between text-xs text-green-600 bg-green-500/10 px-3 py-2 rounded-lg border border-green-500/20">
              <span class="flex items-center"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Code ${appliedDiscount.code} applied (-${appliedDiscount.percentage}%)</span>
              <button type="button" id="btn-remove-discount" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] underline">Remove</button>
            </div>
          ` : ''}
        </div>

        <!-- Totals -->
        <div class="space-y-3 text-sm text-[var(--color-text-muted)] pt-6 border-t border-[var(--color-border)]">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span class="text-[var(--color-text)] font-medium">${formatCurrency(subtotal)}</span>
          </div>
          ${appliedDiscount ? `
            <div class="flex justify-between text-green-600">
              <span>Discount (${appliedDiscount.percentage}%)</span>
              <span>-${formatCurrency(discountAmount)}</span>
            </div>
          ` : ''}
          <div class="flex justify-between">
            <span>Shipping</span>
            <span class="text-[var(--color-text)] font-medium">${shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
          </div>
          <div class="flex justify-between">
            <span>Estimated Tax</span>
            <span class="text-[var(--color-text)] font-medium">${formatCurrency(tax)}</span>
          </div>
          <div class="flex justify-between items-center pt-4 border-t border-[var(--color-border)] mt-4">
            <span class="text-base font-bold text-[var(--color-text)]">Total</span>
            <span class="text-2xl font-extrabold text-[var(--color-text)]">${formatCurrency(total)}</span>
          </div>
        </div>

        <!-- Submit Button (Desktop) -->
        <div class="hidden lg:block mt-8">
          <button type="submit" form="checkout-form" class="w-full rounded-full bg-[var(--color-primary)] px-6 py-4 text-base font-bold text-white shadow-md hover:bg-[var(--color-primary-hover)] hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center disabled:opacity-70 disabled:transform-none" ${isProcessing ? 'disabled' : ''}>
            ${isProcessing 
              ? `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...` 
              : `Pay ${formatCurrency(total)}`
            }
          </button>
        </div>
      </div>
    </div>
  `;

  /**
   * Renders the success state after an order is placed.
   */
  const renderSuccessState = () => `
    <div class="p-8 sm:p-16 flex flex-col items-center justify-center text-center bg-[var(--color-surface)]">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 border-4 border-green-50">
        <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h2 class="text-3xl font-extrabold text-[var(--color-text)] mb-2">Order Successful!</h2>
      <p class="text-[var(--color-text-muted)] mb-8 max-w-md">
        Thank you for your purchase. Your order <strong class="text-[var(--color-text)]">#${orderId.slice(-8).toUpperCase()}</strong> has been received and is being processed.
      </p>
      <button type="button" id="btn-continue-shopping-success" class="rounded-full bg-[var(--color-primary)] px-8 py-3 text-base font-bold text-white shadow-md hover:bg-[var(--color-primary-hover)] transition-all">
        Continue Shopping
      </button>
    </div>
  `;

  /**
   * Attaches event listeners to the rendered DOM elements.
   */
  const attachEventListeners = () => {
    if (!isOpen) return;

    // Close buttons
    document.getElementById('btn-close-checkout')?.addEventListener('click', closeModal);
    document.getElementById('checkout-backdrop')?.addEventListener('click', closeModal);
    document.getElementById('btn-continue-shopping-success')?.addEventListener('click', closeModal);

    // Form submission
    const form = document.getElementById('checkout-form') as HTMLFormElement;
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handlePlaceOrder(new FormData(form));
      });
    }

    // Discount logic
    const applyBtn = document.getElementById('btn-apply-discount');
    const discountInput = document.getElementById('discount-code') as HTMLInputElement;
    const removeBtn = document.getElementById('btn-remove-discount');

    if (applyBtn && discountInput) {
      applyBtn.addEventListener('click', () => {
        handleApplyDiscount(discountInput.value);
      });

      // Allow pressing Enter in the discount input
      discountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleApplyDiscount(discountInput.value);
        }
      });
    }

    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        appliedDiscount = null;
        discountError = '';
        render();
      });
    }
  };

  // Global Event Listener to open the modal
  window.addEventListener('OPEN_CHECKOUT', () => {
    cart = getLocalStorage<CartItem[]>('cart', []);
    if (cart.length === 0) return; // Safety check
    
    isOpen = true;
    checkoutStep = 'form';
    appliedDiscount = null;
    discountError = '';
    render();
  });
}