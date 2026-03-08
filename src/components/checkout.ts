import { store } from '../store';
import { formatCurrency } from '../utils';

export function Checkout(): HTMLElement {
  const container = document.createElement('div');
  container.id = 'checkout-modal-container';

  // Local component state
  let isProcessing = false;
  let isSuccess = false;

  function render() {
    const state = store.getState();
    const total = state.cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // If checkout is not open, clear the container and reset local state
    if (!state.isCheckoutOpen) {
      container.innerHTML = '';
      isProcessing = false;
      isSuccess = false;
      return;
    }

    container.innerHTML = `
      <div class="modal-overlay active">
        <div class="modal-content relative max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <button id="close-checkout" class="absolute top-4 right-4 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors" aria-label="Close checkout">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          ${isSuccess ? renderSuccess() : renderForm(total, isProcessing)}
        </div>
      </div>
    `;

    bindEvents();
  }

  function renderForm(total: number, processing: boolean): string {
    return `
      <h2 class="text-2xl font-bold mb-6 text-[var(--color-text)]">Checkout</h2>
      <form id="checkout-form" class="space-y-4">
        <div>
          <label class="label-text">Full Name</label>
          <input type="text" required class="input-field" placeholder="Jane Doe" ${processing ? 'disabled' : ''}>
        </div>
        <div>
          <label class="label-text">Email Address</label>
          <input type="email" required class="input-field" placeholder="jane@example.com" ${processing ? 'disabled' : ''}>
        </div>
        <div>
          <label class="label-text">Shipping Address</label>
          <input type="text" required class="input-field" placeholder="123 Monstera Lane, Plant City" ${processing ? 'disabled' : ''}>
        </div>

        <div class="pt-4 border-t border-[var(--color-border)] mt-6">
          <h3 class="text-lg font-semibold mb-4 text-[var(--color-text)] flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[var(--color-primary)]"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            Payment Details (Dummy)
          </h3>
          <div class="space-y-4">
            <div>
              <label class="label-text">Card Number</label>
              <input type="text" required class="input-field" placeholder="0000 0000 0000 0000" pattern="[0-9\\s]{13,19}" maxlength="19" ${processing ? 'disabled' : ''}>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label-text">Expiry Date</label>
                <input type="text" required class="input-field" placeholder="MM/YY" pattern="(0[1-9]|1[0-2])\\/?([0-9]{2})" maxlength="5" ${processing ? 'disabled' : ''}>
              </div>
              <div>
                <label class="label-text">CVC</label>
                <input type="text" required class="input-field" placeholder="123" pattern="[0-9]{3,4}" maxlength="4" ${processing ? 'disabled' : ''}>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-6">
          <button type="submit" class="btn-primary w-full py-3 text-lg" ${processing ? 'disabled' : ''}>
            ${
              processing
                ? `
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            `
                : `Pay ${formatCurrency(total)}`
            }
          </button>
          <p class="text-xs text-center text-[var(--color-muted)] mt-3 flex items-center justify-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            This is a secure dummy checkout. No real charges will be made.
          </p>
        </div>
      </form>
    `;
  }

  function renderSuccess(): string {
    return `
      <div class="text-center py-8 px-4">
        <div class="w-20 h-20 bg-[var(--color-primary)]/20 text-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[var(--shadow-cyan)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 class="text-3xl font-bold mb-3 text-[var(--color-text)]">Order Confirmed!</h2>
        <p class="text-[var(--color-muted)] mb-8 text-lg">
          Thank you for your purchase. Your new plant buddies will be carefully packaged and shipped soon!
        </p>
        <button id="continue-shopping" class="btn-primary w-full py-3">
          Continue Shopping
        </button>
      </div>
    `;
  }

  function bindEvents() {
    const closeBtn = container.querySelector('#close-checkout');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        store.toggleCheckout();
      });
    }

    const form = container.querySelector('#checkout-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Set processing state and re-render to show spinner
        isProcessing = true;
        render();

        // Simulate network request for payment processing
        setTimeout(() => {
          isProcessing = false;
          isSuccess = true;
          store.clearCart(); // Empty the cart upon successful dummy payment
          render(); // Re-render to show success screen
        }, 1500);
      });
    }

    const continueBtn = container.querySelector('#continue-shopping');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        store.toggleCheckout();
      });
    }
  }

  // Subscribe to global store changes to reactively open/close
  store.subscribe(render);

  // Initial render
  render();

  return container;
}