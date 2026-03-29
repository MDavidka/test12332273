export function renderFeatures(container: HTMLElement): void {
  // Static feature data highlighting store benefits
  const features = [
    {
      title: 'Safe & Secure Shipping',
      description: 'Our custom eco-packaging ensures your plants arrive healthy and intact, no matter the distance.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>`
    },
    {
      title: '100% Organic Care',
      description: 'Grown with love and without harmful chemicals. Safe for your home, family, and furry friends.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>`
    },
    {
      title: 'Expert Plant Advice',
      description: 'Every order includes detailed care instructions and lifetime support from our resident botanists.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>`
    },
    {
      title: 'Healthy Root Guarantee',
      description: 'We guarantee your plant will arrive with a strong, established root system ready to thrive.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>`
    }
  ];

  // Generate HTML for each feature card
  const featuresHtml = features.map(feature => `
    <div class="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-sm border border-stone-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div class="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-6">
        ${feature.icon}
      </div>
      <h3 class="text-xl font-semibold text-stone-800 mb-3">${feature.title}</h3>
      <p class="text-stone-600 leading-relaxed">${feature.description}</p>
    </div>
  `).join('');

  // Create the section element
  const section = document.createElement('section');
  section.id = 'features';
  section.className = 'py-24 bg-stone-50';
  
  // Construct the full section layout
  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-stone-900 mb-4 tracking-tight">Why Choose Our Plants?</h2>
        <p class="text-lg text-stone-600">We go the extra mile to ensure you receive the healthiest, happiest plants directly to your door, ready to transform your space.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        ${featuresHtml}
      </div>
    </div>
  `;

  // Append to the provided container
  container.appendChild(section);
}