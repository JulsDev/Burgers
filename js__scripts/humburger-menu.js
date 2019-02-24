const menu = document.querySelector(".humburger_menu");
const menuHover = document.querySelector(".humburger_menu_hover");
const menuClose = document.querySelector(".humburger_menu_hover--close");

menu.addEventListener('click', function(event){
  event.preventDefault();
  menuHover.classList.add('humburger_menu_hover--opened');
});

menuClose.addEventListener('click', function(event){
  event.preventDefault("Пыталось закрыться");
  menuHover.classList.remove('humburger_menu_hover--opened');
});