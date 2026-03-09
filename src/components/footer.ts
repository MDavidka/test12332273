import { isValidEmail } from '../utils';

/**
 * Renders the site footer containing legal links, navigation, and a newsletter signup.
 * 
 * @param container - The DOM element to append the footer to.
 */
export function renderFooter(container: HTMLElement): void {
  const footer = document.createElement('footer');
  // Using a dark theme for the footer to match the premium tech aesthetic
  footer.className = 'bg-gray-950 border-t border-gray-800 pt-16 pb-8 text-sm mt-auto';

  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-12">
        
        <!-- Brand & Newsletter Section -->
        <div class="md:col-span-12 lg:col-span-4">
          <a href="/" class="text-2xl font-bold text-white tracking-tight mb-4 block">
            NEXUS<span class="text-blue-500">.</span>
          </a>
          <p class="text-gray-400 mb-6 leading-relaxed max-w-md">
            Experience the future of mobile technology. Premium design, unparalleled performance, and innovative features crafted for tomorrow.
          </p>
          
          <form id="newsletter-form" class="flex flex-col sm:flex-row gap-3 max-w-md">
            <div class="relative flex-grow">
              <label for="newsletter-email" class="sr-only">Email address</label>
              <input 
                type="email" 
                id="newsletter-email" 
                placeholder="Enter your email" 
                class="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-gray-500"
                required
              >
            </div>
            <button 
              type="submit" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Subscribe
            </button>
          </form>
          <p id="newsletter-message" class="mt-2 text-sm hidden transition-opacity duration-300"></p>
        </div>

        <!-- Spacer for large screens -->
        <div class="hidden lg:block lg:col-span-2"></div>

        <!-- Navigation Links: Products -->
        <div class="md:col-span-4 lg:col-span-2">
          <h3 class="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Products</h3>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Nexus Pro Max</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Nexus Pro</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Nexus Standard</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Accessories</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Compare Models</a></li>
          </ul>
        </div>

        <!-- Navigation Links: Support -->
        <div class="md:col-span-4 lg:col-span-2">
          <h3 class="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Support</h3>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Repair Service</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Warranty Info</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Order Status</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <!-- Navigation Links: Company -->
        <div class="md:col-span-4 lg:col-span-2">
          <h3 class="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Company</h3>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Newsroom</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Environment</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar: Copyright & Socials -->
      <div class="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-gray-500 text-center md:text-left">
          &copy; ${new Date().getFullYear()} Nexus Mobile Inc. All rights reserved.
        </p>
        
        <div class="flex space-x-6">
          <a href="#" class="text-gray-500 hover:text-white transition-colors">
            <span class="sr-only">Twitter</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" class="text-gray-500 hover:text-white transition-colors">
            <span class="sr-only">Instagram</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  `;

  // Attach event listener for the newsletter form
  const form = footer.querySelector('#newsletter-form') as HTMLFormElement;
  const emailInput = footer.querySelector('#newsletter-email') as HTMLInputElement;
  const messageEl = footer.querySelector('#newsletter-message') as HTMLParagraphElement;

  if (form && emailInput && messageEl) {
    form.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      
      // Reset message state
      messageEl.classList.remove('hidden', 'text-red-400', 'text-green-400');
      
      if (!isValidEmail(email)) {
        messageEl.textContent = 'Please enter a valid email address.';
        messageEl.classList.add('text-red-400');
        return;
      }

      // Simulate API call for subscription
      const btn = form.querySelector('button');
      if (btn) {
        const originalText = btn.textContent || 'Subscribe';
        btn.textContent = 'Subscribing...';
        btn.disabled = true;
        btn.classList.add('opacity-70', 'cursor-not-allowed');

        setTimeout(() => {
          messageEl.textContent = 'Thanks for subscribing! Check your inbox soon.';
          messageEl.classList.add('text-green-400');
          emailInput.value = '';
          
          // Restore button state
          btn.textContent = originalText;
          btn.disabled = false;
          btn.classList.remove('opacity-70', 'cursor-not-allowed');
          
          // Hide success message after 4 seconds
          setTimeout(() => {
            messageEl.classList.add('hidden');
          }, 4000);
        }, 1200);
      }
    });
  }

  container.appendChild(footer);
}