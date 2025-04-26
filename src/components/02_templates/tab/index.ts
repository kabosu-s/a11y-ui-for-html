import "./tab.css";
import { tab } from "./tab.ts";

export interface TabProps {
  tabs: {
    label: string;
    content: string;
  }[];
}

export const createTemplate = ({ tabs }: TabProps) => {
  queueMicrotask(() => {
    tab();
  })

  const tabButtons = tabs
    .map((tab, index) => {
      return /* html */ `
      <button 
        class="tab_button js-tab_button" 
        role="tab"
        aria-selected="${index === 0 ? 'true' : 'false'}"
        aria-controls="tab-${index}"
        tabindex="0"
      >${tab.label}</button>
    `;
    })
    .join("");

  const tabPanels = tabs
    .map((tab, index) => {
      return /* html */ `
      <div 
        class="tab_panel js-tab_panel" 
        id="tab-${index}" 
        role="tabpanel"
        aria-labelledby="tab-${index}"
        aria-hidden="${index === 0 ? "false" : "true"}"
      >${tab.content}</div>
    `;
    })
    .join("");

  return /* html */ `
    <div class="tab js-tab">
      <div class="tab_buttons" role="tablist">
        ${tabButtons}
      </div>
      <div class="tab_panels">
        ${tabPanels}
      </div>
    </div>
  `;
};
