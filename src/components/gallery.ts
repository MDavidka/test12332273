export function Gallery(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'kinalat';
  section.className = 'py-20 bg-[var(--color-bg)]';

  const categories = [
    {
      title: 'Könnyen tarthatók',
      description: 'Tökéletes választás kezdő növénybarátoknak. Kevés törődést igényelnek, mégis hálásak és gyönyörűek.',
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d40?auto=format&fit=crop&w=800&q=80',
      alt: 'Monstera növény világos szobában'
    },
    {
      title: 'Különlegességek',
      description: 'Ritka és egyedi szobanövények gyűjtőknek, és azoknak, akik valami igazán különlegesre vágynak otthonukba.',
      image: 'https://images.unsplash.com/photo-1597055905081-8b98861b3005?auto=format&fit=crop&w=800&q=80',
      alt: 'Lantlevelű fikusz'
    },
    {
      title: 'Pozsgások és Kaktuszok',
      description: 'Napfénykedvelő, szárazságtűrő apróságok, amelyek minden ablakpárkányt és íróasztalt feldobnak.',
      image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=800&q=80',
      alt: 'Különféle pozsgások és kaktuszok'
    },
    {
      title: 'Légtisztító növények',
      description: 'Természetes levegőszűrők, amelyek nemcsak esztétikusak, de egészségesebb, frissebb otthont is teremtenek.',
      image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=800&q=80',
      alt: 'Vitorlavirág elegáns kaspóban'
    },
    {
      title: 'Kaspók és Kiegészítők',
      description: 'Stílusos kerámia kaspók, fonott kosarak, makramé virágtartók és minden, ami az esztétikus megjelenéshez kell.',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
      alt: 'Különböző stílusú kaspók'
    },
    {
      title: 'Növényápolás',
      description: 'Minőségi tápoldatok, speciális földkeverékek, kártevőirtók és szerszámok a profi és gondoskodó ápoláshoz.',
      image: 'https://images.unsplash.com/photo-1416879598556-3346f5b09927?auto=format&fit=crop&w=800&q=80',
      alt: 'Növényápolási eszközök és öntözőkanna'
    }
  ];

  const cardsHtml = categories.map(category => `
    <div class="group bg-[var(--color-surface)] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-md)] transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:-translate-y-1 border border-[var(--color-border)] flex flex-col h-full">
      <div class="relative h-64 overflow-hidden">
        <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
        <img 
          src="${category.image}" 
          alt="${category.alt}" 
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div class="p-6 flex flex-col flex-grow">
        <h3 class="text-xl font-heading font-semibold text-[var(--color-text)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
          ${category.title}
        </h3>
        <p class="text-[var(--color-muted)] leading-relaxed flex-grow">
          ${category.description}
        </p>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-sm font-bold tracking-wider text-[var(--color-accent)] uppercase mb-3">Mit kínálunk?</h2>
        <h3 class="text-3xl md:text-4xl font-heading font-bold text-[var(--color-text)] mb-6">Fedezze fel kínálatunkat</h3>
        <div class="w-24 h-1 bg-[var(--color-primary)] mx-auto rounded-full opacity-80 mb-6"></div>
        <p class="text-lg text-[var(--color-muted)]">
          Üzletünkben gondosan válogatott, egészséges szobanövények és prémium kiegészítők széles választékával várjuk. Legyen szó az első növényéről vagy egy ritka gyűjtői darabról, nálunk megtalálja.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${cardsHtml}
      </div>
      
      <div class="mt-16 text-center">
        <p class="text-[var(--color-text)] font-medium mb-6">Kíváncsi a teljes választékra? Látogasson el hozzánk személyesen!</p>
        <a href="#kapcsolat" class="btn-primary inline-flex">
          Tervezze meg látogatását
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </a>
      </div>
    </div>
  `;

  // Smooth scroll for the CTA button
  const ctaButton = section.querySelector('a[href="#kapcsolat"]');
  if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = ctaButton.getAttribute('href')?.substring(1);
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  return section;
}