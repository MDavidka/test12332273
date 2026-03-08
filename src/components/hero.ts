export function Hero(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'hero';
  section.className = 'relative bg-[var(--color-bg)] overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32';

  section.innerHTML = `
    <!-- Decorative background elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-[var(--color-primary)] opacity-5 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 -left-24 w-72 h-72 bg-[var(--color-accent)] opacity-5 rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        <!-- Text Content -->
        <div class="max-w-2xl">
          <span class="inline-block py-1 px-3 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-semibold tracking-wider uppercase text-xs mb-6 border border-[var(--color-accent)]/20">
            Prémium Virágküldés
          </span>
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-[var(--color-text)] leading-tight mb-6">
            Friss virágok,<br/>
            <span class="text-[var(--color-primary)] italic">egyenesen a szívhez</span>
          </h1>
          
          <p class="text-lg sm:text-xl text-[var(--color-muted)] mb-8 leading-relaxed font-body max-w-lg">
            Kézzel kötött, friss csokrok és elegáns asztaldíszek minden alkalomra. 
            Lepje meg szeretteit, mi pedig gondoskodunk a gyors és pontos kiszállításról.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <a href="#catalog" class="btn-primary inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Kínálatunk
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
            <a href="#how-it-works" class="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-[var(--color-text)] bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] rounded-full transition-all duration-300 shadow-sm hover:shadow-md">
              Hogyan működik?
            </a>
          </div>
          
          <!-- Trust indicators -->
          <div class="mt-10 pt-8 border-t border-[var(--color-border)] flex items-center gap-6">
            <div class="flex -space-x-3">
              <img class="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Vásárló">
              <img class="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Vásárló">
              <img class="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Vásárló">
              <div class="w-10 h-10 rounded-full border-2 border-white bg-[var(--color-bg)] flex items-center justify-center text-xs font-bold text-[var(--color-primary)]">
                +2k
              </div>
            </div>
            <div class="text-sm text-[var(--color-muted)]">
              <div class="flex text-yellow-400 mb-1">
                ${Array(5).fill('<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>').join('')}
              </div>
              Boldog vásárló
            </div>
          </div>
        </div>
        
        <!-- Image Content -->
        <div class="relative lg:ml-auto w-full max-w-lg mx-auto mt-12 lg:mt-0">
          <!-- Decorative background blob/shape -->
          <div class="absolute -inset-4 bg-[var(--color-accent)] opacity-20 rounded-[3rem] rotate-6 scale-105 transition-transform duration-700"></div>
          
          <div class="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] transform transition-transform duration-700 hover:scale-[1.02] group border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Gyönyörű friss virágcsokor" 
              class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              loading="eager"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
            
            <!-- Floating badge -->
            <div class="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg flex items-center gap-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div class="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] flex-shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-bold text-[var(--color-text)] font-heading">100% Frissesség</p>
                <p class="text-xs text-[var(--color-muted)]">Garantált minőség minden csokorban</p>
              </div>
            </div>
          </div>
          
          <!-- Small floating element -->
          <div class="absolute -top-6 -right-6 bg-white p-3 rounded-2xl shadow-xl border border-[var(--color-border)] animate-bounce" style="animation-duration: 3s;">
            <span class="text-2xl">🌸</span>
          </div>
        </div>

      </div>
    </div>
  `;

  // Add smooth scrolling for anchor links within the hero section
  const links = section.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          // Account for fixed header height (approx 80px)
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  return section;
}