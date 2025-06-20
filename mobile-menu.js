document.addEventListener('DOMContentLoaded', () => {
  // 1) Бургер-меню
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', e => {
    e.stopPropagation();
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.addEventListener('click', e => e.stopPropagation());
  document.addEventListener('click', () => mobileMenu.classList.remove('open'));

  // 2) Обработка всех ссылок с '#' в href
  const header = document.querySelector('header');
  const links  = document.querySelectorAll('a[href*="#"]');

  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return false;
    const offset = (header?.getBoundingClientRect().height || 0) + 8;
    const pos    = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: pos - offset, behavior: 'smooth' });
    return true;
  }

  links.forEach(link => {
    link.addEventListener('click', e => {
      // link.hash = "#features" или ""
      const hash = link.hash;
      if (!hash) return;                       // не наш якорь — уходим
      const id = hash.substring(1);
      if (scrollToSection(id)) {
        e.preventDefault();                    // блокируем дефолт
        history.replaceState(null, '',          // убираем '#…'
          window.location.pathname + window.location.search);
        mobileMenu.classList.remove('open');   // закрываем моб-меню
      }
    });
  });

  // 3) Если при загрузке URL уже содержит '#…' — скроллим и убираем хеш
  window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1);
      if (scrollToSection(id)) {
        history.replaceState(null, '',
          window.location.pathname + window.location.search);
      }
    }
  });
});


