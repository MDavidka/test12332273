import { createElement } from '../utils';
import { ProductCard } from './productCard';
import type { Product } from '../types';

export function Catalog(): HTMLElement {
  // Create the main section container
  const section = createElement('section', 'py-16 md:py-24 bg-[var(--color-bg)]');
  section.id = 'katalogus';

  // Create the inner layout container
  const container = createElement('div', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8');
  
  // Create the header section
  const headerWrapper = createElement('div', 'text-center max-w-3xl mx-auto mb-12 md:mb-16');
  headerWrapper.innerHTML = `
    <h2 class="text-sm font-bold tracking-wider text-[var(--color-accent)] uppercase mb-3">Kínálatunk</h2>
    <h3 class="text-3xl md:text-4xl font-heading font-bold text-[var(--color-text)] mb-6">Gyönyörű virágcsokrok minden alkalomra</h3>
    <div class="w-24 h-1 bg-[var(--color-primary)] mx-auto rounded-full opacity-80 mb-6"></div>
    <p class="text-lg text-[var(--color-muted)]">
      Válogasson gondosan összeállított, friss virágcsokraink közül. Legyen szó születésnapról, évfordulóról vagy csak egy kedves gesztusról, nálunk megtalálja a tökéletes ajándékot.
    </p>
  `;

  // Create the grid for products
  const grid = createElement('div', 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8');

  // Mock data for the catalog (in a real app, this would come from an API or store)
  const products: any[] = [
    {
      id: 'p1',
      name: 'Vörös Bársony',
      description: 'Klasszikus vörös rózsacsokor, a végtelen szerelem szimbóluma. Tökéletes választás évfordulóra vagy Valentin-napra.',
      price: 15990,
      imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=800&q=80',
      category: 'Rózsa'
    },
    {
      id: 'p2',
      name: 'Tavaszi Szellő',
      description: 'Vidám, színes tulipánokból álló csokor, amely elhozza a tavasz frissességét bármelyik otthonba.',
      price: 12500,
      imageUrl: 'https://images.unsplash.com/photo-1520764801111-15ca5696178f?auto=format&fit=crop&w=800&q=80',
      category: 'Tulipán'
    },
    {
      id: 'p3',
      name: 'Pasztell Álom',
      description: 'Lágy pasztell színekben pompázó bazsarózsa és liziantusz kompozíció, elegáns és kifinomult.',
      price: 18900,
      imageUrl: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80',
      category: 'Vegyes csokor'
    },
    {
      id: 'p4',
      name: 'Napsugár',
      description: 'Ragyogó napraforgók, amelyek azonnal mosolyt csalnak az arcra. Ideális szülinapra vagy névnapra.',
      price: 11900,
      imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55ef6?auto=format&fit=crop&w=800&q=80',
      category: 'Napraforgó'
    },
    {
      id: 'p5',
      name: 'Hófehér Elegancia',
      description: 'Letisztult, hófehér liliomok zöld kiegészítőkkel. Ünnepélyes alkalmakra és megemlékezésekre is méltó.',
      price: 14500,
      imageUrl: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80',
      category: 'Liliom'
    },
    {
      id: 'p6',
      name: 'Mezei Románc',
      description: 'Vadvirágokat idéző, laza kötésű csokor kamillával, levendulával és apró rózsákkal. Természetközeli és bájos.',
      price: 13200,
      imageUrl: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80',
      category: 'Mezei virág'
    }
  ];

  // Render each product card and append to the grid
  products.forEach(product => {
    // We pass the product object to the ProductCard component
    const card = ProductCard(product as Product);
    grid.appendChild(card);
  });

  // Assemble the DOM structure
  container.appendChild(headerWrapper);
  container.appendChild(grid);
  section.appendChild(container);

  return section;
}