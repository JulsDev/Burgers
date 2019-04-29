(function(){
    // Доступ к элементу, который нас интересует
    var itemList = document.querySelectorAll(".menu-slider__item");

    for(item of itemList){
      // Навешиваем событие "Клик мышкой"
      item.addEventListener('click', mainVerticalMenu);
    }

    function mainVerticalMenu(e){
        // Доступ к элементу в списке
        const curItem = e.currentTarget;
        const isActive = curItem.classList.contains("active");
        
        if(isActive){
          closeVerticalMenu(itemList);
        } else{
          // Прежде, чем добавить активный класс,
          // удаляем активные классы у остальных элементов
          closeVerticalMenu(itemList);
          openVerticalMenu(curItem);
        }
    }


    function closeVerticalMenu(itemList){

      // Проходим по всем элементам
      itemList.forEach(function(elem){
        
        // Определяем переменные
        const curItemContent = elem.querySelector(".menu__item-content");
        const curItemTitle = elem.querySelector(".menu__item-title");
        const curItemSliderTitle = curItemTitle.querySelector(".slider-title");
        
        // Удаляем активный класс
        elem.classList.remove("active");
        
        // Устанавливаем стили
        closeMenuStyle(curItemContent, curItemSliderTitle);
      });
    }

    function openVerticalMenu(curItem){
      
      // Определяем переменные
      const curItemContent = curItem.querySelector(".menu__item-content");
      const textBlock = curItemContent.lastElementChild;
      const trueWidth = textBlock.getBoundingClientRect().width;
      const curItemTitle = curItem.querySelector(".menu__item-title");
      const curItemSliderTitle = curItemTitle.querySelector(".slider-title");
      
      // Вешаем активный класс
      curItem.classList.add("active");
      
      // Устанавливаем стили
      openMenuStyle(curItemContent, trueWidth, curItemSliderTitle);
    }


    function openMenuStyle(content, width, title){
      content.style.width = `${width}px`;
      content.style.opacity = "1";
      content.style.visibility = "visible";
      title.style.color = "#f9b43b";
    }

    function closeMenuStyle(content, title){
      content.style.width = 0;
      content.style.opacity = 0;
      content.style.visibility = "hidden";
      title.style.color = "#ffffff";
    }
})();
