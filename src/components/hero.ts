import { siteConfig } from '../utils';

export function renderHero(container: HTMLElement): void {
  const heroHTML = `
    <section class="relative bg-theme overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32" id="hero">
      <!-- Decorative background elements -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 -left-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          <!-- Text Content -->
          <div class="lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0">
            <span class="inline-block py-1 px-3 rounded-full bg-secondary/20 text-primary-light font-semibold tracking-wider uppercase text-xs mb-6 border border-secondary/30">
              Welcome to ${siteConfig.storeName}
            </span>
            
            <h1 class="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-tight mb-6">
              Breathe Life Into <br class="hidden lg:block" /> Your Space.
            </h1>
            
            <p class="text-lg sm:text-xl text-muted mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-body">
              ${siteConfig.tagline} Discover our hand-picked selection of beautiful, healthy plants ready to transform your home into a verdant sanctuary.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#catalog" class="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-light shadow-soft hover:shadow-soft-hover transition-all duration-300 transform hover:-translate-y-1">
                Shop the Collection
              </a>
              <a href="#features" class="inline-flex justify-center items-center px-8 py-4 border-2 border-primary text-base font-medium rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-300">
                Plant Care Guide
              </a>
            </div>
            
            <!-- Trust Indicators -->
            <div class="mt-12 pt-8 border-t border-subtle flex items-center justify-center lg:justify-start gap-8 sm:gap-12">
              <div class="flex flex-col items-center lg:items-start">
                <span class="font-heading font-bold text-3xl text-primary">50+</span>
                <span class="text-sm text-muted font-medium mt-1">Plant Varieties</span>
              </div>
              <div class="flex flex-col items-center lg:items-start">
                <span class="font-heading font-bold text-3xl text-primary">100%</span>
                <span class="text-sm text-muted font-medium mt-1">Healthy Delivery</span>
              </div>
              <div class="flex flex-col items-center lg:items-start">
                <span class="font-heading font-bold text-3xl text-primary">24/7</span>
                <span class="text-sm text-muted font-medium mt-1">Expert Support</span>
              </div>
            </div>
          </div>

          <!-- Image Content -->
          <div class="lg:col-span-6 relative">
            <!-- Main Image Container -->
            <div class="relative rounded-2xl overflow-hidden shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-700 ease-out group">
              <div class="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none"></div>
              <img 
                src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=1200" 
                alt="Beautiful indoor plants in a modern living space" 
                class="w-full h-[400px] sm:h-[500px] lg:h-[650px] object-cover transform group-hover:scale-105 transition-transform duration-1000"
                loading="eager"
              />
              
              <!-- Floating Badge -->
              <div class="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-surface/95 backdrop-blur-sm p-4 rounded-xl shadow-lg flex items-center gap-4 z-20 transform -translate-y-2 hover:-translate-y-4 transition-transform duration-300">
                <div class="bg-secondary/30 p-2.5 rounded-full text-primary">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-bold text-primary font-heading">Top Rated</p>
                  <p class="text-xs text-muted font-medium">Local Plant Shop</p>
                </div>
              </div>
            </div>
            
            <!-- Decorative Dots -->
            <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-[radial-gradient(var(--color-primary)_2px,transparent_2px)] [background-size:16px_16px] opacity-20 z-[-1]"></div>
          </div>

        </div>
      </div>
    </section>
  `;

  container.innerHTML = heroHTML;
}