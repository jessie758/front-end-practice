/**
 * Ｑ. 哪些資料/樣式要用JS動態產生？
 *
 * 狀態機
 * 1. 付費期數/billing/toggler: annually、monthly
 * 2. 方案顏色/plan/highlight: white、purple
 */

/*
const prices = {
  basic: ['$19.99', '$199.99'],
  pro: ['$24.99', '$249.99'],
  master: ['$39.99', '$399.99']
}
*/
const prices = {
  annually: ['199.99', '249.99', '399.99'],
  monthly: ['19.99', '24.99', '39.99'],
};
const billings = {
  annually: 'annually',
  monthly: 'monthly',
};
let billing = billings.annually;

const toggler = document.querySelector('.toggler');
const togglerCircle = document.querySelector('.toggler .circle');
const priceElements = [...document.querySelectorAll('.plan .price')];

function toggleBilling() {
  if (billing === billings.annually) billing = billings.monthly;
  else billing = billings.annually;
}

function renderToggler() {
  const togglerWidth = toggler.clientWidth;
  const circleWidth = togglerCircle.clientWidth;
  const circleMargin = Number(
    window
      .getComputedStyle(togglerCircle)
      .getPropertyValue('left')
      .split('px')[0]
  );
  const displacement = togglerWidth - circleWidth - circleMargin * 2;

  if (billing === billings.annually)
    togglerCircle.style.transform = 'translate(0, -50%)';
  else togglerCircle.style.transform = `translate(${displacement}px, -50%)`;
}

function renderPrice() {
  priceElements.forEach((priceElement, index) => {
    priceElement.innerHTML = `
      <span class="dollar-sign">$</span>${prices[billing][index]}
    `;
  });
}

toggler.addEventListener('click', (e) => {
  toggleBilling();
  renderToggler();
  renderPrice();
});

renderPrice();
