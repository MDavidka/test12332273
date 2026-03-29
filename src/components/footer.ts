import { siteConfig, navItems } from '../utils';

export function renderFooter(container: HTMLElement): void {
  const currentYear = new Date().getFullYear();

  // Generate Quick Links from navItems
  const quickLinksHTML = navItems.map(item => `
    <li>
      <a href="${item.href}" class="text-secondary hover:text-white transition-colors duration-300 text-sm font-body flex items-center gap-2 group">
        <span class="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        ${item.label}
      </a>
    </li>
  `).join('');

  const footerHTML = `
    <footer class="bg-primary pt-16 pb-8 relative overflow-hidden" id="footer">
      <!-- Decorative Background Elements -->
      <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent"></div>
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute top-12 -left-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <!-- Brand & About -->
          <div class="lg:pr-8">
            <a href="#" class="inline-flex items-center gap-2 mb-6 group">
              <svg class="w-8 h-8 text-secondary group-hover:text-accent transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span class="font-heading font-bold text-2xl text-white tracking-tight">
                ${siteConfig.storeName}
              </span>
            </a>
            <p class="text-secondary font-body text-sm leading-relaxed mb-6">
              ${siteConfig.tagline} We are dedicated to helping you build your indoor jungle with healthy, beautiful plants and expert advice.
            </p>
            <!-- Social Icons -->
            <div class="flex items-center gap-4">
              <a href="#" class="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-secondary hover:bg-accent hover:text-white transition-all duration-300" aria-label="Instagram">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
                </svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-secondary hover:bg-accent hover:text-white transition-all duration-300" aria-label="Facebook">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="font-heading text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul class="space-y-4">
              ${quickLinksHTML}
              <li>
                <a href="#" class="text-secondary hover:text-white transition-colors duration-300 text-sm font-body flex items-center gap-2 group">
                  <span class="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" class="text-secondary hover:text-white transition-colors duration-300 text-sm font-body flex items-center gap-2 group">
                  <span class="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact & Location -->
          <div>
            <h3 class="font-heading text-lg font-bold text-white mb-6">Visit Us</h3>
            <ul class="space-y-4 text-sm font-body text-secondary">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>
                  123 Botanical Way<br />
                  Green District<br />
                  Portland, OR 97204
                </span>
              </li>
              <li class="flex items-center gap-3">
                <svg class="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a href="mailto:hello@${siteConfig.storeName.toLowerCase().replace(/\s+/g, '')}.com" class="hover:text-white transition-colors duration-300">
                  hello@${siteConfig.storeName.toLowerCase().replace(/\s+/g, '')}.com
                </a>
              </li>
              <li class="flex items-center gap-3">
                <svg class="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <a href="tel:+15551234567" class="hover:text-white transition-colors duration-300">
                  (555) 123-4567
                </a>
              </li>
            </ul>
          </div>

          <!-- Store Hours -->
          <div>
            <h3 class="font-heading text-lg font-bold text-white mb-6">Store Hours</h3>
            <ul class="space-y-3 text-sm font-body text-secondary">
              <li class="flex justify-between items-center pb-2 border-b border-primary-light/50">
                <span>Monday - Friday</span>
                <span class="text-white font-medium">10:00 AM - 7:00 PM</span>
              </li>
              <li class="flex justify-between items-center pb-2 border-b border-primary-light/50">
                <span>Saturday</span>
                <span class="text-white font-medium">9:00 AM - 6:00 PM</span>
              </li>
              <li class="flex justify-between items-center pb-2 border-b border-primary-light/50">
                <span>Sunday</span>
                <span class="text-white font-medium">10:00 AM - 5:00 PM</span>
              </li>
            </ul>
            <div class="mt-6 p-4 bg-primary-light/30 rounded-lg border border-primary-light/50 flex items-start gap-3">
              <svg class="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-xs text-secondary leading-relaxed">
                Holiday hours may vary. Please check our social media for the most up-to-date information.
              </p>
            </div>
          </div>

        </div>

        <!-- Bottom Bar -->
        <div class="pt-8 border-t border-primary-light/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-secondary text-sm font-body text-center md:text-left">
            &copy; ${currentYear} ${siteConfig.storeName}. All rights reserved.
          </p>
          <div class="flex items-center gap-6 text-sm font-body text-secondary">
            <a href="#" class="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" class="hover:text-white transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  container.innerHTML = footerHTML;
}