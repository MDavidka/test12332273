export function About(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'rolunk';
  section.className = 'py-20 bg-[var(--color-surface)] overflow-hidden';

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <!-- Kép oszlop -->
        <div class="relative group order-2 lg:order-1">
          <!-- Dekoratív háttér elem -->
          <div class="absolute -inset-4 bg-[var(--color-primary)]/10 rounded-[var(--radius-lg)] transform -rotate-3 transition-transform duration-500 group-hover:-rotate-1"></div>
          
          <img
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80"
            alt="Növényboltunk belső tere és alapítónk"
            class="relative rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] w-full h-[400px] lg:h-[550px] object-cover transition-transform duration-500 group-hover:-translate-y-2"
            loading="lazy"
          />
          
          <!-- Lebegő badge -->
          <div class="absolute -bottom-6 -right-6 bg-[var(--color-surface)] p-4 rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] border border-[var(--color-border)] hidden sm:flex items-center gap-4 animate-bounce" style="animation-duration: 3s;">
            <div class="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-bold text-[var(--color-text)]">Több mint 5 éve</p>
              <p class="text-xs text-[var(--color-muted)]">a növények szerelmesei</p>
            </div>
          </div>
        </div>

        <!-- Szöveg oszlop -->
        <div class="flex flex-col justify-center order-1 lg:order-2">
          <span class="text-[var(--color-accent)] font-semibold tracking-wider uppercase text-sm mb-3 block">Történetünk</span>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[var(--color-text)] mb-6 leading-tight">
            Szenvedélyünk a természet közelsége
          </h2>
          
          <div class="space-y-5 text-[var(--color-muted)] text-lg leading-relaxed mb-10">
            <p>
              Minden egy apró Monstera növénnyel kezdődött a nappalink sarkában. Ahogy a gyűjteményünk nőtt, úgy erősödött bennünk a vágy, hogy ezt a zöldellő csodát másokkal is megosszuk. Így született meg a boltunk, egy kis városi oázis a betonrengeteg közepén.
            </p>
            <p>
              Hiszünk abban, hogy a növények nem csupán egyszerű dekorációk. Élőlények, amelyek élettel, friss levegővel és nyugalommal töltik meg az otthonokat. Célunk, hogy mindenki megtalálja a számára tökéletes zöld társat, legyen szó kezdő növénybarátról vagy tapasztalt gyűjtőről.
            </p>
          </div>

          <!-- Értékek / Jellemzők -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-heading font-semibold text-[var(--color-text)] text-lg">Szakértő gondoskodás</h3>
                <p class="text-sm text-[var(--color-muted)] mt-1 leading-relaxed">Minden növényt egészségesen, kártevőmentesen és átvizsgálva adunk át új gazdájának.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-heading font-semibold text-[var(--color-text)] text-lg">Személyes tanácsadás</h3>
                <p class="text-sm text-[var(--color-muted)] mt-1 leading-relaxed">Segítünk kiválasztani a fényviszonyoknak és életmódodnak megfelelő növényt.</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  `;

  return section;
}