import { siteConfig } from '../utils';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

export function renderFeatures(container: HTMLElement): void {
  const features: Feature[] = [
    {
      title: 'Expert Guidance',
      description: 'Every plant comes with a detailed care guide. Our team of botanists is always ready to answer your questions.',
      icon: `
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      `
    },
    {
      title: 'Hand-Picked Quality',
      description: 'We source directly from top-rated local greenhouses, ensuring every plant is healthy, pest-free, and ready to thrive.',
      icon: `
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
        </svg>
      `
    },
    {
      title: 'Sustainable Practices',
      description: 'From biodegradable nursery pots to eco-friendly soil mixes, we prioritize the planet in everything we do.',
      icon: `
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      `
    },
    {
      title: 'Safe & Secure Delivery',
      description: 'Our custom packaging ensures your new green friends arrive at your doorstep in pristine condition, regardless of the weather.',
      icon: `
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
        </svg>
      `
    }
  ];

  const featuresHTML = features.map(feature => `
    <div class="bg-theme rounded-2xl p-8 text-center transform hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-soft border border-subtle group">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 text-primary-light mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        ${feature.icon}
      </div>
      <h3 class="font-heading text-xl font-bold text-primary mb-3">
        ${feature.title}
      </h3>
      <p class="text-muted font-body text-sm leading-relaxed">
        ${feature.description}
      </p>
    </div>
  `).join('');

  const sectionHTML = `
    <section class="py-16 lg:py-24 bg-surface border-t border-subtle relative overflow-hidden" id="features">
      <!-- Decorative background element -->
      <div class="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="inline-block py-1 px-3 rounded-full bg-secondary/20 text-primary-light font-semibold tracking-wider uppercase text-xs mb-4 border border-secondary/30">
            The ${siteConfig.storeName} Difference
          </span>
          <h2 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Why Choose Us?
          </h2>
          <p class="text-base sm:text-lg text-muted font-body">
            We believe that bringing nature indoors should be a joyful, stress-free experience. Here is how we ensure you and your plants succeed together.
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          ${featuresHTML}
        </div>

        <!-- Call to Action Banner -->
        <div class="mt-20 bg-primary rounded-3xl overflow-hidden shadow-2xl relative">
          <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--color-secondary),_transparent_50%)]"></div>
          <div class="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between relative z-10">
            <div class="lg:w-1/2">
              <h3 class="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to start your indoor jungle?
              </h3>
              <p class="text-secondary font-body text-lg mb-8 lg:mb-0 max-w-xl">
                Join our community of plant lovers and get 10% off your first purchase when you visit us in-store.
              </p>
            </div>
            <div class="lg:w-1/2 lg:flex lg:justify-end">
              <a href="#footer" class="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-primary bg-white hover:bg-secondary hover:text-primary transition-colors duration-300 shadow-soft w-full sm:w-auto">
                Find Our Store
                <svg class="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;

  container.innerHTML = sectionHTML;
}