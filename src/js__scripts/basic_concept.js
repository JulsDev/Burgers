// Типы данных и переменные
console.log('Типы данных и переменные');

var name = "Julia";
console.log(name);

name = "Daria";
console.log(name);


// Условный оператор if
console.log('\nУсловный оператор if');

var param = 5;
if(param <= 15){
  console.log("True statement!");
}
else{
  console.log("It's a Failed!")
}

// Циклический оператор for
console.log('\nЦиклический оператор for');
const count = 10;
for(var i=0; i < count; ++i){
  console.log(i);
}

// Функции
console.log('\nФункции');

function sum(p1, p2, p3){
  const p = p1 + p2 + p3;
  return p; 
}

var f_sum = sum(10, 20, 30);
console.log(f_sum);

f_sum = sum(5, 25, 45);
console.log(f_sum);

// Массивы и объекты. Задание 1
console.log('\nМассивы и объекты. Задание 1');

var arr = ['Привет, ', 'loftschool!'];
arr.push(' Я изучаю ');
arr.push('javascript.');

const len = arr.length;
console.log(len);

var str = '';
for(var i=0; i < len; i++){
  str += arr[i];
}
console.log(str);

// Массивы и объекты. Задание 2
console.log('\nМассивы и объекты. Задание 2');

var arr = ['5', '102', '34', '25', '131', '80', '198', '150', '21', '144'];

for(var i=0; i < arr.length; i++){
  if(arr[i] > 100){
    console.log(arr[i]);
  }
}

// Массивы и объекты. Задание 3
console.log('\nМассивы и объекты. Задание 3');

var obj = { 
  name: 'Julia',
  lastName: 'Aseeva',
  age: 28
};
console.log(obj.name + ' ' + obj.lastName + ', ' + obj.age + ' years');

obj.city = 'Moscow';
console.log(obj.name + ' ' + obj.lastName + ', ' + obj.age + ' years, ' + obj.city);


// Массивы и объекты. Задание 4
console.log('\nМассивы и объекты. Задание 4');

function hello(human){
  return 'Привет, меня зовут ' + human.name + ' ' + human.lastName + ' и мне ' + human.age + ' лет!';
}

var helloStr = hello(obj);
console.log(helloStr);