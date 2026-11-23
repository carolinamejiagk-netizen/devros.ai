import { qs } from './dom';

/** Adds a hairline under the fixed header once the page has scrolled. */
export function initHeader(): void {
  const header = qs<HTMLElement>('#header');
  const update = (): void => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}
