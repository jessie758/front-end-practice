/*
  參考：
  １
  https://github.com/dustinhsiao21/Javascript30-dustin/tree/master/11%20-%20Custom%20Video%20Player
  ２
  https://ithelp.ithome.com.tw/articles/10205323
  ３
  https://pjchender.dev/js30/js30-day11/
  ４
  https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs

  挑戰：
  全螢幕播放

*/

/**
 * 目標：
 * 透過controls控制影片的播放
 *
 * 開發流程：
 * 抓取controls元素
 * 監聽controls事件
 * (觸發事件時取得controls的值並調整影片播放)
 * －播放
 *    改變圖樣
 *    播放影片
 *      點擊按鈕/影片播放，再次點擊則暫停播放
 * －進度條
 *    隨著影片播放更新進度條
 *      取得影片播放進度
 *      更新進度條長度
 *    點擊/拖動進度條更新影片進度
 *      取得滑鼠點擊/拖動的位置
 *      更新進度條長度
 *      更新影片進度
 * －音量、播放速度、快進快退
 *    取得值(input/dataset)
 *    更新影片的屬性值
 */

// 法一：將監聽器設置在父元素上

const player = document.querySelector('.player');
const controller = document.querySelector('.player__controls');
const video = document.querySelector('.player__video');
const progressBar = document.querySelector('.progress-bar');
const playerBtn = document.querySelector('.player__button');
let playing = false;

function updateProgressBar(width) {
  progressBar.style.width = width;
}

function updateVideo(prop, value) {
  video[prop] = value;
}

function onProgressChange(e) {
  // 更新進度條
  const width = `${e.clientX}px`;
  updateProgressBar(width);
  // 更新影片進度
  const time = (e.clientX / controller.clientWidth) * video.duration;
  updateVideo('currentTime', time);
}

video.addEventListener('timeupdate', (e) => {
  // 計算影片播放進度%數
  const percent = `${
    Math.round((video.currentTime / video.duration) * 10000) / 100
  }%`;
  // 更新進度條
  updateProgressBar(percent);
});

player.addEventListener('click', (e) => {
  const element = e.target;

  if (
    element.classList.contains('toggle') ||
    element.classList.contains('viewer')
  ) {
    if (playing) {
      playerBtn.innerText = '►';
      video.pause();
    } else {
      playerBtn.innerText = '❚❚';
      video.play();
    }
    playing = !playing;
  }

  if (element.className.includes('progress')) {
    onProgressChange(e);
  }

  if (element.classList.contains('volume')) {
    const volume = element.value;
    updateVideo('volume', volume);
  }

  if (element.classList.contains('speed')) {
    const speed = element.value;
    updateVideo('playbackRate', speed);
  }

  if (element.classList.contains('skip')) {
    const skipAmount = Number(element.dataset.skip);
    const time = Math.min(
      Math.max(video.currentTime + skipAmount, 0),
      video.duration
    );
    updateVideo('currentTime', time);
  }
});

controller.addEventListener('mousedown', (e) => {
  if (e.target.className.includes('progress'))
    controller.addEventListener('mousemove', onProgressChange);
});

controller.addEventListener('mouseup', () => {
  controller.removeEventListener('mousemove', onProgressChange);
});
