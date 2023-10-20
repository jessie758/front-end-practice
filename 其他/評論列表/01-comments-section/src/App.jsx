/**
 * 1. 渲染評論列表
 *    - 使用useState追蹤評論的狀態
 *
 * 2. 切換模式
 *    - 點擊nav顯示模式後改變nav樣式
 *    - 根據點選的模式排序評論列表
 * 
 * 3. 評論刪除功能
 *    - 自己的評論才能刪除(條件判斷)
 *    - 刪除後評論消失不再顯示(透過id)
 */

import { useState } from 'react';
import './App.scss';

// 評論
const list = [
  {
    rpid: 25169,
    user: {
      uid: '32451',
      avatar: 'https://fakeimg.pl/100x100/?text=img',
      uname: '瓜哥',
    },
    content: '下面一位',
    ctime: '10-10 21:43',
    like: 11,
  },
  {
    rpid: 13298,
    user: {
      uid: '13542',
      avatar: 'https://fakeimg.pl/100x100/?text=img',
      uname: '周杰倫',
    },
    content: '哎唷！不錯喔',
    ctime: '10-15 18:32',
    like: 22,
  },
  {
    rpid: 36275,
    user: {
      uid: '25341',
      avatar: 'https://fakeimg.pl/100x100/?text=img',
      uname: '劉謙',
    },
    content: '接下來就是見證奇蹟的時刻！',
    ctime: '10-18 09:26',
    like: 33,
  },
];

// 使用者
const user = {
  uid: '13542',
  avatar: 'https://fakeimg.pl/100x100/?text=img',
  uname: '周杰倫',
};

// navbar
const modes = [
  { mode: 'time', text: '最新' },
  { mode: 'hot', text: '熱門' },
];

function App() {
  const [comments, setComments] = useState(list);
  const [mode, setMode] = useState(modes[0].mode);

  // 切換模式
  function handleModeChange(mode) {
    setMode(mode);
  }

  // 刪除功能
  function handleDel(id) {
    const copiedList = JSON.parse(JSON.stringify(comments));
    const modifiedList = copiedList.filter((item) => item.rpid !== id);
    setComments(modifiedList);
  }

  return (
    <section id="comments-section">
      {/* navbar */}
      <div className="nav">
        <div className="nav-title">評論</div>
        <ul className="nav-list">
          {modes.map((item, index) => (
            <li
              className={`nav-item ${item.mode === mode && 'active'}`}
              key={item.mode}
              onClick={() => handleModeChange(item.mode)}
            >
              {index > 0 ? <div className="separator"></div> : ''}
              {item.text}
            </li>
          ))}
        </ul>
      </div>

      {/* 發表評論 */}
      <div className="post">
        <div className="avatar">
          <img src={user.avatar} alt="user image" className="avatar-img" />
        </div>
        <form action="#">
          <textarea
            name="comment"
            id="comment"
            rows="1"
            placeholder="請輸入評論內容..."
          ></textarea>
          <button type="submit">送出</button>
        </form>
      </div>

      {/* 評論列表 */}
      <div className="list">
        {/* 評論 */}
        {comments.map((item, index) => (
          <div className="item" key={item.rpid}>
            {/* 使用者頭像 */}
            <div className="left-wrapper avatar">
              <img
                src={item.user.avatar}
                alt="user image"
                className="avatar-img"
              />
            </div>
            <div className={`right-wrapper ${index > 0 ? 'separator' : ''}`}>
              {/* 使用者名稱 */}
              <div className="user-name">{item.user.uname}</div>
              {/* 評論內容 */}
              <div className="content-wrapper">
                <div className="content">{item.content}</div>
                <div className="info-wrapper">
                  <span className="info time">{item.ctime}</span>
                  <span className="info like">按讚數: {item.like}</span>
                  {item.user.uid === user.uid && (
                    <span
                      className="info delete-btn"
                      onClick={() => handleDel(item.rpid)}
                    >
                      刪除
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
