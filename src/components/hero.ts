/**
 * Renders the Hero section of the plant store.
 * Highlights the value proposition and features a prominent plant image.
 * 
 * @param container The DOM element to append the hero section to.
 */
export function renderHero(container: HTMLElement): void {
  if (!container) return;

  const heroSection = document.createElement('section');
  heroSection.className = 'relative bg-[var(--color-bg)] overflow-hidden';
  heroSection.id = 'hero';

  heroSection.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-40">
      <div class="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
        
        <!-- Text Content -->
        <div class="lg:col-span-6 text-center lg:text-left z-10 relative">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--color-secondary)] tracking-tight mb-6" style="font-family: var(--font-sans)">
            Bring <span class="text-[var(--color-primary)]">Nature</span><br/> Indoors
          </h1>
          <p class="text-lg sm:text-xl text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto lg:mx-0 text-balance" style="font-family: var(--font-sans)">
            Discover our curated collection of beautiful, healthy plants delivered straight to your door. Elevate your space, purify your air, and breathe easier.
          </p>
          
          <!-- Call to Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="#gallery" class="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-medium rounded-full text-[var(--color-surface)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-colors duration-300 shadow-sm">
              Shop Collection
            </a>
            <a href="#features" class="inline-flex justify-center items-center px-8 py-3.5 border-2 border-[var(--color-border)] text-base font-medium rounded-full text-[var(--color-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-300 bg-transparent">
              Learn More
            </a>
          </div>
          
          <!-- Trust Indicators -->
          <div class="mt-10 pt-10 border-t border-[var(--color-border)]/50 flex flex-wrap justify-center lg:justify-start gap-8 sm:gap-12">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-sm font-medium text-[var(--color-secondary)]">100% Organic</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-sm font-medium text-[var(--color-secondary)]">Safe Delivery</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-sm font-medium text-[var(--color-secondary)]">Expert Care</span>
            </div>
          </div>
        </div>
        
        <!-- Image Content -->
        <div class="lg:col-span-6 mt-16 lg:mt-0 relative z-0">
          <!-- Decorative background blob/shape -->
          <div class="absolute inset-0 bg-[var(--color-primary)] opacity-10 rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>
          
          <div class="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] sm:aspect-square lg:aspect-[4/5] group">
            <img 
              src="https://images.unsplash.com/photo-1604762524889-3e2fcc145683?q=80&w=1000&auto=format&fit=crop" 
              alt="Beautiful Monstera Deliciosa plant in a modern terracotta pot" 
              class="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            
            <!-- Floating Featured Badge -->
            <div class="absolute bottom-6 left-6 right-6 sm:right-auto bg-[var(--color-surface)]/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-[var(--color-border)]/50 flex items-center gap-4 transition-transform duration-300 hover:-translate-y-1">
              <div class="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-bold text-[var(--color-secondary)]">Featured Plant</p>
                <p class="text-xs text-[var(--color-text-muted)]">Monstera Deliciosa</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  container.appendChild(heroSection);
}