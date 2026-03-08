export function Hero(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'hero';
  // Using a minimum height of 85vh to ensure it takes up most of the screen but hints at content below
  section.className = 'relative flex items-center justify-center min-h-[85vh] overflow-hidden bg-[var(--color-bg)]';

  section.innerHTML = `
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=1920&q=80" 
        alt="Gyönyörű szobanövények egy világos üzletben" 
        class="w-full h-full object-cover object-center"
      />
      <!-- Gradient overlay: dark at the top for text readability, fading into the background color at the bottom -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[var(--color-bg)]"></div>
    </div>

    <!-- Hero Content -->
    <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-16 pb-12">
      <span class="block text-[var(--color-accent)] font-semibold tracking-wider uppercase mb-4 text-sm md:text-base drop-shadow-md">
        Városi Dzsungel
      </span>
      
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight drop-shadow-lg">
        Hozd el a természetet <br class="hidden sm:block" />
        <span class="text-[var(--color-surface)]">az otthonodba</span>
      </h1>
      
      <p class="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-body font-light drop-shadow">
        Különleges szobanövények, stílusos kiegészítők és szakértő ápolási tanácsadás egy helyen. Látogass el hozzánk, és találd meg új zöld barátodat!
      </p>
      
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="#gallery" class="btn-primary text-base sm:text-lg px-8 py-3.5 w-full sm:w-auto shadow-lg shadow-[var(--color-primary)]/30">
          Kínálatunk
        </a>
        <a href="#contact" class="btn-secondary bg-white/10 text-white border-white hover:bg-white hover:text-[var(--color-primary)] text-base sm:text-lg px-8 py-3.5 w-full sm:w-auto backdrop-blur-sm">
          Hol vagyunk?
        </a>
      </div>
    </div>
  `;

  // Add smooth scrolling behavior for the CTA buttons
  const links = section.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          // Offset for fixed header if one exists
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
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