const urlForm = document.querySelector('#shortener form');
const urlInput = document.querySelector('input.url');
const urlPanel = document.querySelector('.url-panel');

function displayURL(url, shortenedURL, alreadyShortened) {
  if (alreadyShortened) {
    alert('This URL has been shortened, please try another one!');
    return;
  } else {
    const urlDisplayHTML = `
      <div class="original-url">${url}</div>
      <div class="gray-line"></div>
      <div class="shortened-url">${shortenedURL}</div>
      <div class="copy">
        <button
          type="button"
          class="copy-btn very-light-rounded"
          data-shortened-url="${shortenedURL}"
        >
          Copy
        </button>
      </div>
    `;
    const urlItem = document.createElement('div');
    urlItem.classList.add('item');
    urlItem.innerHTML = urlDisplayHTML;
    urlPanel.append(urlItem);
  }
}

urlForm.addEventListener('submit', (e) => {
  // form validation
  urlForm.classList.add('validated');
  if (!urlForm.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  // shorten & display url
  const url = urlInput.value;
  const [shortenedURL, alreadyShortened] = getShortenedURL(url, 6);
  displayURL(url, shortenedURL, alreadyShortened);

  // remove validation status
  urlForm.classList.remove('validated');
});
