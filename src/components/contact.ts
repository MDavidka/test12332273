export function Contact(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'contact';
  section.className = 'py-20 bg-[var(--color-bg)]';

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl md:text-4xl font-heading font-bold text-[var(--color-text)] mb-4">
          Látogasson el hozzánk
        </h2>
        <p class="text-lg text-[var(--color-muted)]">
          Szeretettel várjuk budapesti üzletünkben, ahol személyesen is megcsodálhatja növényeinket, és szakértőink szívesen segítenek a választásban.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        <!-- Contact Information -->
        <div class="space-y-10">
          <!-- Address & Contact -->
          <div class="bg-[var(--color-surface)] p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] border border-[var(--color-border)]">
            <h3 class="text-2xl font-heading font-semibold text-[var(--color-text)] mb-6">Elérhetőségek</h3>
            
            <ul class="space-y-6">
              <li class="flex items-start">
                <div class="flex-shrink-0 w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center text-[var(--color-primary)] mt-1">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-[var(--color-muted)] mb-1">Cím</p>
                  <p class="text-base text-[var(--color-text)]">1051 Budapest,<br>Növény utca 42.</p>
                </div>
              </li>
              
              <li class="flex items-start">
                <div class="flex-shrink-0 w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center text-[var(--color-primary)] mt-1">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-[var(--color-muted)] mb-1">Telefon</p>
                  <a href="tel:+3612345678" class="text-base text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">+36 1 234 5678</a>
                </div>
              </li>
              
              <li class="flex items-start">
                <div class="flex-shrink-0 w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center text-[var(--color-primary)] mt-1">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-[var(--color-muted)] mb-1">E-mail</p>
                  <a href="mailto:hello@plantstore.hu" class="text-base text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">hello@plantstore.hu</a>
                </div>
              </li>
            </ul>
          </div>

          <!-- Opening Hours -->
          <div class="bg-[var(--color-surface)] p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] border border-[var(--color-border)]">
            <h3 class="text-2xl font-heading font-semibold text-[var(--color-text)] mb-6 flex items-center gap-3">
              <svg class="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Nyitvatartás
            </h3>
            
            <ul class="space-y-3">
              <li class="flex justify-between items-center py-2 border-b border-[var(--color-border)]">
                <span class="text-[var(--color-text)] font-medium">Hétfő - Péntek</span>
                <span class="text-[var(--color-muted)]">10:00 - 18:00</span>
              </li>
              <li class="flex justify-between items-center py-2 border-b border-[var(--color-border)]">
                <span class="text-[var(--color-text)] font-medium">Szombat</span>
                <span class="text-[var(--color-muted)]">10:00 - 14:00</span>
              </li>
              <li class="flex justify-between items-center py-2">
                <span class="text-[var(--color-text)] font-medium">Vasárnap</span>
                <span class="text-[var(--color-accent)] font-medium">Zárva</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Store Image / Map Placeholder -->
        <div class="h-full min-h-[400px] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-lg)] relative group">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" 
            alt="Üzletünk bejárata" 
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
          
          <!-- Floating Badge -->
          <div class="absolute bottom-6 left-6 right-6 bg-[var(--color-surface)]/95 backdrop-blur-sm p-4 rounded-[var(--radius-md)] shadow-lg flex items-center justify-between">
            <div>
              <p class="font-heading font-semibold text-[var(--color-text)]">PlantStore Budapest</p>
              <p class="text-sm text-[var(--color-muted)]">A város zöld oázisa</p>
            </div>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" class="btn-primary py-2 px-4 text-sm">
              Útvonaltervezés
            </a>
          </div>
        </div>

      </div>
    </div>
  `;

  return section;
}