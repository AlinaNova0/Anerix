document.addEventListener("DOMContentLoaded", function () {
    const getStartedBtn = document.querySelector('.btn--shine');
  
    function toggleShineEffect() {
      if (document.visibilityState === "visible") {
        getStartedBtn.classList.add('animate');
      } else {
        getStartedBtn.classList.remove('animate');
      }
    }
  
    // Сразу при загрузке
    toggleShineEffect();
  
    // Когда пользователь переключает вкладки
    document.addEventListener("visibilitychange", toggleShineEffect);
  });
  