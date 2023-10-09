const nav = document.querySelector('nav');

nav.addEventListener('click', (e) => {
  if (!e.target.classList.contains('nav-toggler-wrapper')) return;

  const navToggler = e.target.firstElementChild;
  const navList = e.target.nextElementSibling;
  navToggler.classList.toggle('clicked');
  navList.classList.toggle('visible');
});
