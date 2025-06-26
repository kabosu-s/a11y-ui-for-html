import './style.css';
import { Hamburgerset } from './method.js';

/**
 * コンポーネント
 */
export const createTemplate = () => {
  //jsはmethod.jsを参照
  Hamburgerset();
  //HTMLの例
  return [
    `
    <div id="navContainer">
      <button id="hamburgerButton" aria-label="メニューを開く">☰</button>
      <nav id="navMenu" class="menu" aria-hidden="true">
      <ul>
        <li><a href="#">ホーム</a></li>
        <li><a href="#">サービス</a></li>
        <li><a href="#">会社概要</a></li>
      </ul>
      </nav>
    </div>
    `,
  ].join('\n');
};
