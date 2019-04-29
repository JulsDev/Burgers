;
$(document).ready(function(){
  // Инициализация карты
  // вызовется тогда, когда API будет загружен и DOM сформирован
  ymaps.ready(init);

  var placemarks = [
    {
      latitude: 55.754323241007846,
      longitude: 37.620393,
      hintContent: '<div class="map__hint">Здесь лучшие бургеры!</div>',
      balloonContent: 'Красная площадь, 3, ГУМ'
    },
    {
      latitude: 55.74137016040367,
      longitude: 37.628704054786624,
      hintContent: '<div class="map__hint">Здесь лучшие бургеры!</div>',
      balloonContent: 'Пятницкая улица, 27с1'
    },
    {
      latitude: 55.774983068966485,
      longitude: 37.64350649999991,
      hintContent: '<div class="map__hint">Здесь лучшие бургеры!</div>',
      balloonContent: 'Докучаев переулок, 9с1'
    },
    {
      latitude: 55.76261664481636,
      longitude: 37.57945699999994,
      hintContent: '<div class="map__hint">Здесь лучшие бургеры!</div>',
      balloonContent: 'Большая Грузинская ул., 2/12с1'
    },
  ],
    geoObjects = [];


  function init(){
    // Создание карты
    // На вход: центр карты (широта, долгота) и масштаб
    var map = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 12,
      controls: ['zoomControl'],
      behaviors: ['drag']                 // поведение карты по умолчанию 
      }, {
      searchControlProvider: 'yandex#search'
    });

    // Создаем метки
    for(var i=0; i < placemarks.length; i++){
      geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude], {
        hintContent: placemarks[i].hintContent,
        balloonContent: placemarks[i].balloonContent
      }, {
        iconLayout: 'default#image',
        iconImageHref: './img/contacts/map-marker.png',
        iconImageSize: [46, 58],
        iconImageOffset: [-23, -57]
      });
    }

    // Создание кластера для меток, расположенных рядом
    var clasterer = new ymaps.Clusterer({});
    // Добавление кластера
    map.geoObjects.add(clasterer);
    // Добавляем метку в кластер
    clasterer.add(geoObjects)
  }

});