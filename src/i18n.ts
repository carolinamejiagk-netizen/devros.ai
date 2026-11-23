import { qs, qsa } from './dom';

export type Lang = 'en' | 'es';

const LANGS: readonly Lang[] = ['en', 'es'];
const STORAGE_KEY = 'devros-lang';

interface Strings {
  'nav.solutions': string;
  'nav.how': string;
  'nav.about': string;
  'nav.talk': string;
  'lang.group': string;
  'hotspot.talk': string;
  'hotspot.book': string;
  'hotspot.email': string;
  'meta.title': string;
  'meta.description': string;
}

const STRINGS: Record<Lang, Strings> = {
  en: {
    'nav.solutions': 'Solutions',
    'nav.how': 'How it works',
    'nav.about': 'About',
    'nav.talk': 'Let’s talk',
    'lang.group': 'Language',
    'hotspot.talk': 'Let’s talk',
    'hotspot.book': 'Book free consultation',
    'hotspot.email': 'Email contact@devros.ai',
    'meta.title': 'DevrosAI — Made-to-measure agents. Skip complexity.',
    'meta.description':
      'Made-to-measure AI agents that connect your tools, data, and processes, turning complex operations into seamless outcomes.',
  },
  es: {
    'nav.solutions': 'Soluciones',
    'nav.how': 'Cómo trabajamos',
    'nav.about': 'Acerca de',
    'nav.talk': 'Hablemos',
    'lang.group': 'Idioma',
    'hotspot.talk': 'Hablemos',
    'hotspot.book': 'Agendar consulta gratis',
    'hotspot.email': 'Escribir a contact@devros.ai',
    'meta.title': 'DevrosAI — Agentes a la medida. Elimina lo complejo.',
    'meta.description':
      'Agentes de IA personalizados que conectan tus herramientas, datos y procesos, convirtiendo operaciones complejas en resultados sin complicaciones.',
  },
};

const isLang = (value: unknown): value is Lang =>
  typeof value === 'string' && (LANGS as readonly string[]).includes(value);

function readStored(): Lang | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return isLang(value) ? value : null;
  } catch {
    return null;
  }
}

function store(lang: Lang): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* storage unavailable (private mode, file://) — the choice just won't persist */
  }
}

/** Saved choice → ?lang= → browser language → English. */
export function detectLang(): Lang {
  const fromQuery = new URLSearchParams(location.search).get('lang');
  if (isLang(fromQuery)) return fromQuery;
  return readStored() ?? (navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en');
}

const parseBox = (value: string | undefined): string[] | null => {
  const parts = value?.split(',').map((p) => p.trim());
  return parts && parts.length === 4 ? parts : null;
};

/** Swaps artwork, descriptions, labels and metadata. English values are captured from the markup once. */
export function applyLang(lang: Lang): void {
  const t = STRINGS[lang];

  qsa<HTMLImageElement>('.slide img').forEach((img) => {
    img.dataset.srcEn ??= img.getAttribute('src') ?? '';
    img.dataset.altEn ??= img.alt;
    const src = lang === 'es' ? img.dataset.srcEs : img.dataset.srcEn;
    const alt = lang === 'es' ? img.dataset.altEs : img.dataset.altEn;
    if (src && img.getAttribute('src') !== src) img.setAttribute('src', src);
    if (alt !== undefined) img.alt = alt;
  });

  qsa<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n as keyof Strings | undefined;
    if (key && key in t) el.textContent = t[key];
  });
  qsa<HTMLElement>('[data-i18n-aria]').forEach((el) => {
    const key = el.dataset.i18nAria as keyof Strings | undefined;
    if (key && key in t) el.setAttribute('aria-label', t[key]);
  });

  // Clickable zones sit over buttons baked into the artwork; positions can differ per language
  qsa<HTMLElement>('.hotspot[data-box-en]').forEach((zone) => {
    const box = parseBox(lang === 'es' ? zone.dataset.boxEs : zone.dataset.boxEn);
    if (!box) return;
    const [left, top, width, height] = box;
    zone.style.left = `${left}%`;
    zone.style.top = `${top}%`;
    zone.style.width = `${width}%`;
    zone.style.height = `${height}%`;
  });

  document.documentElement.lang = lang;
  document.title = t['meta.title'];
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', t['meta.description']);
  qsa<HTMLButtonElement>('.lang button[data-lang]').forEach((btn) =>
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang)),
  );
}

export function initLanguage(): void {
  applyLang(detectLang());
  qs<HTMLElement>('.lang').addEventListener('click', (event: MouseEvent) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('button[data-lang]');
    const lang = button?.dataset.lang;
    if (!isLang(lang)) return;
    store(lang);
    applyLang(lang);
  });
}
