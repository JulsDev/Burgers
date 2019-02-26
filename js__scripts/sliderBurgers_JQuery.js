
$(document).ready(function(){
  $('.slider-arrow__left').on('click', function(event){
    event.preventDefault();

      $this = $(this);
      container = $this.next();
 
      // Сохраняем слайдер в контейнер
      slider = container.find('.burger__slider');

      // Находим все элементы в контейнере
      items = slider.find('.burger__item');
      // Сохраняем активный элемент
      activeSlide = items.filter('.active');

      // Доступ к следующему элементу (после активного)
      reqItem = activeSlide.prev();
      // Доступ к порядковому номеру этого элемента
      reqIndex = reqItem.index();
      // Доступ к элементу, который будем двигать
      list = slider.find('.burger__list');
      // Задаем время анимации
      animationTime = 500;

      // ---- Анимация -----//
      // Если слайд не последний
      if(reqItem.length){ 
        list.animate({'left': -reqIndex * 100 + '%' }, animationTime, function(){
            activeSlide.removeClass('active');
            reqItem.addClass('active');
          });
      }
  });


  $('.slider-arrow__right').on('click', function(event){
    event.preventDefault();

      $this = $(this);
      container = $this.prev();
 
      // Сохраняем слайдер в контейнер
      slider = container.find('.burger__slider');

      // Находим все элементы в контейнере
      items = slider.find('.burger__item');
      // Сохраняем активный элемент
      activeSlide = items.filter('.active');

      // Доступ к следующему элементу (после активного)
      reqItem = activeSlide.next();
      // Доступ к порядковому номеру этого элемента
      reqIndex = reqItem.index();
      // Доступ к элементу, который будем двигать
      list = slider.find('.burger__list');
      // Задаем время анимации
      animationTime = 500;

      // ---- Анимация -----//
      // Если слайд не последний
      if(reqItem.length){ 
        list.animate({'right': reqIndex * 100 + '%' }, animationTime, function(){
            activeSlide.removeClass('active');
            reqItem.addClass('active');
          });
      }
  });

});


