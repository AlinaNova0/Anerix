document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const links  = document.querySelectorAll('a[href^="#"]');

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = header.getBoundingClientRect().height + 8;
    const topPos = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: topPos - offset, behavior: 'smooth' });
  }

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      scrollToSection(id);

      // удаляем хеш из адресной строки
      history.replaceState(null, '', window.location.pathname + window.location.search);
    });
  });

  // если пользователь зашёл напрямую на URL с хешем (на продакшене),
  // скроллим сразу при загрузке
  const hash = window.location.hash;
  if (hash) {
    const id = hash.substring(1);
    scrollToSection(id);
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
});

