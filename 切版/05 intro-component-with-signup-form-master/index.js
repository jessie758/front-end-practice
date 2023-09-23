const registrationForm = document.querySelector('.registration-form form');

registrationForm.addEventListener('submit', (e) => {
  registrationForm.classList.add('validated');
  if (!registrationForm.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();
  }
});
