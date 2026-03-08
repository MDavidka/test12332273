import { siteConfig } from '../utils';

/**
 * Renders the footer section of the website.
 * Contains brand information, quick links, social media icons, and copyright notice.
 * 
 * @param container The DOM element to append the footer to.
 */
export function renderFooter(container: HTMLElement): void {
  // Create the footer element
  const footer = document.createElement('footer');
  // Apply background color and top border using design tokens
  footer.className = 'bg-surface border-t border-border pt-16 pb-8 mt-auto transition-colors duration-300';

  // Get current year for the copyright notice
  const currentYear = new Date().getFullYear();

  // Set the inner HTML structure
  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Main Footer Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-12">
        
        <!-- Brand & Description Column (Takes up more space on large screens) -->
        <div class="md:col-span-12 lg:col-span-5 flex flex-col items-start">
          <a href="#" class="flex items-center gap-2 group mb-4">
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span class="text-2xl font-heading font-bold text-text tracking-tight">
              ${siteConfig.title}
            </span>
          </a>
          <p class="text-text-muted leading-relaxed max-w-md">
            ${siteConfig.description} Célunk, hogy közelebb hozzuk a természet szépségét a mindennapokhoz, és segítsünk a tökéletes növényi környezet kialakításában.
          </p>
          
          <!-- Social Media Icons -->
          <div class="flex items-center gap-4 mt-6">
            <a href="#" class="w-10 h-10 rounded-full bg-bg flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-all duration-300" aria-label="Facebook">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-bg flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-all duration-300" aria-label="Instagram">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links Column -->
        <div class="md:col-span-4 lg:col-span-3">
          <h3 class="text-sm font-bold text-text uppercase tracking-wider mb-4">Gyorslinkek</h3>
          <ul class="space-y-3">
            <li>
              <a href="#home" class="text-text-muted hover:text-primary transition-colors duration-200 inline-flex items-center">
                <span class="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 opacity-0 -ml-3 transition-all duration-200"></span>
                Kezdőlap
              </a>
            </li>
            <li>
              <a href="#catalog" class="text-text-muted hover:text-primary transition-colors duration-200 inline-flex items-center">
                <span class="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 opacity-0 -ml-3 transition-all duration-200"></span>
                Katalógus
              </a>
            </li>
            <li>
              <a href="#care" class="text-text-muted hover:text-primary transition-colors duration-200 inline-flex items-center">
                <span class="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 opacity-0 -ml-3 transition-all duration-200"></span>
                Gondozási Tippek
              </a>
            </li>
            <li>
              <a href="#about" class="text-text-muted hover:text-primary transition-colors duration-200 inline-flex items-center">
                <span class="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 opacity-0 -ml-3 transition-all duration-200"></span>
                Rólunk
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact / Newsletter Column -->
        <div class="md:col-span-8 lg:col-span-4">
          <h3 class="text-sm font-bold text-text uppercase tracking-wider mb-4">Hírlevél</h3>
          <p class="text-text-muted text-sm mb-4">
            Iratkozz fel, hogy elsőként értesülj az új növényekről és a szezonális gondozási tippekről!
          </p>
          <form class="flex flex-col sm:flex-row gap-2" onsubmit="event.preventDefault();">
            <input 
              type="email" 
              placeholder="E-mail címed" 
              class="flex-grow px-4 py-2.5 rounded-lg bg-bg border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
              required
            />
            <button 
              type="submit" 
              class="px-6 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover transition-colors duration-200 shadow-sm"
            >
              Feliratkozás
            </button>
          </form>
        </div>
      </div>

      <!-- Bottom Bar: Copyright & Legal -->
      <div class="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-text-muted text-center md:text-left">
          &copy; ${currentYear} ${siteConfig.title}. Minden jog fenntartva.
        </p>
        <div class="flex gap-6 text-sm text-text-muted">
          <a href="#" class="hover:text-primary transition-colors duration-200">Adatvédelmi nyilatkozat</a>
          <a href="#" class="hover:text-primary transition-colors duration-200">Általános Szerződési Feltételek</a>
        </div>
      </div>
      
    </div>
  `;

  // Add a small script to handle the hover effect on links (showing the dot)
  // This is done via CSS in a real app, but we can add a quick inline style block for the specific hover effect
  const style = document.createElement('style');
  style.textContent = `
    footer ul li a:hover span {
      opacity: 1;
      margin-left: 0;
    }
  `;
  footer.appendChild(style);

  // Append the constructed footer to the provided container
  container.appendChild(footer);
}