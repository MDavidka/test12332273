export function CheckoutForm(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'penztar';
  section.className = 'py-20 bg-[var(--color-bg)] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8';

  section.innerHTML = `
    <div class="w-full max-w-3xl mx-auto bg-[var(--color-surface)] p-6 md:p-10 rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] border border-[var(--color-border)] relative overflow-hidden">
      
      <!-- Decorative background element -->
      <div class="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-[var(--color-primary)]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div id="checkout-header" class="text-center mb-8 relative z-10">
        <span class="text-[var(--color-accent)] font-semibold tracking-wider uppercase text-sm mb-2 block">Biztonságos fizetés</span>
        <h2 class="text-3xl md:text-4xl font-heading font-bold text-[var(--color-text)]">Rendelés véglegesítése</h2>
        <p class="text-[var(--color-muted)] mt-3">Kérjük, adja meg a szállítási adatokat és a kísérőkártya szövegét.</p>
      </div>

      <form id="checkout-form" class="space-y-8 relative z-10">
        
        <!-- Recipient Info -->
        <div class="space-y-5 bg-[var(--color-bg)] p-6 rounded-[var(--radius-md)] border border-[var(--color-border)]/50">
          <h3 class="text-xl font-heading font-semibold text-[var(--color-text)] flex items-center gap-2">
            <svg class="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            Címzett adatai
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label for="recipientName" class="block text-sm font-medium text-[var(--color-text)] mb-1.5">Címzett teljes neve <span class="text-[var(--color-accent)]">*</span></label>
              <input type="text" id="recipientName" name="recipientName" required 
                class="w-full px-4 py-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-[var(--color-surface)] text-[var(--color-text)] placeholder-[var(--color-muted)]/50"
                placeholder="Pl. Kovács Anna">
            </div>
            <div>
              <label for="deliveryDate" class="block text-sm font-medium text-[var(--color-text)] mb-1.5">Kiszállítás dátuma <span class="text-[var(--color-accent)]">*</span></label>
              <input type="date" id="deliveryDate" name="deliveryDate" required 
                class="w-full px-4 py-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-[var(--color-surface)] text-[var(--color-text)]">
            </div>
          </div>
          
          <div>
            <label for="deliveryAddress" class="block text-sm font-medium text-[var(--color-text)] mb-1.5">Pontos szállítási cím <span class="text-[var(--color-accent)]">*</span></label>
            <input type="text" id="deliveryAddress" name="deliveryAddress" required 
              class="w-full px-4 py-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-[var(--color-surface)] text-[var(--color-text)] placeholder-[var(--color-muted)]/50"
              placeholder="Irányítószám, Város, Utca, Házszám, Emelet/Ajtó">
          </div>
        </div>

        <!-- Personal Message -->
        <div class="space-y-5 bg-[var(--color-bg)] p-6 rounded-[var(--radius-md)] border border-[var(--color-border)]/50">
          <h3 class="text-xl font-heading font-semibold text-[var(--color-text)] flex items-center gap-2">
            <svg class="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"></path></svg>
            Kísérőkártya
          </h3>
          
          <div>
            <label for="personalMessage" class="block text-sm font-medium text-[var(--color-text)] mb-1.5">Személyes üzenet (opcionális)</label>
            <textarea id="personalMessage" name="personalMessage" rows="3" 
              class="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-[var(--color-surface)] text-[var(--color-text)] placeholder-[var(--color-muted)]/50 resize-none"
              placeholder="Írja ide az üzenetet, amit a virág mellé szeretne küldeni..."></textarea>
            <p class="text-xs text-[var(--color-muted)] mt-2">Az üzenetet egy elegáns, kézzel írt kártyán helyezzük el a csokor mellett.</p>
          </div>
        </div>

        <!-- Sender Info -->
        <div class="space-y-5 bg-[var(--color-bg)] p-6 rounded-[var(--radius-md)] border border-[var(--color-border)]/50">
          <h3 class="text-xl font-heading font-semibold text-[var(--color-text)] flex items-center gap-2">
            <svg class="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            Megrendelő adatai
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label for="senderName" class="block text-sm font-medium text-[var(--color-text)] mb-1.5">Saját neve <span class="text-[var(--color-accent)]">*</span></label>
              <input type="text" id="senderName" name="senderName" required 
                class="w-full px-4 py-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-[var(--color-surface)] text-[var(--color-text)]">
            </div>
            <div>
              <label for="senderEmail" class="block text-sm font-medium text-[var(--color-text)] mb-1.5">E-mail címe <span class="text-[var(--color-accent)]">*</span></label>
              <input type="email" id="senderEmail" name="senderEmail" required 
                class="w-full px-4 py-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-[var(--color-surface)] text-[var(--color-text)]">
            </div>
          </div>
        </div>

        <div class="pt-6 border-t border-[var(--color-border)]">
          <button type="submit" class="w-full btn-primary py-4 text-lg font-semibold flex justify-center items-center gap-3 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]">
            <span>Rendelés leadása és Fizetés</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
          <p class="text-center text-xs text-[var(--color-muted)] mt-4 flex items-center justify-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            Adatait biztonságosan kezeljük.
          </p>
        </div>
      </form>
      
      <!-- Success Message (Hidden by default) -->
      <div id="checkout-success" class="hidden text-center py-12 relative z-10 animate-fade-in">
        <div class="w-24 h-24 bg-[var(--color-secondary)]/20 text-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-3xl font-heading font-bold text-[var(--color-text)] mb-4">Köszönjük a rendelést!</h3>
        <p class="text-lg text-[var(--color-muted)] mb-8 max-w-md mx-auto">
          A virágcsokrot a megadott időpontban gondosan kiszállítjuk. A rendelés visszaigazolását elküldtük az e-mail címére.
        </p>
        <button id="back-to-shop" class="btn-secondary px-8 py-3">
          Vissza a főoldalra
        </button>
      </div>

    </div>
  `;

  // Set minimum date for delivery to today
  const dateInput = section.querySelector('#deliveryDate') as HTMLInputElement;
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // Handle form submission
  const form = section.querySelector('#checkout-form') as HTMLFormElement;
  const successMessage = section.querySelector('#checkout-success') as HTMLElement;
  const header = section.querySelector('#checkout-header') as HTMLElement;
  const backBtn = section.querySelector('#back-to-shop') as HTMLButtonElement;

  if (form && successMessage && header) {
    form.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      
      // In a real app, we would gather FormData and send to an API here
      // const formData = new FormData(form);
      // const data = Object.fromEntries(formData.entries());
      
      // Simulate API call and show success state
      form.classList.add('hidden');
      header.classList.add('hidden');
      successMessage.classList.remove('hidden');
      
      // Scroll to top of the checkout section smoothly
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      // Reset form and UI state
      form.reset();
      successMessage.classList.add('hidden');
      form.classList.remove('hidden');
      header.classList.remove('hidden');
      
      // Scroll back to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  return section;
}