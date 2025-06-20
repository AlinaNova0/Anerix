document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  // Функция плавного скролла
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = header.getBoundingClientRect().height + 8;
    const topPos = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: topPos - offset, behavior: 'smooth' });
  }

  // Обработчик клика по чистым путям
  document.querySelectorAll('a[href^="/features"], a[href^="/pricing"], a[href^="/contact"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      // получаем "features" из "/features"
      const id = link.getAttribute('href').slice(1);
      scrollToSection(id);
      history.pushState(null, '', '/' + id);
    });
  });

  // При загрузке страницы — если путь /features или /pricing или /contact
  const path = location.pathname.replace(/^\/|\/$/g, '');
  if (['features','pricing','contact'].includes(path)) {
    scrollToSection(path);
  }

  // Обработка навигации «назад/вперед»
  window.addEventListener('popstate', () => {
    const p = location.pathname.replace(/^\/|\/$/g, '');
    if (['features','pricing','contact'].includes(p)) {
      scrollToSection(p);
    }
  });
});
