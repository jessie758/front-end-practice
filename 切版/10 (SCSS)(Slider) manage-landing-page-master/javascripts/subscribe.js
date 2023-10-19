const subsForm = document.querySelector('#subscription form');

subsForm.addEventListener('submit', (e) => {
  subsForm.classList.add('validated');
  if (!subsForm.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();
  }
});
