import { qs } from './dom';

export interface MenuController {
  close: () => void;
}

/** Mobile menu: toggle button, Escape to close. */
export function initMenu(): MenuController {
  const nav = qs<HTMLElement>('#nav');
  const toggle = qs<HTMLButtonElement>('#menuToggle');

  const setOpen = (open: boolean): void => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  });

  return { close: () => setOpen(false) };
}
