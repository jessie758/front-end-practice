function changeCopyBtnStyle(btn) {
  btn.classList.add('copied');
  btn.innerText = 'Copied!';
}

async function copyURL(url) {
  try {
    await navigator.clipboard.writeText(url);
    alert(`URL Copied: ${url}`);
  } catch (error) {
    console.log(error);
  }
}

urlPanel.addEventListener('click', async (e) => {
  if (!e.target.classList.contains('copy-btn')) return;

  const copyBtn = e.target;
  const url = copyBtn.dataset.shortenedUrl;

  // change the style of copy button & copy the url
  changeCopyBtnStyle(copyBtn);
  copyURL(url);
});
