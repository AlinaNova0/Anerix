document.addEventListener("DOMContentLoaded", function () {
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('a');
  
    if (burger && mobileMenu) {
      // Открытие и закрытие по нажатию на бургер
      burger.addEventListener('click', function () {
        mobileMenu.classList.toggle('open');
      });
  
      // Закрытие по нажатию на любую ссылку в меню
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
        });
      });
    }
  });
  