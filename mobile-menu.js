document.addEventListener('DOMContentLoaded', () => {
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const header     = document.querySelector('header');
  const navLinks   = [
    ...document.querySelectorAll('.header_nav a'),
    ...mobileMenu.querySelectorAll('a')
  ];

  // Функция плавного скролла
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = header.getBoundingClientRect().height + 8;
    const topPos = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: topPos - offset, behavior: 'smooth' });
  }

  // Открытие/закрытие моб. меню
  burger.addEventListener('click', e => {
    e.stopPropagation();
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.addEventListener('click', e => e.stopPropagation());
  document.addEventListener('click', () => mobileMenu.classList.remove('open'));

  // Перехват кликов по ссылкам
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      // если ссылка ведёт на «чистый» путь /features, /pricing или /contact
      const path = href.replace(/\/$/, '').slice(1);
      if (['features','pricing','contact'].includes(path)) {
        e.preventDefault();
        scrollToSection(path);
        history.pushState(null, '', '/' + path);
        mobileMenu.classList.remove('open');
      }
      // для остальных (privacy/, terms/) – дефолтный переход
    });
  });

  // Если при заходе URL уже /features и т.д. – сразу скроллим
  const initial = location.pathname.replace(/\/$/, '').slice(1);
  if (['features','pricing','contact'].includes(initial)) {
    scrollToSection(initial);
  }

  // Обработка назад/вперёд
  window.addEventListener('popstate', () => {
    const p = location.pathname.replace(/\/$/, '').slice(1);
    if (['features','pricing','contact'].includes(p)) {
      scrollToSection(p);
    }
  });
});

