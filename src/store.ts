import { Plant, CartItem, StoreState, StateChangeCallback } from './types';

class AppStore {
  private state: StoreState = {
    cart: [],
    isCartOpen: false,
    isCheckoutOpen: false,
  };

  private listeners: StateChangeCallback[] = [];

  /**
   * Returns the current application state.
   */
  getState(): StoreState {
    return this.state;
  }

  /**
   * Subscribes to state changes.
   * @param listener Callback function executed whenever state changes.
   * @returns Unsubscribe function to remove the listener.
   */
  subscribe(listener: StateChangeCallback): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /**
   * Internal method to notify all subscribers of a state change.
   */
  private notify() {
    // Pass a shallow copy to prevent direct mutation bugs in listeners
    this.listeners.forEach((listener) => listener({ ...this.state }));
  }

  /**
   * Adds a plant to the cart or increments its quantity if it already exists.
   */
  addToCart(plant: Plant) {
    const existingItem = this.state.cart.find((item) => item.plant.id === plant.id);
    
    if (existingItem) {
      this.state.cart = this.state.cart.map((item) =>
        item.plant.id === plant.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      this.state.cart = [...this.state.cart, { plant, quantity: 1 }];
    }
    
    // Automatically open the cart drawer to provide visual feedback
    this.state.isCartOpen = true;
    this.notify();
  }

  /**
   * Removes a plant entirely from the cart.
   */
  removeFromCart(plantId: string) {
    this.state.cart = this.state.cart.filter((item) => item.plant.id !== plantId);
    this.notify();
  }

  /**
   * Updates the quantity of a specific plant in the cart.
   * If quantity is set to 0 or less, the item is removed.
   */
  updateQuantity(plantId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(plantId);
      return;
    }
    
    this.state.cart = this.state.cart.map((item) =>
      item.plant.id === plantId ? { ...item, quantity } : item
    );
    this.notify();
  }

  /**
   * Empties the shopping cart.
   */
  clearCart() {
    this.state.cart = [];
    this.notify();
  }

  /**
   * Toggles the visibility of the shopping cart drawer.
   */
  toggleCart(isOpen?: boolean) {
    this.state.isCartOpen = isOpen !== undefined ? isOpen : !this.state.isCartOpen;
    
    // Ensure checkout modal is closed if we are opening the cart
    if (this.state.isCartOpen) {
      this.state.isCheckoutOpen = false;
    }
    this.notify();
  }

  /**
   * Toggles the visibility of the dummy checkout modal.
   */
  toggleCheckout(isOpen?: boolean) {
    this.state.isCheckoutOpen = isOpen !== undefined ? isOpen : !this.state.isCheckoutOpen;
    
    // Ensure cart drawer is closed if we are opening the checkout
    if (this.state.isCheckoutOpen) {
      this.state.isCartOpen = false;
    }
    this.notify();
  }
}

// Export a singleton instance of the store to be used across the application
export const store = new AppStore();