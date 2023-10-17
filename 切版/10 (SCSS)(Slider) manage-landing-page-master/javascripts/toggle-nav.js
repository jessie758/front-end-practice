const navTogglerWrapper = document.querySelector('.nav-toggler-wrapper');
const navTogglers = [...navTogglerWrapper.children];
const navList = document.querySelector('.nav-list');
const htmlBody = document.querySelector('html');

navTogglerWrapper.addEventListener('click', (e) => {
  navTogglers.forEach((navToggler) => navToggler.classList.toggle('d-none'));
  navList.classList.toggle('visible');
  htmlBody.classList.toggle('darken');
});