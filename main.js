// Функція для генерації випадкового числа
function getRandomNumber(max) {
    return ~~(Math.random() * max);
  }
  
  // Функція для перемішування масиву
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = getRandomNumber(i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Функція для перемішування карток
  function shuffleCards() {
    let order = Array.from(Array(cards.length).keys());
    shuffleArray(order);
    cards.forEach((card, index) => {
      setOrder(card, order[index]);
    });
  }
  
  // Функція для додавання класу
  function addClass(element, className) {
    element.classList.add(className);
  }
  
  // Функція для видалення класу
  function removeClass(element, className) {
    element.classList.remove(className);
  }
  
  // Функція для встановлення атрибуту
  function setAttribute(element, attributeName, value) {
    element.setAttribute(attributeName, value);
  }
  
  // Функція для встановлення порядку
  function setOrder(element, order) {
    element.style.order = order;
  }
  
  // Функція для додавання події
  function addEventListener(element, eventName, handler) {
    element.addEventListener(eventName, handler);
  }
  
  // Завантаження карток
  const cards = document.querySelectorAll('.memory-card');
  
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  
  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
  
    addClass(this, 'flip');
  
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
  
      return;
    }
  
    secondCard = this;
    checkForMatch();
  }
  
  function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  
    isMatch ? disableCards() : unflipCards();
  }
  
  function disableCards() {
    removeEventListener(firstCard, 'click', flipCard);
    removeEventListener(secondCard, 'click', flipCard);
  
    resetBoard();
  }
  
  function unflipCards() {
    lockBoard = true;
  
    setTimeout(() => {
      removeClass(firstCard, 'flip');
      removeClass(secondCard, 'flip');
  
      resetBoard();
    }, 1500);
  }
  
  function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
  }
  
  shuffleCards();
  
  cards.forEach(card => addEventListener(card, 'click', flipCard));