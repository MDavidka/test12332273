/**
 * Renders the Feature Specifications section.
 * Highlights key technical details like camera, battery, processor, and display
 * using a modern, dark-themed, glassmorphism aesthetic.
 * 
 * @param container The DOM element to append the features section to.
 */
export function renderFeatureSpecs(container: HTMLElement): void {
  // Create the main section wrapper
  const section = document.createElement('section');
  section.id = 'specs';
  // Apply dark theme styling with Tailwind utility classes
  section.className = 'py-24 bg-gray-900 text-white overflow-hidden relative';

  // Add a subtle background glow effect (glassmorphism/modern tech vibe)
  const glowEffect = document.createElement('div');
  glowEffect.className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none z-0';
  section.appendChild(glowEffect);

  // Create the inner container for content
  const innerContainer = document.createElement('div');
  innerContainer.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10';

  // Define the HTML structure for the header and the features grid
  innerContainer.innerHTML = `
    <div class="text-center max-w-3xl mx-auto mb-20">
      <h2 class="text-sm font-semibold tracking-widest text-blue-400 uppercase mb-3">
        Uncompromising Power
      </h2>
      <p class="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
        Engineered for the future.
      </p>
      <p class="mt-6 text-xl text-gray-400 leading-relaxed">
        Every detail has been meticulously crafted to deliver an unparalleled experience. 
        From the pro-grade camera system to the all-day battery life.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
      
      <!-- Camera Feature -->
      <div class="flex flex-col items-center text-center p-8 rounded-3xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-md hover:bg-gray-800/60 hover:-translate-y-1 transition-all duration-300 group">
        <div class="p-4 bg-gray-900 rounded-2xl mb-6 border border-gray-700 group-hover:border-blue-500/50 transition-colors duration-300 shadow-lg">
          <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-3">Pro Camera System</h3>
        <p class="text-gray-400 leading-relaxed text-sm">
          48MP main sensor with advanced low-light performance, optical image stabilization, and 8K cinematic video recording.
        </p>
      </div>

      <!-- Battery Feature -->
      <div class="flex flex-col items-center text-center p-8 rounded-3xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-md hover:bg-gray-800/60 hover:-translate-y-1 transition-all duration-300 group">
        <div class="p-4 bg-gray-900 rounded-2xl mb-6 border border-gray-700 group-hover:border-blue-500/50 transition-colors duration-300 shadow-lg">
          <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-3">All-Day Battery</h3>
        <p class="text-gray-400 leading-relaxed text-sm">
          Up to 28 hours of continuous video playback. Fast charge to 50% in just 30 minutes with our new intelligent power management.
        </p>
      </div>

      <!-- Processor Feature -->
      <div class="flex flex-col items-center text-center p-8 rounded-3xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-md hover:bg-gray-800/60 hover:-translate-y-1 transition-all duration-300 group">
        <div class="p-4 bg-gray-900 rounded-2xl mb-6 border border-gray-700 group-hover:border-blue-500/50 transition-colors duration-300 shadow-lg">
          <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-3">Next-Gen Silicon</h3>
        <p class="text-gray-400 leading-relaxed text-sm">
          The industry-leading 3nm custom chip delivers desktop-class performance and console-level gaming right in your pocket.
        </p>
      </div>

      <!-- Display Feature -->
      <div class="flex flex-col items-center text-center p-8 rounded-3xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-md hover:bg-gray-800/60 hover:-translate-y-1 transition-all duration-300 group">
        <div class="p-4 bg-gray-900 rounded-2xl mb-6 border border-gray-700 group-hover:border-blue-500/50 transition-colors duration-300 shadow-lg">
          <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-3">Super Retina OLED</h3>
        <p class="text-gray-400 leading-relaxed text-sm">
          120Hz adaptive refresh rate with 2000 nits peak brightness for perfect outdoor visibility and buttery smooth scrolling.
        </p>
      </div>

    </div>
  `;

  // Assemble the DOM
  section.appendChild(innerContainer);
  container.appendChild(section);
}