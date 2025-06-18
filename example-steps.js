// example-steps.js

document.addEventListener('DOMContentLoaded', function() {
    const DASHED_LENGTH = 120;
    const stepsContainer = document.querySelector('.container.steps');
    if (!stepsContainer) return;
  
    function getCenterX() {
      const rect = stepsContainer.getBoundingClientRect();
      return rect.left + rect.width / 2;
    }
  
    const allSteps = document.querySelectorAll('.step_container');
    allSteps.forEach(card => {
      card.style.opacity = '0';
    });
  
    const options = { root: null, rootMargin: '0px', threshold: 0.5 };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
  
        card.style.transform = '';
        const rectCard = card.getBoundingClientRect();
        const containerRect = stepsContainer.getBoundingClientRect();
  
        let centerYOfCard = (rectCard.top - containerRect.top) + (rectCard.height / 2);
  
        // Ограничиваем высоту линии, чтобы она не выходила за границы контейнера
        const maxLineHeight = containerRect.height;
        if (centerYOfCard > maxLineHeight) {
          centerYOfCard = maxLineHeight;
        }
  
  
        stepsContainer.style.setProperty('--line-height', `${centerYOfCard}px`);
  
        if (card.classList.contains('step_container_left')) {
          const cardRightX = rectCard.right;
          const centerX = getCenterX();
          const deltaX = centerX - (cardRightX + DASHED_LENGTH);
          card.style.transform = `translateX(${deltaX}px)`;
        }
        else if (card.classList.contains('step_container_right')) {
          const cardLeftX = rectCard.left;
          const centerX = getCenterX();
          const deltaX = centerX - (cardLeftX - DASHED_LENGTH);
          card.style.transform = `translateX(${deltaX}px)`;
        }
        else if (card.classList.contains('step_container_middle')) {
          card.style.transform = 'translateY(0)';
        }
  
        card.classList.add('visible');
        card.style.opacity = '1';
        obs.unobserve(card);
      });
    }, options);
  
    allSteps.forEach(card => observer.observe(card));
  });
  
  // в конце вашего DOMContentLoaded, после allSteps.forEach(card => observer.observe(card));
if (window.innerWidth < 500) {
  const middleStep = document.querySelector('.step_container_middle');
  if (middleStep) {
    // даём браузеру время применить начальное состояние (translateY(100px))
    setTimeout(() => {
      middleStep.classList.add('visible');
    }, 100);
  }
}

