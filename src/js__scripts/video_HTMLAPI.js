
// Версия без YouTube

$(document).ready(function(){
  
  let interval;

  // Обработка нажатия на video 
  video = document.getElementById("player"); 
  video.addEventListener('click', clickPlayButton);
  
  // Обработка нажатия на кнопки Play
  bigVideoButton = document.querySelector(".video__player-btn");
  smallVideoButton = document.querySelector(".video__playpause-btn");
  bigVideoButton.addEventListener('click', clickPlayButton);
  smallVideoButton.addEventListener('click', clickPlayButton);
  
  // Обработка нажатия на ползунок проигрывателя
  progressBar = document.querySelector(".video__progress-bar");
  progressCurrent = progressBar.querySelector(".video__progress-current");

  video.addEventListener('timeupdate', updateProgressBar, false);
  progressBar.addEventListener('click', setCurrentTime);

  // Обработка нажатия на рупор и ползунок громкости
  volumeButton = document.querySelector(".video__volume-btn");
  volumeButton.addEventListener('click', clickOnVolumeBtn);
  
  volumeBar = document.querySelector(".video__volume-bar");
  volumeCurrent = document.querySelector(".video__volume-current");
  video.addEventListener('volumechange', updateVolumeControls);
  volumeBar.addEventListener('click', setCurrentVolume);
  



  function clickPlayButton(){
    // Скрываем центральную кнопку, если видео проигрывается
    $(".video__player-btn").toggleClass("video__player-btn--active");
    
    // Выставляем ползунок громкости на полную
    video.muted = false;
    volumeCurrent.style.width = `100%`;

    // Если видео не проигрывалось
    if(video.paused){

      video.play();
      // запускает выполнение функции через указанный интервал времени
      interval = setInterval(() => {
          // Рассчитываем процент и на него сдвигаем ползунок
          const percents = video.currentTime / video.duration * 100;
          changeBarPosition(percents);
      }, 1000);

    } else {
      video.pause();
      // остановка исполения
      clearInterval(interval);
    }
  }

  // ---- проигрыватель ---- //
  // Сдвигаем ползунок на заданный процент
  function changeBarPosition(percents) {
    progressBar = document.querySelector(".video__progress-current");
    progressBar.style.width = `${percents}%`;
  }
  // Сдвигаем ползунок play по щелчку
  function updateProgressBar() {
    let progress = Math.floor(video.currentTime / video.duration * 100);
    progressCurrent.style.width = `${progress}%`;
  }

  function setCurrentTime(evt) {
      let offset = evt.layerX / evt.currentTarget.offsetWidth;
      video.currentTime = Math.floor(offset * video.duration);
  }

  // ---- звук ---- //
  // Обработка нажатия на рупор
  function clickOnVolumeBtn(){
    // Если звук не был отключен, то отключаем
    if(!video.muted){
      video.volume = 0;
      volumeButton.classList.add("video__volume-btn--muted");
      video.muted = true;
      volumeCurrent.style.width = `0%`;
    } else {
      video.volume = 1;
      volumeButton.classList.remove("video__volume-btn--muted");
      video.muted = false;
      volumeCurrent.style.width = `100%`;
    }
  }

  function updateVolumeControls() {
    let progress = Math.floor(video.volume * 100);
    volumeCurrent.style.width = `${progress}%`;
  }

  function setCurrentVolume(evt) {
    let offset = evt.layerX / evt.currentTarget.offsetWidth;
    video.volume = Math.round(offset * 10) / 10;
    video.muted = false;
  }

});

