const BASE_URL = 'https://rel.ink/';
const links = new Map();  // 儲存對應的短網址&原網址

// 小寫(a-z)、大寫(A-Z)、數字(0-9) 的 ASCII code
const charCodes = new Map();
charCodes.set('lowercase', [97, 122]);
charCodes.set('uppercase', [65, 90]);
charCodes.set('number', [48, 57]);

// 用來產生短網址末5碼亂數的字元
let chars = '';
charCodes.forEach((value) => {
  let [lower, upper] = value;
  for (let i = lower; i <= upper; i++) {
    chars += String.fromCharCode(i);
  }
});

function getShortenedURL(url, numOfChar) {
  let shortenedURL = '';
  let alreadyShortened = false;

  if (Array.from(links.values()).includes(url)) {
    // 如果使用者輸入的url已被縮短過，則回傳該相同的短網址
    let index = Array.from(links.values()).findIndex((link) => link === url);
    let shortenedURLs = Array.from(links.keys());
    shortenedURL = shortenedURLs[index];
    alreadyShortened = !alreadyShortened;
  } else {
    // 如果產生的短網址有所重複，則再次產生新的短網址
    do {
      let hash = '';
      for (let i = 0; i < numOfChar; i++) {
        let index = Math.floor(Math.random() * chars.length);
        hash += chars[index];
      }
      shortenedURL = `${BASE_URL}${hash}`;
    } while (links.get(shortenedURL));

    links.set(shortenedURL, url);
  }

  return [shortenedURL, alreadyShortened];
}

function getOriginalURL(hash) {
  return links.get(`${BASE_URL}${hash}`);
}
