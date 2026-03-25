import { databases, DATABASE_ID, COLLECTION_PRODUCTS } from '../appwrite';
import { Product, CartItem } from '../types';
import { formatCurrency, getLocalStorage, setLocalStorage } from '../utils';

/**
 * Renders the product segments (categories) fetching real data from Appwrite.
 * 
 * @param container The DOM element to mount the product segments into.
 */
export function renderProductSegments(container: HTMLElement): void {
  // Component State
  let products: Product[] = [];
  let isLoading = true;
  let error: string | null = null;

  // Category mapping for section IDs (matches navbar links)
  const categoryConfig = [
    { name: 'New Arrivals', id: 'new-arrivals' },
    { name: 'Premium Flagships', id: 'premium' },
    { name: 'Budget Friendly', id: 'budget' },
    { name: 'Accessories', id: 'accessories' }
  ] as const;

  /**
   * Fetches products from the Appwrite database.
   */
  const fetchProducts = async () => {
    try {
      isLoading = true;
      error = null;
      render(); // Show loading state

      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_PRODUCTS
      );

      // Map Appwrite documents to our Product interface
      products = response.documents as unknown as Product[];
    } catch (err: any) {
      console.error('Failed to fetch products:', err);
      error = err.message || 'Failed to load products. Please check your connection and Appwrite configuration.';
    } finally {
      isLoading = false;
      render();
    }
  };

  /**
   * Handles adding a product to the cart.
   */
  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) return;

    const cart = getLocalStorage<CartItem[]>('cart', []);
    const existingItemIndex = cart.findIndex(item => item.product.$id === product.$id);

    if (existingItemIndex >= 0) {
      // Check if adding one more exceeds stock
      if (cart[existingItemIndex].quantity < product.stock) {
        cart[existingItemIndex].quantity += 1;
      } else {
        showToast(`Cannot add more. Only ${product.stock} in stock.`, 'error');
        return;
      }
    } else {
      cart.push({ product, quantity: 1 });
    }

    setLocalStorage('cart', cart);
    
    // Dispatch event to update navbar cart badge and cart drawer
    window.dispatchEvent(new CustomEvent('CART_UPDATED', { detail: cart }));
    
    // Show success feedback
    showToast(`Added ${product.name} to cart!`, 'success');
  };

  /**
   * Displays a temporary toast notification.
   */
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-[var(--color-accent)]';
    
    toast.className = `fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-xl transform transition-all duration-300 translate-y-10 opacity-0 z-50 flex items-center space-x-2`;
    
    toast.innerHTML = `
      ${type === 'success' 
        ? `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`
        : `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
      }
      <span class="font-medium">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-10', 'opacity-0');
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.add('translate-y-10', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  /**
   * Generates the HTML for a single product card.
   */
  const generateProductCard = (product: Product): string => {
    const isOutOfStock = product.stock <= 0;
    const featuresHtml = (product.features || []).slice(0, 2).map(feature => 
      `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
        ${feature}
      </span>`
    ).join('');

    return `
      <div class="bg-[var(--color-surface)] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-[var(--color-border)] group relative">
        
        <!-- Badges -->
        <div class="absolute top-4 left-4 z-10 flex flex-col gap-2">
          ${isOutOfStock 
            ? `<span class="px-3 py-1 text-xs font-bold text-white bg-[var(--color-accent)] rounded-full shadow-sm backdrop-blur-md bg-opacity-90">Out of Stock</span>`
            : product.stock < 5 
              ? `<span class="px-3 py-1 text-xs font-bold text-[var(--color-text)] bg-yellow-400 rounded-full shadow-sm backdrop-blur-md bg-opacity-90">Only ${product.stock} left</span>`
              : ''
          }
        </div>

        <!-- Image -->
        <div class="relative w-full h-64 bg-[var(--color-bg)] overflow-hidden p-6 flex items-center justify-center">
          ${product.imageUrl 
            ? `<img src="${product.imageUrl}" alt="${product.name}" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" loading="lazy" />`
            : `<div class="text-[var(--color-text-muted)] flex flex-col items-center">
                <svg class="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span class="text-sm">No Image</span>
               </div>`
          }
        </div>
        
        <!-- Content -->
        <div class="p-6 flex flex-col flex-grow">
          <div class="mb-1 text-xs font-bold tracking-wider text-[var(--color-primary)] uppercase">${product.brand}</div>
          <h3 class="text-lg font-bold text-[var(--color-text)] mb-2 line-clamp-1" title="${product.name}">${product.name}</h3>
          
          <div class="flex flex-wrap gap-2 mb-4 min-h-[24px]">
            ${featuresHtml}
          </div>
          
          <div class="mt-auto flex items-center justify-between mb-4">
            <span class="text-2xl font-extrabold text-[var(--color-text)]">${formatCurrency(product.price)}</span>
          </div>
          
          <button 
            class="btn-add-to-cart w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              isOutOfStock 
                ? 'bg-[var(--color-bg)] text-[var(--color-text-muted)] cursor-not-allowed border border-[var(--color-border)]' 
                : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
            }"
            data-product-id="${product.$id}"
            ${isOutOfStock ? 'disabled' : ''}
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <span>${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    `;
  };

  /**
   * Generates skeleton loaders for the loading state.
   */
  const generateSkeletons = (count: number = 4): string => {
    return Array(count).fill(0).map(() => `
      <div class="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden animate-pulse">
        <div class="w-full h-64 bg-[var(--color-border)] opacity-20"></div>
        <div class="p-6 flex flex-col">
          <div class="h-3 bg-[var(--color-border)] rounded w-1/4 mb-3 opacity-30"></div>
          <div class="h-5 bg-[var(--color-border)] rounded w-3/4 mb-4 opacity-30"></div>
          <div class="flex gap-2 mb-4">
            <div class="h-5 bg-[var(--color-border)] rounded w-16 opacity-20"></div>
            <div class="h-5 bg-[var(--color-border)] rounded w-20 opacity-20"></div>
          </div>
          <div class="h-8 bg-[var(--color-border)] rounded w-1/3 mb-4 opacity-30 mt-auto"></div>
          <div class="h-12 bg-[var(--color-border)] rounded w-full opacity-20"></div>
        </div>
      </div>
    `).join('');
  };

  /**
   * Core render function.
   */
  const render = () => {
    if (isLoading) {
      container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div class="h-8 bg-[var(--color-border)] rounded w-48 mb-8 opacity-20 animate-pulse"></div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            ${generateSkeletons(8)}
          </div>
        </div>
      `;
      return;
    }

    if (error) {
      container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent)] bg-opacity-10 mb-6">
            <svg class="w-8 h-8 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h3 class="text-2xl font-bold text-[var(--color-text)] mb-2">Oops! Something went wrong</h3>
          <p class="text-[var(--color-text-muted)] mb-8 max-w-md mx-auto">${error}</p>
          <button id="btn-retry-fetch" class="px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-full font-medium transition-colors">
            Try Again
          </button>
        </div>
      `;
      
      document.getElementById('btn-retry-fetch')?.addEventListener('click', fetchProducts);
      return;
    }

    if (products.length === 0) {
      container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-bg)] border-2 border-dashed border-[var(--color-border)] mb-6">
            <svg class="w-10 h-10 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
          </div>
          <h3 class="text-2xl font-bold text-[var(--color-text)] mb-2">No Products Found</h3>
          <p class="text-[var(--color-text-muted)] max-w-md mx-auto">
            Your store is currently empty. Please add products to the <strong>${COLLECTION_PRODUCTS}</strong> collection in your Appwrite database.
          </p>
        </div>
      `;
      return;
    }

    // Group products by category and build HTML
    let html = `<div class="bg-[var(--color-bg)] pb-24">`;

    categoryConfig.forEach(category => {
      const categoryProducts = products.filter(p => p.category === category.name);
      
      if (categoryProducts.length > 0) {
        html += `
          <section id="${category.id}" class="pt-16 sm:pt-24 scroll-mt-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex items-center justify-between mb-8">
                <h2 class="text-3xl font-extrabold text-[var(--color-text)] tracking-tight">${category.name}</h2>
                ${categoryProducts.length > 4 ? `<a href="#" class="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hidden sm:block">View all <span aria-hidden="true">&rarr;</span></a>` : ''}
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                ${categoryProducts.map(product => generateProductCard(product)).join('')}
              </div>
            </div>
          </section>
        `;
      }
    });

    html += `</div>`;
    container.innerHTML = html;

    attachEventListeners();
  };

  /**
   * Attaches event listeners to the rendered product cards.
   */
  const attachEventListeners = () => {
    const addToCartButtons = container.querySelectorAll('.btn-add-to-cart');
    
    addToCartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const productId = target.getAttribute('data-product-id');
        
        if (productId) {
          const product = products.find(p => p.$id === productId);
          if (product) {
            // Add a little pop animation to the button
            target.classList.add('scale-95');
            setTimeout(() => target.classList.remove('scale-95'), 150);
            
            handleAddToCart(product);
          }
        }
      });
    });
  };

  // Initial fetch
  fetchProducts();
}