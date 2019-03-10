$(document).ready(function(){
    const leftArrow = document.querySelector(".slider-arrow__left");
    const rightArrow = document.querySelector(".slider-arrow__right");
    const slide = document.querySelector(".burger__list");

    leftArrow.addEventListener('click', function(event){
      event.preventDefault();
      slideShow("left");
    });

    rightArrow.addEventListener('click', function(event){
      event.preventDefault();
      slideShow("right");
    });

    function slideShow(direction){
      if(direction == "left"){
        slide.insertBefore(slide.lastElementChild, slide.firstElementChild);
      } 
      if(direction == "right"){
        slide.appendChild(slide.firstElementChild);
      }
    }
});