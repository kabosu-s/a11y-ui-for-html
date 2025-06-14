import './style.css';
import { Tabset } from './method.js';
/**
 * コンポーネント
 */
export const createTemplate = () => {
  //jsはmethod.jsを参照
  Tabset();
    //HTMLの例
  return [
    `
<div class="tab js-tab">
  <div class="tab_btns" role="tablist">
  <button 
    class="tab_btn js-tab_btn" 
    role="tab"
    aria-selected="true"
    aria-controls="tab-0"
    tabindex="0"
  >タブ 1</button>
  <button 
    class="tab_btn js-tab_btn" 
    role="tab"
    aria-selected="false"
    aria-controls="tab-1"
    tabindex="0"
  >タブ 2</button>
  </div>
  <div class="tab_panels">
  <div 
    class="tab_panel js-tab_panel" 
    id="tab-0" 
    role="tabpanel"
    aria-labelledby="tab-0"
    aria-hidden="false"
  >タブ1のコンテンツです。</div>
  <div 
    class="tab_panel js-tab_panel" 
    id="tab-1" 
    role="tabpanel"
    aria-labelledby="tab-1"
    aria-hidden="true"
  >タブ2のコンテンツです。</div>
  </div>
</div>
    `,
  ].join('\n');
};
