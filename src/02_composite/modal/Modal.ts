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
      data-open-modal="modal1" //対象のモーダルID
      data-default-open="false" //先に開いておくかどうか
      class="btn btn_medium btn_primary"
    >モーダルを開く</button>
  </div>
  <dialog 
    id="modal1"
    class="modal"
    aria-labelledby="modal1_label"
    aria-modal="true"
    aria-hidden="true"
  >
  <div class="overlay"></div>
    <div class="modal_inner">
    <button data-close-modal="modal1" class="close_btn" aria-label="モーダルを閉じる">×</button>
      <h2 id="modal1_label">モーダルタイトル</h2>
        <div class="body">
          <p>ここにモーダルの本文が入ります。</p>
        </div>
        <div class="footer button-wrap">
        <button 
          data-open-modal="modal2" 
          data-default-open="false"
          class="btn btn_medium btn_primary"
        >モーダル2を開く</button>
        </div>
      </div>
    </div>
  </dialog>
  <dialog 
    id="modal2"
    class="modal"
    aria-labelledby="modal2_label"
    aria-modal="true"
    aria-hidden="true"
  >
  <div class="overlay"></div>
    <div class="modal_inner">
    <button data-close-modal="modal2" class="close_btn" aria-label="モーダルを閉じる">×</button>
      <h2 id="modal2_label">モーダルタイトル</h2>
        <div class="body">
          <p>ここにモーダルの本文が入ります。</p>
        </div>
      </div>
    </div>
  </dialog>
  `].join('\n');
};
