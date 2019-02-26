
$(document).ready(function(){
  
  const sections = $(".section");
  const display = $(".maincontent");

  $('.wrapper').on('wheel', e => {
    const deltaY = e.originalEvent.deltaY;

    if(deltaY > 0){
      // к следующей
    }
    if(deltaY < 0){
      // к предыдущей
    }

    console.log(deltaY);
  })
});