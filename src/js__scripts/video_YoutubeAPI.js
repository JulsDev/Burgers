// This function creates an <iframe> (and YouTube player)
// after the API code downloads.

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video_player-id', {
    height: '405',
    width: '660',
    videoId: 'ISOsErt6oQQ',
    // Отключаем параметры, которые нам не нужны
    playerVars:{
      'autoplay': 0,
      'controls': 0,
      'disablekb': 0,
      'iv_load_policy': 3,
      'modestbranding': 0,
      'rel': 0,
      'showinfo': 0
    },

    events: {
    'onReady': onPlayerReady,
    //'onStateChange': onPlayerStateChange
    }
  });
}

// Запускаем видео и каждую секунду отслеживаем состояние
function onPlayerReady(event) {

  let interval;
  clearInterval(interval);

  interval = setInterval(() => {
    // Рассчитываем процент и на него сдвигаем ползунок
    const percents = (player.getCurrentTime() / player.getDuration()) * 100;
    changeButtonPosition(percents);
  }, 1000);
}


// Обработка нажатия на кнопку Play (маленькая)
$(".video__playpause-btn").on("click", e => {
  const playerStatus = player.getPlayerState();
  // Убираем центральную кнопку play
  const mainPlayBtn = $(".video__player-icon");
  // 1 - видео проигрывается
  if (playerStatus !== 1) {
    player.playVideo();
    mainPlayBtn.css({"opacity" : 0});
  } else {
    player.pauseVideo();
    mainPlayBtn.css({"opacity" : 1});
  }
});
// Обработка нажатия на кнопку Play (центральная)
$(".video__player-btn").on("click", e => {
  const playerStatus = player.getPlayerState();
  const mainPlayBtn = $(".video__player-icon");
  // 1 - видео проигрывается
  if (playerStatus !== 1) {
    player.playVideo();
    mainPlayBtn.css({"opacity" : 0});
  } else {
    player.pauseVideo();
    mainPlayBtn.css({"opacity" : 1});
  }
});

// Меняем состояние "включен" на "пауза" и обратно
function onPlayerStateChange(event) {
  
  const playerButton = $(".video__playpause-btn");

  switch (event.data) {
    case 1:
      $(".video_player-wrapper").addClass("active");
      playerButton.addClass("paused");
      break;
    case 2: 
      playerButton.removeClass("paused");
      break;
  }
}

// При клике на линию прогресса (play-pause)
// перемещаем кружок
$(".video__progress-bar").on("click", e => {
  e.preventDefault();
  const bar = $(e.currentTarget);
  // Отмеряем, насколько пикселей сдвинулись
  const newButtonPosition = e.originalEvent.layerX;
  // Пересчитываем в проценты
  const clickedPercents = (newButtonPosition / bar.width()) * 100;
  const newPlayerTime = (player.getDuration() / 100) * clickedPercents;
  
  // Визуально сдвигаем ползунок
  changeButtonPosition(clickedPercents);
  // Проигрыватель начинает воспроизведение с момента времени, указанного в вызове функции seekTo()
  player.seekTo(newPlayerTime);
});
// Сдвигаем ползунок на заданный процент
function changeButtonPosition(percents) {
  $(".video__progress-current").css({
    width: `${percents}%`
  });
}

