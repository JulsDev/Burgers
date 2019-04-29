
$(document).ready(function(){
  
  const sections = $(this).find(".section");
  const display = $(".maincontent");
  // Выполняется ли анимация
  let isScroll = false;

  const setActiveMenuItem = sectionNum => {
    $('.fixed-menu__item').eq(sectionNum).addClass('active')
      .siblings().removeClass('active');
  }

  // Сдвигаем слайды
  const performTransition = function(sectionNum){
    // Проверяем флаг, чтобы не листать, пока идет предыдущая анимация
    if(isScroll) return;
    // Если предыдущей не было
    isScroll = true;
    // Задаем сдвиг
    const position = (sectionNum) * -100 + "%";
    // Навешиваем активный класс на элемент
    sectionItem = sections.eq(sectionNum);
    sectionItem.addClass("active").siblings().removeClass("active");
    // Задаем анимацию
    display.css({
      "transform": `translateY(${position})`,
      "-webkit-transform": `translateY(${position})`
    });  

    // Чтобы избежать инерции, выставим таймаут
    setTimeout(() => {
      isScroll = false;
      setActiveMenuItem(sectionNum);
     }, 1000 + 300); // продолжительность transition + 300 мл сек - время для завершения инерции тачустройств
  };


// Функция прокрутки  
const scrollToSection = direction => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if(direction == 'down' && nextSection.length){
    performTransition(nextSection.index());
  }
  if(direction == 'up' && prevSection.length){
    console.log(prevSection.length);
    performTransition(prevSection.index());
  }
}


  // Обработка скролла
  $('.wrapper').on('wheel', e => {
    const deltaY = e.originalEvent.deltaY;

    if(deltaY > 0){
     scrollToSection('down');
    }
    if(deltaY < 0){
      scrollToSection('up');
    }
  });

  $('.wrapper').on('touchmove', e => {
    e.preventDefault();
  });

  // обработка нажатия на стрелки на клавиатуре
  $(document).on('keydown', e => {

    switch (e.keyCode) {
      case 40: scrollToSection("down");
        break;

      case 38: scrollToSection("up");
        break;
    }
  });

// Скролл по меню в шапке и боковому меню
$('[data-scroll-to]').on('click', e =>{
  e.preventDefault();
  // Определяем номер секции
  console.log("Скролл по меню");
  console.log(e.currentTarget);
  console.log($(e.currentTarget));

  const target = parseInt($(e.currentTarget).attr('data-scroll-to'));
  console.log(target);
  performTransition(target);
})


$('.arrow-scroll').on('click', e => {
  scrollToSection("down");
})

});

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

if (isMobile) {
  $(document).swipe({
    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
      /**
       * плагин возвращает фактическое...
       * ...
       */
      const scrollDirection = direction === 'down' ? 'up' : 'down';
      
      scrollToSection(scrollDirection);
    }
  });
}
