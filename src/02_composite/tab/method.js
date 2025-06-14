
export const Tabset = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const tablists = document.querySelectorAll('[role="tablist"]');
    tablists.forEach(tablist => new Tab(tablist));
  });
};

class Tab {
  constructor(tablist) {
    this.tablist = tablist;
    this.buttons = Array.from(tablist.querySelectorAll('[role="tab"]'));
    this.tablist.setAttribute('aria-orientation', 'horizontal');
    this.init();
  }

  init() {
    this.buttons.forEach((btn, index) => {
      const panelId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);

      // 初期状態のセット
      btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      btn.setAttribute('tabindex', '0');

      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', btn.id);
      panel.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
      panel.setAttribute('aria-live', 'polite');
      panel.style.display = index === 0 ? '' : 'none';

      // イベント登録
      btn.addEventListener('click', () => {
        this.closeAllTabs();
        this.openTab(btn);
        btn.focus();
      });

      btn.addEventListener('keydown', (e) => this.handleKeydown(e, btn));
    });
  }

  closeAllTabs() {
    this.buttons.forEach((btn) => {
      const panelId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      panel.setAttribute('aria-hidden', 'true');
      panel.style.display = 'none';
      btn.setAttribute('aria-selected', 'false');
    });
  }

  openTab(button) {
    const panelId = button.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);

    panel.setAttribute('aria-hidden', 'false');
    panel.style.display = '';
    panel.setAttribute('tabindex', '-1');
    panel.focus();

    button.setAttribute('aria-selected', 'true');
  }

  handleKeydown(e, btn) {
    const index = this.buttons.indexOf(btn);
    let nextIndex = index;

    switch (e.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % this.buttons.length;
        e.preventDefault();
        this.buttons[nextIndex].focus();
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + this.buttons.length) % this.buttons.length;
        e.preventDefault();
        this.buttons[nextIndex].focus();
        break;
      case 'Home':
        e.preventDefault();
        this.buttons[0].focus();
        break;
      case 'End':
        e.preventDefault();
        this.buttons[this.buttons.length - 1].focus();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.closeAllTabs();
        this.openTab(btn);
        break;
    }
  }
}