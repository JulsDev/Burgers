(function(){
    // Задание 1
    var mydiv = document.createElement('div');
    mydiv.innerHTML = "Этот элемент создан пр помощи DOM API";
    document.body.appendChild(mydiv);

    // Задание 2
    var innerDiv = document.createElement('div');
    innerDiv.className = "inner";
    innerDiv.innerHTML = "Этот элемент тоже создан при помощи DOM API";
    mydiv.appendChild(innerDiv);

    // Задание 3
    innerDiv.style.color = 'red';

    // Задание 4
    mydiv.addEventListener('click', function(){
      console.log('Этот текст говорит о том, что я все сделал правильно');
    })

    // Задание 5
    var link = document.createElement('a');
    link.setAttribute('href', 'https://loftschool.com');
    link.innerText = "А я ссылка, по которой нельзя никуда перейти!";
    document.body.appendChild(link);

    link.addEventListener('click', function(){
      event.preventDefault();
      console.log('Я кликнул на ссылку ' + link.href);
    })

    // Просто, чтобы отделить формочку
    const elem1 = document.createElement('div');
    const elem2 = document.createElement('div');
    elem1.innerText = ">";
    elem2.innerText = ">";
    document.body.appendChild(elem1);
    document.body.appendChild(elem2);


    // Задание 6
    var input = document.createElement('input');
    input.setAttribute('id', 'inputText');

    var button = document.createElement('button');
    button.setAttribute('id', 'inputButton');
    button.innerText = "Click";

    document.body.appendChild(input);
    document.body.appendChild(button);

    button.addEventListener('click', function(){
      var inputVal = document.getElementsByTagName("input")[0].value;
      console.log(inputVal); 
    })
})();
