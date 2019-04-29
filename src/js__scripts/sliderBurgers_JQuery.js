
$(document).ready(function(){

// Двигаем слайды
var moveSlide = function(container, slideNum){ 
        // Сохраняем слайдер в контейнер
        slider = container.find('.burger__slider');
        // Находим все элементы в контейнере
        items = slider.find('.burger__item');
        // Сохраняем активный элемент
        activeSlide = items.filter('.active');
        reqItem = items.eq(slideNum);
        reqIndex = reqItem.index();
        // Доступ к элементу, который будем двигать
        list = slider.find('.burger__list');

        // ---- Анимация -----//
        animationTime = 500;
        // Если слайд не последний
        if(reqItem.length){ 
          list.animate({'left': -reqIndex * 100 + '%' }, animationTime, function(){
              activeSlide.removeClass('active');
              reqItem.addClass('active');
          });
        }
}


$('.slider-arrow').on('click', function(event){
  event.preventDefault();

  var $this = $(this);
  container = $this.siblings('.container');
  slider = container.find('.burger__slider');
  activeItem = slider.find('.burger__item').filter('.active');
  nextItem = activeItem.next();
  prevItem = activeItem.prev();
  
  if($this.hasClass('slider-arrow__right')){
    if(nextItem.length){
      moveSlide(container, nextItem.index());
    }else{
      moveSlide(container, 0);
    }
  };

  if($this.hasClass('slider-arrow__left')){
     if(prevItem.length){
       moveSlide(container, prevItem.index());
     }else{
       moveSlide(container, prevItem.last().index());
     }
  };
});
});



