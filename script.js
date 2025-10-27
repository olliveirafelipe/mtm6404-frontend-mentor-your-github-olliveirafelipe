const nav = document.getElementById('site-nav');
const openBtn = document.querySelector('.nav-toggle');
const closeBtn = document.querySelector('.nav-close');

const openMenu = () => {
  nav.classList.add('open');
  nav.removeAttribute('hidden');
  if (openBtn) openBtn.setAttribute('aria-expanded','true');
};
const closeMenu = () => {
  nav.classList.remove('open');

  if (window.matchMedia('(min-width: 900px)').matches) {
    nav.removeAttribute('hidden');
  } else {
    nav.setAttribute('hidden','');
  }
  if (openBtn) openBtn.setAttribute('aria-expanded','false');
};


const mql = window.matchMedia('(min-width: 900px)');
function syncNavToViewport(e = mql) {
  if (e.matches) {

    nav.classList.remove('open');
    nav.removeAttribute('hidden');
    if (openBtn) openBtn.setAttribute('aria-expanded','false');
  } else {

    if (!nav.classList.contains('open')) {
      nav.setAttribute('hidden','');
    }
  }
}
syncNavToViewport();
mql.addEventListener('change', syncNavToViewport);

if (openBtn) openBtn.addEventListener('click', openMenu);
if (closeBtn) closeBtn.addEventListener('click', closeMenu);


document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });


document.querySelectorAll('.site-nav__item--has-dropdown').forEach((item) => {
  const trigger = item.querySelector('.dropdown__trigger');
  const menu = item.querySelector('.dropdown__menu');
  if (!trigger || !menu) return;

  const open = () => { trigger.setAttribute('aria-expanded','true'); menu.hidden = false; };
  const close = () => { trigger.setAttribute('aria-expanded','false'); menu.hidden = true; };

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    expanded ? close() : open();
  });

  const desktopMql = window.matchMedia('(min-width: 900px)');
  const enableHover = () => {
    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', close);
  };
  const disableHover = () => {
    item.removeEventListener('mouseenter', open);
    item.removeEventListener('mouseleave', close);
  };
  if (desktopMql.matches) enableHover();
  desktopMql.addEventListener('change', (e) => e.matches ? enableHover() : disableHover());
});


document.addEventListener('click', (e) => {
  document.querySelectorAll('.site-nav__item--has-dropdown .dropdown__trigger[aria-expanded="true"]').forEach((btn) => {
    const li = btn.closest('.site-nav__item--has-dropdown');
    if (li && !li.contains(e.target)) {
      btn.setAttribute('aria-expanded','false');
      const menu = li.querySelector('.dropdown__menu');
      if (menu) menu.hidden = true;
    }
  });
});
