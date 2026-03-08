export function Footer(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'bg-[var(--color-surface)] border-t border-[var(--color-border)] pt-16 pb-8 mt-auto';

  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        <!-- Brand & About -->
        <div class="space-y-4">
          <a href="#" class="inline-block">
            <h2 class="text-2xl font-heading font-bold text-[var(--color-primary)] tracking-tight">
              VirágNeked
            </h2>
          </a>
          <p class="text-[var(--color-muted)] text-sm leading-relaxed">
            Friss, kézzel kötött virágcsokrok és ajándékok kiszállítása az ország egész területén. Varázsoljon mosolyt szerettei arcára minden alkalommal!
          </p>
          <div class="flex space-x-4 pt-2">
            <!-- Facebook -->
            <a href="#" class="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors" aria-label="Facebook">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
              </svg>
            </a>
            <!-- Instagram -->
            <a href="#" class="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors" aria-label="Instagram">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
              </svg>
            </a>
            <!-- Pinterest -->
            <a href="#" class="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors" aria-label="Pinterest">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-semibold text-[var(--color-text)] tracking-wider uppercase mb-4">
            Vásárlás
          </h3>
          <ul class="space-y-3">
            <li><a href="#katalogus" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">Összes virágcsokor</a></li>
            <li><a href="#alkalmak" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">Születésnap & Névnap</a></li>
            <li><a href="#eskuvo" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">Esküvői dekoráció</a></li>
            <li><a href="#reszvet" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">Részvét & Megemlékezés</a></li>
            <li><a href="#kiegeszitok" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">Ajándékok & Kiegészítők</a></li>
          </ul>
        </div>

        <!-- Information -->
        <div>
          <h3 class="text-sm font-semibold text-[var(--color-text)] tracking-wider uppercase mb-4">
            Információk
          </h3>
          <ul class="space-y-3">
            <li><a href="#szallitas" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">Szállítás és Fizetés</a></li>
            <li><a href="#gyik" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">Gyakori Kérdések (GyIK)</a></li>
            <li><a href="#rolunk" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">Rólunk</a></li>
            <li><a href="#kapcsolat" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">Kapcsolat</a></li>
            <li><a href="#blog" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">Virágápolási Blog</a></li>
          </ul>
        </div>

        <!-- Contact & Newsletter -->
        <div>
          <h3 class="text-sm font-semibold text-[var(--color-text)] tracking-wider uppercase mb-4">
            Ügyfélszolgálat
          </h3>
          <ul class="space-y-3 mb-6">
            <li class="flex items-start text-sm text-[var(--color-muted)]">
              <svg class="w-5 h-5 mr-2 text-[var(--color-primary)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+36301234567" class="hover:text-[var(--color-primary)] transition-colors">+36 30 123 4567</a>
            </li>
            <li class="flex items-start text-sm text-[var(--color-muted)]">
              <svg class="w-5 h-5 mr-2 text-[var(--color-primary)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:info@viragneked.hu" class="hover:text-[var(--color-primary)] transition-colors">info@viragneked.hu</a>
            </li>
            <li class="flex items-start text-sm text-[var(--color-muted)]">
              <svg class="w-5 h-5 mr-2 text-[var(--color-primary)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>1051 Budapest,<br>Virág utca 1.</span>
            </li>
          </ul>

          <form id="newsletter-form" class="mt-4">
            <label for="newsletter-email" class="sr-only">Iratkozzon fel hírlevelünkre</label>
            <div class="flex rounded-[var(--radius-md)] shadow-sm">
              <input 
                type="email" 
                id="newsletter-email" 
                name="email" 
                required
                placeholder="Az Ön e-mail címe" 
                class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-[var(--radius-md)] border border-[var(--color-border)] text-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-bg)] text-[var(--color-text)]"
              >
              <button 
                type="submit" 
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-[var(--radius-md)] text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] transition-colors"
              >
                Feliratkozás
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-[var(--color-muted)]">
          &copy; ${new Date().getFullYear()} VirágNeked. Minden jog fenntartva.
        </p>
        <div class="flex space-x-6">
          <a href="#aszf" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
            Általános Szerződési Feltételek
          </a>
          <a href="#adatvedelem" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
            Adatvédelmi Tájékoztató
          </a>
        </div>
      </div>
    </div>
  `;

  // Prevent default form submission for the newsletter
  const form = footer.querySelector('#newsletter-form') as HTMLFormElement;
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('#newsletter-email') as HTMLInputElement;
      if (emailInput && emailInput.value) {
        // In a real app, this would send the email to an API
        alert(`Köszönjük a feliratkozást: ${emailInput.value}`);
        emailInput.value = '';
      }
    });
  }

  return footer;
}