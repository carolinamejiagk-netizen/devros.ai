import { prefersReducedMotion, qsa } from './dom';
import type { MenuController } from './menu';

/**
 * Smooth anchor scrolling. The fixed-header offset comes from CSS
 * (`scroll-padding-top: var(--header-h)`), so it stays correct at every breakpoint.
 */
export function initAnchors(menu: MenuController): void {
  qsa<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event: MouseEvent) => {
      const id = link.getAttribute('href')?.slice(1) ?? '';
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      event.preventDefault();
      menu.close();
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start',
      });
      history.replaceState(null, '', `#${id}`);
    });
  });
}
