import { flowers } from '../utils';
import { createFlowerCard } from './flower-card';

/**
 * Renders the flower catalog section.
 * This component iterates through the flower data and displays them in a responsive grid.
 * 
 * @param container The DOM element to append the catalog section to.
 */
export function renderFlowerCatalog(container: HTMLElement): void {
  // Create the main section element
  const section = document.createElement('section');
  section.id = 'catalog';
  // Apply background color using design tokens and ensure smooth theme transitions
  section.className = 'py-16 md:py-24 bg-bg transition-colors duration-300 relative';

  // Add a subtle decorative background element
  const decor = document.createElement('div');
  decor.className = 'absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0';
  decor.innerHTML = `
    <div class="absolute top-40 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 right-10 w-80 h-80 bg-secondary-dark/5 rounded-full blur-3xl"></div>
  `;
  section.appendChild(decor);

  // Create the inner container for max-width and padding
  const innerContainer = document.createElement('div');
  innerContainer.className = 'section-container relative z-10';

  // Create the section header
  const headerDiv = document.createElement('div');
  headerDiv.className = 'text-center max-w-3xl mx-auto mb-16';
  headerDiv.innerHTML = `
    <div class="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
        <path d="M12 22c4.97-4.97 4.97-10.61 0-15.58-4.97 4.97-4.97 10.61 0 15.58z"/>
        <path d="M12 2v4"/>
        <path d="M10 4h4"/>
      </svg>
    </div>
    <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text mb-6">
      Növény Katalógus
    </h2>
    <p class="text-lg text-text-muted leading-relaxed">
      Böngéssz gondosan összeállított gyűjteményünkben. Ismerd meg a legkülönlegesebb virágokat, és találd meg a tökéletes növényt otthonodba vagy kertedbe.
    </p>
  `;

  // Create the grid container for the flower cards
  const gridDiv = document.createElement('div');
  gridDiv.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10';

  // Check if flowers array exists and has items
  if (Array.isArray(flowers) && flowers.length > 0) {
    // Iterate through the flowers array and create a card for each
    flowers.forEach(flower => {
      const cardElement = createFlowerCard(flower);
      gridDiv.appendChild(cardElement);
    });
  } else {
    // Fallback state if no flowers are found
    gridDiv.className = 'flex justify-center items-center w-full py-12';
    gridDiv.innerHTML = `
      <div class="text-center text-text-muted">
        <p class="text-lg">Jelenleg nincsenek elérhető virágok a katalógusban.</p>
      </div>
    `;
  }

  // Assemble the section
  innerContainer.appendChild(headerDiv);
  innerContainer.appendChild(gridDiv);
  section.appendChild(innerContainer);

  // Append the fully constructed section to the provided container
  container.appendChild(section);
}