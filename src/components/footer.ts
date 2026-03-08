import { ComponentProps } from '../types';

export function Footer(props: ComponentProps = {}): HTMLElement {
  const footer = document.createElement('footer');
  
  // Apply base classes for a dark, grounded footer using the primary brand color
  footer.className = `bg-[var(--color-primary)] text-white pt-16 pb-8 ${props.className || ''}`.trim();

  const currentYear = new Date().getFullYear();

  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
        
        <!-- Brand & Description -->
        <div class="md:col-span-5">
          <a href="#" class="inline-flex items-center gap-2 text-2xl font-heading font-bold mb-4 hover:opacity-90 transition-opacity">
            <svg class="w-8 h-8 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            <span>PlantHaven</span>
          </a>
          <p class="text-white/80 max-w-md leading-relaxed mb-6">
            Hozzuk el a természetet az otthonába. Különleges szobanövények, minőségi kiegészítők és szakértő tanácsadás a város szívében. Látogasson el hozzánk, és találja meg új zöld kedvencét!
          </p>
        </div>

        <!-- Quick Links -->
        <div class="md:col-span-3 md:col-start-7">
          <h4 class="text-lg font-heading font-semibold mb-5 text-white">Gyorslinkek</h4>
          <ul class="space-y-3">
            <li>
              <a href="#home" class="text-white/80 hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] opacity-0 transition-opacity"></span>
                Kezdőlap
              </a>
            </li>
            <li>
              <a href="#gallery" class="text-white/80 hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] opacity-0 transition-opacity"></span>
                Kínálatunk
              </a>
            </li>
            <li>
              <a href="#about" class="text-white/80 hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] opacity-0 transition-opacity"></span>
                Rólunk
              </a>
            </li>
            <li>
              <a href="#contact" class="text-white/80 hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] opacity-0 transition-opacity"></span>
                Kapcsolat
              </a>
            </li>
          </ul>
        </div>

        <!-- Social Media -->
        <div class="md:col-span-3">
          <h4 class="text-lg font-heading font-semibold mb-5 text-white">Kövess minket</h4>
          <p class="text-white/80 mb-4 text-sm">
            Inspirációkért, újdonságokért és növényápolási tippekért csatlakozz közösségünkhöz!
          </p>
          <div class="flex gap-3">
            <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[var(--color-accent)] hover:-translate-y-1 transition-all duration-300" aria-label="Facebook">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[var(--color-accent)] hover:-translate-y-1 transition-all duration-300" aria-label="Instagram">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-white/60 text-sm text-center md:text-left">
          &copy; ${currentYear} PlantHaven. Minden jog fenntartva.
        </p>
        <div class="flex gap-6 text-sm text-white/60">
          <a href="#" class="hover:text-white transition-colors">Adatvédelmi tájékoztató</a>
          <a href="#" class="hover:text-white transition-colors">ÁSZF</a>
        </div>
      </div>
    </div>
  `;

  // Add a small interaction script for the quick links to show the dot on hover
  const links = footer.querySelectorAll('ul a');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const dot = link.querySelector('span');
      if (dot) dot.classList.remove('opacity-0');
    });
    link.addEventListener('mouseleave', () => {
      const dot = link.querySelector('span');
      if (dot) dot.classList.add('opacity-0');
    });
  });

  return footer;
}