
// ---- Реализация почти такая же как в accordeon-menu.js  ----//

const itemTeamList = document.querySelectorAll(".team__item");

// Вызываем обработчки события "Клмк мышкой по элементу"
itemTeamList.forEach(function(item) {
  item.addEventListener('click', mainHorizontalMenu);
});

function mainHorizontalMenu(e){
  // Доступ к элементу в списке (элемент - ссылка, поэтому preventDefault)
  const curTeamItem = e.currentTarget;
  e.preventDefault();

  // Задаем активный элемент
  const isActiveItem = curTeamItem.classList.contains("team__item-active");
  console.log(isActiveItem);

  // Открываем - закрываем меню
  if(isActiveItem){
    closeHorizontalMenu(itemTeamList);
  } else {
    closeHorizontalMenu(itemTeamList);
    openHorizontalMenu(curTeamItem);
  }
}

function closeHorizontalMenu(itemTeamList){
  itemTeamList.forEach(function(element){
    // Удаляем активный класс
    element.classList.remove("team__item-active");
    // Задаем стили
    element.querySelector('.team__item-person').style.color = "#ffffff";
    element.querySelector('.team__item-block').style.height = 0;
  })
}

function openHorizontalMenu(curTeamItem){
  const curItemContent = curTeamItem.querySelector('.team__item-block');
  const textBlock = curItemContent.lastElementChild;
  const curTextHeight = textBlock.getBoundingClientRect().height;

  // Вешаем активный класс
  curTeamItem.classList.add("team__item-active");
  // Задаем стили
  curItemContent.style.height = `${curTextHeight}px`;
}

