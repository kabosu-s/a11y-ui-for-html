import './style.css';
import { Accordionset } from './method.js';

/**
 * コンポーネント
 */
export const createTemplate = () => {
  //jsはmethod.jsを参照
  Accordionset();
  //HTMLの例
  return [
    `
    <details class="js_accordion accordion">
      <summary class="accordion_header">アコーディオンのタイトル</summary>
      <div class="accordion_content">
        <div class="accordion_inner">
          アコーディオンの中身
        </div>
      </div>
    </details>
    `,
  ].join('\n');
};
