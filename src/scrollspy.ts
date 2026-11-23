import { qs, qsa } from './dom';

/** Highlights the nav item of the section in view; the hero highlights none. */
export function initScrollSpy(): void {
  if (!('IntersectionObserver' in window)) return;

  const links = qsa<HTMLAnchorElement>('#nav a[href^="#"]');
  const sections = new Map<string, HTMLElement>();
  for (const link of links) {
    const id = link.getAttribute('href')?.slice(1);
    const section = id ? document.getElementById(id) : null;
    if (id && section) sections.set(id, section);
  }

  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const current = `#${entry.target.id}`;
        links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === current));
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );

  sections.forEach((section) => observer.observe(section));
  observer.observe(qs<HTMLElement>('#top')); // hero: no nav item active
}
