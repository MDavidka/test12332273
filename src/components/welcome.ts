import type { ComponentProps, TechSkill } from '../types';
import { createElement, clearContainer } from '../utils';

/**
 * Renders the Welcome (Landing) page.
 * Introduces Marton David, showcases skills, and provides a call-to-action.
 * 
 * @param props Component initialization properties.
 */
export function renderWelcome({ container, state, onViewChange }: ComponentProps): void {
  if (!container) return;

  // Clear previous content
  clearContainer(container);

  // Main wrapper for the welcome view
  const wrapper = createElement('div', {
    className: 'w-full flex flex-col min-h-screen animate-fade-in'
  });

  // --- 1. Hero Section ---
  const heroSection = createHeroSection(state, onViewChange);
  wrapper.appendChild(heroSection);

  // --- 2. Tech Stack / Skills Section ---
  const skillsSection = createSkillsSection();
  wrapper.appendChild(skillsSection);

  // --- 3. Gated Content Teaser Section ---
  const teaserSection = createTeaserSection(state, onViewChange);
  wrapper.appendChild(teaserSection);

  // Mount to container
  container.appendChild(wrapper);
}

/**
 * Creates the main hero banner introducing the developer.
 */
function createHeroSection(state: ComponentProps['state'], onViewChange: ComponentProps['onViewChange']): HTMLElement {
  const section = createElement('section', {
    className: 'container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24 max-w-5xl flex flex-col items-start'
  });

  // Greeting Badge
  const badge = createElement('div', {
    className: 'inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-mono font-medium mb-6',
    text: '👋 Welcome to my portfolio'
  });

  // Main Title
  const titleWrapper = createElement('h1', {
    className: 'text-5xl md:text-7xl font-bold tracking-tight mb-4 text-slate-50'
  });
  
  const titleLine1 = createElement('span', { text: "Hi, I'm " });
  const titleName = createElement('span', { 
    className: 'text-gradient',
    text: 'Marton David.'
  });
  
  titleWrapper.appendChild(titleLine1);
  titleWrapper.appendChild(createElement('br'));
  titleWrapper.appendChild(titleName);

  // Subtitle / Role
  const subtitle = createElement('h2', {
    className: 'text-2xl md:text-3xl font-mono text-slate-300 mb-6',
    text: 'Senior Frontend Engineer & UI/UX Designer'
  });

  // Description
  const description = createElement('p', {
    className: 'text-lg text-slate-400 max-w-2xl leading-relaxed mb-10',
    text: 'I build high-performance, production-ready web applications with a focus on modern minimalist design, accessibility, and exceptional user experiences. Specializing in the Vite, TypeScript, and Tailwind CSS ecosystem.'
  });

  // Call to Action Buttons
  const ctaGroup = createElement('div', {
    className: 'flex flex-wrap items-center gap-4'
  });

  // Primary CTA changes based on auth state
  const isAuth = !!state?.user;
  const primaryBtnText = isAuth ? 'Go to Dashboard' : 'Client Portal Login';
  const primaryBtnAction = isAuth ? 'dashboard' : 'login';

  const primaryBtn = createElement('button', {
    className: 'btn-primary',
    text: primaryBtnText
  });
  primaryBtn.addEventListener('click', () => {
    if (onViewChange) onViewChange(primaryBtnAction);
  });

  const secondaryBtn = createElement('a', {
    className: 'btn-ghost border border-slate-700 hover:border-slate-600',
    text: 'View GitHub',
    attributes: {
      href: 'https://github.com',
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  });

  ctaGroup.appendChild(primaryBtn);
  ctaGroup.appendChild(secondaryBtn);

  // Assemble Hero
  section.appendChild(badge);
  section.appendChild(titleWrapper);
  section.appendChild(subtitle);
  section.appendChild(description);
  section.appendChild(ctaGroup);

  return section;
}

/**
 * Creates the skills grid section.
 */
function createSkillsSection(): HTMLElement {
  const section = createElement('section', {
    className: 'w-full bg-slate-900/50 border-y border-slate-800 py-16 md:py-24'
  });

  const container = createElement('div', {
    className: 'container mx-auto px-4 max-w-5xl'
  });

  const sectionTitle = createElement('h3', {
    className: 'text-2xl font-mono font-bold text-slate-50 mb-12 flex items-center gap-4'
  });
  sectionTitle.innerHTML = `<span class="w-8 h-[2px] bg-cyan-500 inline-block"></span> Core Technologies`;

  const skillsGrid = createElement('div', {
    className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
  });

  // Define skills data
  const skills: TechSkill[] = [
    { name: 'TypeScript', category: 'frontend', level: 95 },
    { name: 'React / Vue', category: 'frontend', level: 90 },
    { name: 'Tailwind CSS', category: 'frontend', level: 95 },
    { name: 'Vite & Webpack', category: 'tools', level: 85 },
    { name: 'Node.js', category: 'backend', level: 80 },
    { name: 'Firebase', category: 'cloud', level: 85 },
    { name: 'UI/UX Design', category: 'tools', level: 90 },
    { name: 'Cloudflare Pages', category: 'cloud', level: 80 },
  ];

  // Group skills by category for visual distinction (optional, but here we just map them into cards)
  skills.forEach(skill => {
    const card = createElement('div', {
      className: 'glass-card p-6 hover:-translate-y-1 transition-transform duration-300 group'
    });

    const iconPlaceholder = createElement('div', {
      className: 'w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors duration-300'
    });
    
    // Simple dot icon based on category
    const dotColor = 
      skill.category === 'frontend' ? 'bg-cyan-400' :
      skill.category === 'backend' ? 'bg-emerald-400' :
      skill.category === 'cloud' ? 'bg-blue-400' : 'bg-purple-400';

    iconPlaceholder.innerHTML = `<div class="w-3 h-3 rounded-full ${dotColor}"></div>`;

    const skillName = createElement('h4', {
      className: 'text-lg font-medium text-slate-200 mb-1',
      text: skill.name
    });

    const skillCategory = createElement('span', {
      className: 'text-xs font-mono text-slate-500 uppercase tracking-wider',
      text: skill.category
    });

    card.appendChild(iconPlaceholder);
    card.appendChild(skillName);
    card.appendChild(skillCategory);
    skillsGrid.appendChild(card);
  });

  container.appendChild(sectionTitle);
  container.appendChild(skillsGrid);
  section.appendChild(container);

  return section;
}

/**
 * Creates a teaser section encouraging users to log in to see more.
 */
function createTeaserSection(state: ComponentProps['state'], onViewChange: ComponentProps['onViewChange']): HTMLElement {
  const section = createElement('section', {
    className: 'container mx-auto px-4 py-20 max-w-5xl text-center'
  });

  const card = createElement('div', {
    className: 'glass-card p-8 md:p-12 max-w-3xl mx-auto flex flex-col items-center relative overflow-hidden'
  });

  // Decorative background glow
  const glow = createElement('div', {
    className: 'absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-64 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none'
  });

  const title = createElement('h3', {
    className: 'text-2xl md:text-3xl font-bold text-slate-50 mb-4 relative z-10',
    text: state?.user ? 'Welcome back to your Dashboard' : 'Looking for more details?'
  });

  const description = createElement('p', {
    className: 'text-slate-400 mb-8 max-w-lg relative z-10',
    text: state?.user 
      ? 'Access your private project files, communication history, and exclusive resources.'
      : 'Log in to the client portal to view private case studies, interactive prototypes, and project dashboards.'
  });

  const actionBtn = createElement('button', {
    className: 'btn-primary relative z-10',
    text: state?.user ? 'Open Dashboard' : 'Sign In to Portal'
  });

  actionBtn.addEventListener('click', () => {
    if (onViewChange) {
      onViewChange(state?.user ? 'dashboard' : 'login');
    }
  });

  card.appendChild(glow);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(actionBtn);
  section.appendChild(card);

  return section;
}