const sliderItems = [...document.querySelectorAll('.slider .item')];
const width = Number(getComputedStyle(sliderItems[0]).width.slice(0, -2));
const itemCount = sliderItems.length;
const itemWrapper = document.querySelector('.slider .item-wrapper');
const indicatorPanel = document.querySelector('.indicator-panel');

const sliderItemLabel = ['one', 'two', 'three'];
let index = 1;

function mobileSlide() {
  const position = index * width * -1;
  itemWrapper.style.left = `${position}px`;
}

function desktopSlide() {
  // sliderItems.forEach((slideItem) => slideItem.className = 'item');
  // for (let i = 0; i < 3; i++) {
  //   sliderItems[index + i].classList.add(sliderItemLabel[i]);
  // }
  let position = index * width + width / 2;
  
}

// 前面的item寬度 + gap + 自身寬度一半

function slide() {
  if (window.innerWidth < 1000) mobileSlide();
  else desktopSlide();
}

function autoSlide() {
  setInterval(() => {
    index++;
    if (index > itemCount - 1) index = 0;

    const targetIndicator = indicatorPanel.querySelector(`[data-id="${index}"]`);
    changeIndicatorStyle(targetIndicator);
    slide();
  }, 3000);
}

function changeIndicatorStyle(target) {
  indicatorPanel.querySelector('.active').classList.remove('active');
  target.classList.add('active');
}

function setIndicatorEvent() {
  const indicators = [...document.querySelectorAll('.indicator')];
  indicators.forEach((indicator) => {
    indicator.addEventListener('click', (e) => {
      index = Number(indicator.dataset.id);
      changeIndicatorStyle(indicator)
      slide();
    });
  });

  // autoSlide();
}

function renderIndicator() {
  let HTML = '';
  for (let i = 0; i < itemCount; i++) {
    HTML += `
      <div class="indicator ${
        i === index ? 'active' : ''
      }" data-id="${i}"></div>
    `;
  }
  indicatorPanel.innerHTML = HTML;
}

renderIndicator();
setIndicatorEvent();
slide();
