document.addEventListener('DOMContentLoaded', () => {
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  if (!burger || !mobileMenu) return;

  // Открытие/закрытие по бургеру
  burger.addEventListener('click', e => {
    e.stopPropagation();              // чтобы клик по бургеру не дошёл до document
    mobileMenu.classList.toggle('open');
  });

  // Закрытие при клике где угодно вне меню
  document.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
    }
  });

  // Отменяем всплытие клика внутри самого меню
  mobileMenu.addEventListener('click', e => {
    e.stopPropagation();
  });

  // Закрытие при клике на любой пункт меню
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
});
