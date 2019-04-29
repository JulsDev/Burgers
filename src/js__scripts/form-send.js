(function(){
    const myForm = document.querySelector('.order_form');
    const mySendBtn = document.querySelector('.form_button');
    const overlayForm = document.querySelector(".popup-overlay__form");

    mySendBtn.addEventListener('click', function(event){
      event.preventDefault();

      if(validateForm(myForm)){
        const formData = new FormData();
        formData.append("name", myForm.elements.name);
        formData.append("phone", myForm.elements.phone);
        formData.append("comment", myForm.elements.comment);

        const xhr = new XMLHttpRequest();

        if(xhr.status >= 400){
          sendModalWindow("Произошла ошибка!");
        } else {
          xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
          xhr.send(formData);
          sendModalWindow("Сообщение отправлено!");
        }
      }
    })


    // Проверка валидности данных
    // (пока встроенными методами) 
    function validateForm(form){
      let isValid = true;

      if(!validateField(form.elements.name)){
        isValid = false;
      }
      if(!validateField(form.elements.phone)){
        isValid = false;
      }
      if(!validateField(form.elements.comment)){
        isValid = false;
      }
      return isValid;
    }

    function validateField(field){
      if(!field.checkValidity()){
        field.nextElementSibling.textContent = field.validationMessage;
        return false;
      }else{
        field.nextElementSibling.textContent = '';
        return true;
      }
    }

    // Меняем сообщение в зависимости от результата отправки
    function sendModalWindow(message){
      const popupContent = document.querySelector(".popup-content__form");
      overlayForm.classList.add('opened__form');
      popupContent.textContent = message;
    }

    // Закрываем модальное окно по клику на кнопку
    const popupCloseBtn = document.querySelector(".popup-close__form");
    popupCloseBtn.addEventListener('click', e => {
      overlayForm.classList.remove('opened__form');
    });

    // Закрываем окно, если нажали по overlay
    overlayForm.addEventListener('click', function(event){
      if(event.target == overlayForm){
        popupCloseBtn.click();
      }
    });
})();