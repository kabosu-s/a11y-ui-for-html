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
      <button class="tab__button js-tab__button" aria-controls="tab-${index}">${tab.label}</button>
    `;
    })
    .join("");

  const tabPanels = tabs
    .map((tab, index) => {
      return /* html */ `
      <div class="tab__panel js-tab__panel" id="tab-${index}" aria-hidden="${index === 0 ? "false" : "true"}">${tab.content}</div>
    `;
    })
    .join("");

  return /* html */ `
    <div class="tab js-tab">
      <div class="tab__buttons">
        ${tabButtons}
      </div>
      <div class="tab__panels">
        ${tabPanels}
      </div>
    </div>
  `;
};
