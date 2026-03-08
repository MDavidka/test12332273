import { siteConfig } from '../utils';

/**
 * Renders the hero section of the website.
 * This section introduces the main value proposition with a split layout
 * featuring text on the left and a featured image on the right.
 * 
 * @param container The DOM element to append the hero section to.
 */
export function renderHero(container: HTMLElement): void {
  // Create the main section element
  const section = document.createElement('section');
  section.id = 'home';
  // Apply background color using design tokens and ensure smooth theme transitions
  section.className = 'relative overflow-hidden bg-bg transition-colors duration-300';

  // High-quality floral image from Unsplash
  const heroImageUrl = 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=1200';

  // Set the inner HTML structure
  section.innerHTML = `
    <!-- Decorative background glow elements -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
      <div class="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
      <div class="absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full bg-secondary-dark/10 blur-3xl"></div>
    </div>

    <!-- Main Content Container -->
    <div class="section-container relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        <!-- Left Column: Text Content -->
        <div class="flex flex-col items-start space-y-8 text-left">
          
          <!-- Eyebrow Badge -->
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-secondary/50 dark:bg-secondary-dark/20 text-secondary-dark dark:text-secondary border border-secondary-dark/20 text-sm font-medium tracking-wide">
            <span class="flex h-2 w-2 rounded-full bg-secondary-dark mr-2 animate-pulse"></span>
            Tavaszi kollekció elérhető
          </div>
          
          <!-- Main Headline -->
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-text leading-tight">
            Hozd el a <br/>
            <span class="text-primary italic">természetet</span> <br/>
            az otthonodba
          </h1>
          
          <!-- Subheadline / Description -->
          <p class="text-lg sm:text-xl text-text-muted max-w-lg leading-relaxed">
            ${siteConfig.description} Ismerd meg a legkülönlegesebb növényeket, és sajátítsd el a szakszerű gondozásukhoz szükséges tudást.
          </p>
          
          <!-- Call to Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
            <a href="#catalog" class="btn-primary text-lg px-8 py-4 w-full sm:w-auto text-center">
              Katalógus megtekintése
            </a>
            <a href="#care" class="inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-text bg-surface border-2 border-border hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto text-center">
              Gondozási tippek
            </a>
          </div>
          
          <!-- Quick Stats -->
          <div class="grid grid-cols-3 gap-6 pt-8 border-t border-border w-full mt-8">
            <div>
              <p class="text-3xl font-heading font-bold text-text">50+</p>
              <p class="text-sm text-text-muted mt-1">Virágfajta</p>
            </div>
            <div>
              <p class="text-3xl font-heading font-bold text-text">100%</p>
              <p class="text-sm text-text-muted mt-1">Organikus</p>
            </div>
            <div>
              <p class="text-3xl font-heading font-bold text-text">24/7</p>
              <p class="text-sm text-text-muted mt-1">Tippek</p>
            </div>
          </div>
        </div>

        <!-- Right Column: Image Content -->
        <div class="relative lg:ml-auto w-full max-w-lg mx-auto lg:max-w-none mt-10 lg:mt-0">
          
          <!-- Image Card -->
          <div class="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] group">
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
            <img 
              src="${heroImageUrl}" 
              alt="Gyönyörű virágkompozíció" 
              class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />
            
            <!-- Floating Info Badge over Image -->
            <div class="absolute bottom-6 left-6 right-6 z-20 bg-surface/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/50 transform translate-y-0 transition-transform duration-300">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-bold text-text">A hónap virága</p>
                  <p class="text-xs text-text-muted">Fedezd fel a bazsarózsát</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Decorative dot patterns behind the image -->
          <div class="absolute -top-6 -right-6 w-24 h-24 bg-[radial-gradient(var(--color-primary)_2px,transparent_2px)] [background-size:12px_12px] opacity-20 z-0 pointer-events-none"></div>
          <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-[radial-gradient(var(--color-secondary-dark)_2px,transparent_2px)] [background-size:12px_12px] opacity-20 z-0 pointer-events-none"></div>
        </div>

      </div>
    </div>
  `;

  // Append the constructed section to the provided container
  container.appendChild(section);
}