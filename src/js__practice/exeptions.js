(function(){
    // Здание 1
    function filter_first(input, than) {

      let newArr = [];
    
      input.forEach(function(element){
        if(element > than){
          newArr.push(element);
        }
      });

      return newArr;
    }
      

    // Здание 2
    function filter_second(input, than) {

      let newArr = [];
    
      try {
        if(input.length == 0){
          throw new Error('В input передан пустой массив');
        }

        input.forEach(function(element){
          
          // Хотя бы один из элементов input не является числом
          if(!isFinite(element)){
            throw new Error('input не является числом');
          }
          // Хотя бы один из элементов input является отрицательным числом
          if(element < 0){
            throw new Error('input является отрицательным числом');
          }
          // Подходящий элемент
          if(element > than){
            newArr.push(element);
          }
        });

      } catch (e) {
        console.log(e.message);   
      }

      return newArr;
    }

  var array = [12, 100, 34, 65, 10];
  var result = filter_second(array, 60);
  
  console.log(result);
  
  result = filter_second(array, 20);
  console.log(result);
  
  result = filter_second([], 43);
  console.log(result);

  result = filter_second([2, 'k', 4, 9], 2);
  console.log(result);
  
})();