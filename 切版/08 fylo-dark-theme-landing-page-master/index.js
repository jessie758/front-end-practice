const signUpForm = document.querySelector('#sign-up form');

signUpForm.addEventListener('submit', (e) => {
  signUpForm.classList.add('validated');
  if (!signUpForm.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();
  }
});
