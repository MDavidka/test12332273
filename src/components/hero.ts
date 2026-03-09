import { cn } from '../utils';

/**
 * Renders the high-impact Hero section for the flagship phone.
 * Features a premium dark-mode aesthetic, large typography, and primary CTAs.
 * 
 * @param container - The DOM element where the hero section will be mounted.
 */
export function renderHero(container: HTMLElement): void {
  const heroSection = document.createElement('section');
  
  // Using a dark theme specifically for the hero to give it a premium, cinematic feel
  heroSection.className = cn(
    'relative w-full overflow-hidden flex flex-col items-center justify-center pt-32 pb-16',
    'bg-gray-900 text-white'
  );

  heroSection.innerHTML = `
    <!-- Background Glow Effects -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] opacity-30 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-b from-indigo-500 to-transparent blur-[120px] rounded-full"></div>
    </div>

    <!-- Content Container -->
    <div class="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto animate-fade-in-up">
      <span class="text-indigo-400 font-semibold tracking-widest uppercase text-xs sm:text-sm mb-4 drop-shadow-md">
        Introducing the future
      </span>
      
      <h1 class="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter mb-6 text-white">
        Aura <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">X1 Pro</span>
      </h1>
      
      <p class="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl font-light leading-relaxed">
        Aerospace-grade titanium design. The most advanced computational camera system ever. Powered by a groundbreaking new processor.
      </p>
      
      <!-- Call to Actions -->
      <div class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <button id="hero-buy-btn" class="btn-primary w-full sm:w-auto px-8 py-4 text-lg rounded-full shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-0.5 border border-transparent">
          Pre-order Now
        </button>
        <button id="hero-learn-btn" class="btn-outline w-full sm:w-auto px-8 py-4 text-lg rounded-full border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-white hover:border-gray-400 transition-all">
          Watch the Film
        </button>
      </div>
    </div>

    <!-- Product Image Showcase -->
    <div class="relative z-10 w-full max-w-6xl mx-auto mt-16 px-4 sm:px-6">
      <div class="relative rounded-t-[2.5rem] sm:rounded-t-[3rem] overflow-hidden shadow-2xl border border-gray-800/60 bg-gray-800/30 backdrop-blur-sm transform transition-transform duration-1000 hover:scale-[1.01]">
        <!-- High-quality Unsplash placeholder for a sleek smartphone -->
        <img 
          src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=2070&auto=format&fit=crop" 
          alt="Aura X1 Pro Smartphone" 
          class="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
          style="max-height: 650px; object-position: center 30%;"
        />
        
        <!-- Bottom gradient fade to blend seamlessly into the next section -->
        <div class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent pointer-events-none"></div>
      </div>
    </div>
  `;

  // Attach interactive event listeners
  const buyBtn = heroSection.querySelector('#hero-buy-btn');
  const learnBtn = heroSection.querySelector('#hero-learn-btn');

  buyBtn?.addEventListener('click', () => {
    // In a fully integrated app, this would trigger the Cart Modal or navigate to a checkout flow
    alert('Aura X1 Pro has been added to your pre-order list!');
  });

  learnBtn?.addEventListener('click', () => {
    // Smooth scroll to the specifications/features section if it exists
    const specsSection = document.getElementById('features-section');
    if (specsSection) {
      specsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback if section isn't rendered yet
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    }
  });

  // Mount the component
  container.appendChild(heroSection);
}