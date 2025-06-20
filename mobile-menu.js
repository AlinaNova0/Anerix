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

  // 2) Smooth-scroll по якорям и удаление хеша
  const header = document.querySelector('header');
  const links  = document.querySelectorAll('a[href^="#"]');

  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const offset = (header ? header.getBoundingClientRect().height : 0) + 8;
    const pos    = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: pos - offset, behavior: 'smooth' });
  }

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();                              // отменяем дефолтное «добавление #»
      const id = link.getAttribute('href').substring(1);
      scrollToSection(id);
      // убираем хеш из адресной строки
      history.replaceState(null, '', window.location.pathname + window.location.search);
      mobileMenu.classList.remove('open');             // закрываем моб-меню, если оно открыто
    });
  });

  // 3) При прямом заходе на URL с #… (если вдруг остался) — скроллим и сразу убираем
  if (window.location.hash) {
    const id = window.location.hash.substring(1);
    scrollToSection(id);
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
});

