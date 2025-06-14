import '../../01_component/button/button.css';
import './style.css';
import { Modalset } from './method.js';

/**
 * コンポーネント
 */
export const createTemplate = () => {
  //jsはmethod.jsを参照
  Modalset();
  //HTMLの例
  return [`
  <div class="btn_area">
    <button 
      data-open-modal="modal" 
      data-default-open="false"
      class="btn btn_medium btn_primary"
    >モーダルを開く</button>
    <a href="#aa">a</a>
    <a href="#aa">a</a>
        <a href="#aa">a</a>
    <a href="#aa">a</a>
        <a href="#aa">a</a>
    <a href="#aa">a</a>
  </div>
  <dialog 
    id="modal"
    class="modal"
    aria-labelledby="modal-title"
    aria-modal="true"
    aria-hidden="true"
  >
  <div class="overlay"></div>
    <div class="dialog">
      <h2>モーダルタイトル</h2>
        <div class="body">
          <p>ここにモーダルの本文が入ります。</p>
        </div>
        <div class="button-wrap">
          <button class="btn-modal btn-outline js-cancel-btn" type="button">キャンセル</button>
    <button 
      data-open-modal="modal2" 
      data-default-open="false"
      class="btn btn_medium btn_primary"
    >モーダルを開く</button>
        </div>
      </div>
      <button data-close-modal="modal" class="close_btn" aria-label="閉じる">×</button>
    </div>
  </dialog>

    <dialog 
    id="modal2"
    class="modal"
    aria-labelledby="modal-title"
    aria-modal="true"
    aria-hidden="true"
  >
  <div class="overlay"></div>
    <div class="dialog">
      <h2>モーダルタイトル</h2>
        <div class="body">
          <p>ここにモーダルの本文が入ります。</p>
        </div>
        <div class="button-wrap">
          <button class="btn-modal btn-outline js-cancel-btn" type="button">キャンセル</button>
          <button class="btn-modal js-ok-btn" type="button">ログインする</button>
        </div>
      </div>
      <button data-close-modal="modal" class="close_btn" aria-label="閉じる">×</button>
    </div>
  </dialog>
  `].join('\n');
};
