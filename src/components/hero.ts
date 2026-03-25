/**
 * Renders the Hero section of the landing page.
 * Features a high-impact headline, a sleek product image, and strong Call-to-Action buttons.
 * 
 * @param container The DOM element to mount the hero section into.
 */
export function renderHero(container: HTMLElement): void {
  // Define the HTML structure using Tailwind CSS and CSS variables from the design system
  container.innerHTML = `
    <section class="relative bg-[var(--color-bg)] overflow-hidden pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-24 lg:pb-32 transition-colors duration-300">
      
      <!-- Decorative Background Elements -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div class="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-b from-[var(--color-primary)] to-transparent opacity-5 blur-3xl"></div>
        <div class="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-t from-[var(--color-primary)] to-transparent opacity-5 blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          <!-- Text Content (Left Column) -->
          <div class="lg:col-span-6 text-center lg:text-left mb-12 lg:mb-0">
            <div class="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-primary)] bg-opacity-10 text-[var(--color-primary)] text-sm font-semibold tracking-wide mb-6 border border-[var(--color-primary)] border-opacity-20">
              <span class="flex w-2 h-2 rounded-full bg-[var(--color-primary)] mr-2 animate-pulse"></span>
              New Arrivals 2024
            </div>
            
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--color-text)] tracking-tight mb-6 text-balance leading-tight">
              Experience the <br class="hidden lg:block" />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-blue-400">
                Next Generation
              </span>
            </h1>
            
            <p class="text-lg sm:text-xl text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto lg:mx-0 text-balance">
              Discover our curated collection of premium flagship smartphones. Unmatched performance, pro-grade cameras, and all-day battery life.
            </p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button id="hero-cta-shop" class="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center group">
                Shop Premium
                <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
              
              <button id="hero-cta-explore" class="w-full sm:w-auto px-8 py-4 text-base font-semibold text-[var(--color-text)] bg-transparent border-2 border-[var(--color-border)] hover:border-[var(--color-text)] rounded-full transition-all duration-300 flex items-center justify-center">
                Explore Budget
              </button>
            </div>
            
            <!-- Trust Indicators -->
            <div class="mt-10 pt-8 border-t border-[var(--color-border)] flex items-center justify-center lg:justify-start space-x-6 text-sm font-medium text-[var(--color-text-muted)]">
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Free Shipping
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                2-Year Warranty
              </div>
            </div>
          </div>
          
          <!-- Image Content (Right Column) -->
          <div class="lg:col-span-6 relative perspective-1000">
            <div class="relative w-full max-w-lg mx-auto transform transition-transform duration-700 hover:scale-105 hover:-rotate-1">
              <!-- Main Phone Image (Using a high-quality Unsplash placeholder for a modern phone) -->
              <img 
                src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop" 
                alt="Latest Premium Smartphone" 
                class="relative z-10 w-full h-auto object-cover rounded-[2.5rem] shadow-2xl border-4 border-[var(--color-surface)]"
                loading="lazy"
              />
              
              <!-- Floating Badge -->
              <div class="absolute -bottom-6 -left-6 z-20 glass px-6 py-4 rounded-2xl shadow-xl border border-[var(--color-border)] animate-bounce" style="animation-duration: 3s;">
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-accent)] bg-opacity-10 flex items-center justify-center">
                    <svg class="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <p class="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wider">Limited Time</p>
                    <p class="text-sm font-bold text-[var(--color-text)]">Save up to 15%</p>
                  </div>
                </div>
              </div>
              
              <!-- Decorative Glow behind image -->
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-[var(--color-primary)] to-purple-500 rounded-full opacity-20 blur-3xl -z-10"></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  `;

  attachEventListeners(container);
}

/**
 * Attaches event listeners to the Hero section interactive elements.
 * @param container The DOM element containing the hero section.
 */
function attachEventListeners(container: HTMLElement): void {
  const shopBtn = container.querySelector('#hero-cta-shop');
  const exploreBtn = container.querySelector('#hero-cta-explore');

  // Smooth scroll to Premium Flagships section
  shopBtn?.addEventListener('click', () => {
    const premiumSection = document.getElementById('premium');
    if (premiumSection) {
      premiumSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback if section isn't rendered yet
      window.dispatchEvent(new CustomEvent('NAVIGATE_TO', { detail: 'premium' }));
    }
  });

  // Smooth scroll to Budget Friendly section
  exploreBtn?.addEventListener('click', () => {
    const budgetSection = document.getElementById('budget');
    if (budgetSection) {
      budgetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback if section isn't rendered yet
      window.dispatchEvent(new CustomEvent('NAVIGATE_TO', { detail: 'budget' }));
    }
  });
}