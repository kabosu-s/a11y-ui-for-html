export const tab = () => {
  const tabs = document.getElementsByClassName('js-tab') as HTMLCollectionOf<HTMLElement>;

  if (!tabs) return;

  const _closeAllTabs = (contents: HTMLCollectionOf<Element>, buttons: HTMLCollectionOf<Element>) => {
    for (const content of Array.from(contents)) {
      content.setAttribute('aria-hidden', 'true');
    }
    for (const button of Array.from(buttons)) {
      button.setAttribute('aria-selected', 'false');
    }
  };

  const _openTab = (tab: HTMLElement, targetId: string, button: Element) => {
    const target = tab.querySelector(`#${targetId}`);

    target?.setAttribute('aria-hidden', 'false');
    button.setAttribute('aria-selected', 'true');
  };

  for (const tab of Array.from(tabs)) {
    const tabButtons = tab.getElementsByClassName('js-tab_button');
    const tabPanel = tab.getElementsByClassName('js-tab_panel');

    // タブリストのロール設定
    const tabList = tab.querySelector('.tab_buttons');
    if (tabList) {
      tabList.setAttribute('role', 'tablist');
    }

    // 初期状態の設定
    const firstButton = tabButtons[0];
    if (firstButton) {
      firstButton.setAttribute('aria-selected', 'true');
    }

    for (const button of Array.from(tabButtons)) {
      // タブボタンのロール設定
      button.setAttribute('role', 'tab');
      
      // キーボード操作のサポート
      button.addEventListener('keydown', (e: Event) => {
        const keyboardEvent = e as KeyboardEvent;
        const currentIndex = Array.from(tabButtons).indexOf(button);
        let targetIndex;

        switch (keyboardEvent.key) {
          case 'ArrowRight':
            keyboardEvent.preventDefault();
            targetIndex = (currentIndex + 1) % tabButtons.length;
            break;
          case 'ArrowLeft':
            keyboardEvent.preventDefault();
            targetIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
            break;
          case 'Home':
            keyboardEvent.preventDefault();
            targetIndex = 0;
            break;
          case 'End':
            keyboardEvent.preventDefault();
            targetIndex = tabButtons.length - 1;
            break;
          case 'Enter':
            keyboardEvent.preventDefault();
            const targetId = button.getAttribute('aria-controls');
            if (targetId) {
              _closeAllTabs(tabPanel, tabButtons);
              _openTab(tab, targetId, button);
            }
            return;
          default:
            return;
        }

        const targetButton = tabButtons[targetIndex];
        const targetId = targetButton.getAttribute('aria-controls');

        if (targetId) {
          _closeAllTabs(tabPanel, tabButtons);
          _openTab(tab, targetId, targetButton);
          (targetButton as HTMLElement).focus();
        }
      });

      button.addEventListener('click', () => {
        const targetId = button.getAttribute('aria-controls');

        if (!targetId) return;

        _closeAllTabs(tabPanel, tabButtons);
        _openTab(tab, targetId, button);
      });
    }
  }
};
