export function renderFooter(container: HTMLElement): void {
  const footer = document.createElement('footer');
  // Using a dark earthy tone for the footer background, assuming secondary is Forest Green
  footer.className = 'bg-stone-900 text-stone-300 pt-16 pb-8 border-t border-stone-800';

  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        <!-- Brand & About -->
        <div class="space-y-4">
          <h3 class="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
            Verdant
          </h3>
          <p class="text-sm leading-relaxed text-stone-400">
            Bringing nature indoors. We provide high-quality, sustainably sourced plants to help you create your perfect green sanctuary.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-emerald-400 transition-colors duration-200">Shop All Plants</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition-colors duration-200">Care Guides</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition-colors duration-200">Our Story</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition-colors duration-200">Journal & Tips</a></li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">Customer Service</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-emerald-400 transition-colors duration-200">Shipping & Returns</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition-colors duration-200">FAQ</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition-colors duration-200">Contact Us</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition-colors duration-200">Track Order</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">Join Our Newsletter</h4>
          <p class="text-sm text-stone-400 mb-4">
            Get 10% off your first order and weekly plant care tips.
          </p>
          <form id="newsletter-form" class="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              required
              class="bg-stone-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-stone-700 w-full"
            />
            <button 
              type="submit" 
              class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors duration-200 font-medium whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p id="newsletter-message" class="text-xs text-emerald-400 mt-2 hidden">Thanks for subscribing!</p>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-stone-500">
          &copy; ${new Date().getFullYear()} Verdant Plant Shop. All rights reserved.
        </p>
        
        <!-- Social Icons -->
        <div class="flex space-x-4">
          <a href="#" class="text-stone-400 hover:text-white transition-colors" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="#" class="text-stone-400 hover:text-white transition-colors" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" class="text-stone-400 hover:text-white transition-colors" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </a>
        </div>
      </div>
    </div>
  `;

  container.appendChild(footer);

  // Add simple interactivity for the newsletter form
  const form = footer.querySelector('#newsletter-form') as HTMLFormElement;
  const message = footer.querySelector('#newsletter-message') as HTMLParagraphElement;

  if (form && message) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
      
      if (emailInput && emailInput.value) {
        // Simulate successful subscription
        form.reset();
        message.classList.remove('hidden');
        
        // Hide message after 3 seconds
        setTimeout(() => {
          message.classList.add('hidden');
        }, 3000);
      }
    });
  }
}