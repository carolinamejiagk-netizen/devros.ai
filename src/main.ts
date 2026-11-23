import { initAnchors } from './anchors';
import { initHeader } from './header';
import { initLanguage } from './i18n';
import { initMenu } from './menu';
import { initScrollSpy } from './scrollspy';

initLanguage();
initHeader();
const menu = initMenu();
initAnchors(menu);
initScrollSpy();
