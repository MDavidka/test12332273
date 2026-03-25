/**
 * Renders the global footer component.
 * Contains categorized navigation links, newsletter signup, social icons, and legal information.
 * 
 * @param container The DOM element to mount the footer into.
 */
export function renderFooter(container: HTMLElement): void {
  const currentYear = new Date().getFullYear();

  const footerHTML = `
    <footer class="bg-[var(--color-surface)] border-t border-[var(--color-border)] pt-16 pb-8 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Top Section: Links & Newsletter -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          <!-- Brand & Newsletter (Spans 2 columns on large screens) -->
          <div class="lg:col-span-2">
            <a href="#" class="inline-block mb-6">
              <span class="text-2xl font-extrabold tracking-tighter text-[var(--color-text)] flex items-center gap-2">
                <svg class="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
                TechStore
              </span>
            </a>
            <p class="text-[var(--color-text-muted)] mb-6 max-w-sm text-sm leading-relaxed">
              Experience the future of mobile technology. We bring you the latest premium flagships, budget-friendly alternatives, and essential accessories.
            </p>
            
            <form id="newsletter-form" class="flex flex-col sm:flex-row gap-2 max-w-md">
              <label for="newsletter-email" class="sr-only">Email address</label>
              <input 
                type="email" 
                id="newsletter-email" 
                placeholder="Enter your email" 
                required
                class="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-text)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 outline-none transition-all"
              >
              <button 
                type="submit" 
                class="rounded-xl bg-[var(--color-text)] px-6 py-2.5 text-sm font-medium text-[var(--color-surface)] hover:bg-[var(--color-primary)] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p id="newsletter-message" class="mt-2 text-xs text-green-600 hidden">Thanks for subscribing!</p>
          </div>

          <!-- Shop Links -->
          <div>
            <h3 class="text-sm font-bold text-[var(--color-text)] uppercase tracking-wider mb-4">Shop</h3>
            <ul class="space-y-3">
              <li><a href="#new-arrivals" class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">New Arrivals</a></li>
              <li><a href="#premium" class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Premium Flagships</a></li>
              <li><a href="#budget" class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Budget Friendly</a></li>
              <li><a href="#accessories" class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Accessories</a></li>
              <li><a href="#" class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Special Offers</a></li>
            </ul>
          </div>

          <!-- Support Links -->
          <div>
            <h3 class="text-sm font-bold text-[var(--color-text)] uppercase tracking-wider mb-4">Support</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Help Center</a></li>
              <li><a href="#" class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Track Order</a></li>
              <li><a href="#" class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Shipping Info</a></li>
              <li><a href="#" class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <!-- Legal Links -->
          <div>
            <h3 class="text-sm font-bold text-[var(--color-text)] uppercase tracking-wider mb-4">Legal</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Terms of Service</a></li>
              <li><a href="#" class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Cookie Policy</a></li>
              <li><a href="#" class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Warranty Info</a></li>
            </ul>
          </div>

        </div>

        <!-- Bottom Section: Copyright & Socials -->
        <div class="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-sm text-[var(--color-text-muted)]">
            &copy; ${currentYear} TechStore Inc. All rights reserved.
          </p>
          
          <div class="flex items-center space-x-6">
            <!-- Twitter / X -->
            <a href="#" class="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
              <span class="sr-only">Twitter</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            
            <!-- Instagram -->
            <a href="#" class="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
              <span class="sr-only">Instagram</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
              </svg>
            </a>

            <!-- GitHub -->
            <a href="#" class="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
              <span class="sr-only">GitHub</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `;

  container.innerHTML = footerHTML;

  // Attach event listener for the newsletter form
  const form = container.querySelector('#newsletter-form') as HTMLFormElement;
  const message = container.querySelector('#newsletter-message') as HTMLParagraphElement;
  const emailInput = container.querySelector('#newsletter-email') as HTMLInputElement;

  if (form && message && emailInput) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = emailInput.value.trim();
      if (email) {
        // Simulate API call
        const submitBtn = form.querySelector('button');
        if (submitBtn) {
          const originalText = submitBtn.textContent;
          submitBtn.textContent = '...';
          submitBtn.disabled = true;
          
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            emailInput.value = '';
            
            // Show success message
            message.classList.remove('hidden');
            
            // Hide message after 3 seconds
            setTimeout(() => {
              message.classList.add('hidden');
            }, 3000);
          }, 800);
        }
      }
    });
  }
}