$(document).ready(function(){
    // Модальное окно (отзывы)
    const overlayReviews = document.querySelector(".popup-overlay__reviews");
    const reviewsButtons = document.querySelectorAll(".button__reviews");
    const popupClose = document.querySelector(".popup-close");

    // Так как отзывов 8 штук, то идем в цикле по всем
    reviewsButtons.forEach(function(item){
      item.addEventListener('click', function(event){
        event.preventDefault();
        overlayReviews.classList.add('opened__reviwes');
      });
    });

    // Закрываем окно, если нажали на крестик
    popupClose.addEventListener('click', function(event){
      event.preventDefault();
      overlayReviews.classList.remove('opened__reviwes');
    });

    // Закрываем окно, если нажали по overlay
    overlayReviews.addEventListener('click', function(event){
      if(event.target == overlayReviews){
        popupClose.click();
      }
    });
});