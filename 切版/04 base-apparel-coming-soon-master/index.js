const emailForm = document.querySelector('.email-form');

emailForm.addEventListener('submit', (e) => {
  emailForm.classList.add('validated');
  if (!emailForm.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();
  }
});
