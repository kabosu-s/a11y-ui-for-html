export const Hamburgerset = () => {
  document.addEventListener("DOMContentLoaded", () => {
    new HamburgerMenu("#hamburgerButton", "#navMenu");
  });
}

class HamburgerMenu {
  constructor(toggleBtnSelector, menuSelector, breakpoint = 768) {
    this.toggleBtn = document.querySelector(toggleBtnSelector);
    this.menu = document.querySelector(menuSelector);
    this.container = this.toggleBtn?.parentElement; // ラッパーを取得
    this.breakpoint = breakpoint;
    if (!this.toggleBtn || !this.menu || !this.container) {
      throw new Error("対象の要素が見つかりません");
    }

    this.isOpen = false;
    this.focusTrapHandler = null;

    this.toggleBtn.addEventListener("click", () => this.toggle());
    this.menu.addEventListener("click", (e) => {
      if (e.target.closest("[data-close-menu]")) {
        this.close();
      }
    });

    this._handleResize();
    window.addEventListener("resize", () => this._handleResize());
  }

  open() {
    this.menu.classList.add("is-open");
    this.menu.setAttribute("aria-hidden", "false");
    this.toggleBtn.setAttribute("aria-label", "メニューを閉じる");
    document.body.classList.add("no-scroll");
    this._trapFocus();

    const firstFocusable = this.container.querySelector(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    this.isOpen = true;
  }

  close() {
    this.menu.classList.remove("is-open");
    this.menu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    this._releaseFocusTrap();
    this.toggleBtn.focus();
    this.toggleBtn.setAttribute("aria-label", "メニューを開く");
    this.isOpen = false;
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  _trapFocus() {
    const focusableEls = this.container.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]'
    );
    if (!focusableEls.length) return;

    const first = focusableEls[0];
    const last = focusableEls[focusableEls.length - 1];

    this.focusTrapHandler = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      } else if (e.key === "Escape") {
        this.close();
      }
    };

    document.addEventListener("keydown", this.focusTrapHandler);
  }

  _releaseFocusTrap() {
    if (this.focusTrapHandler) {
      document.removeEventListener("keydown", this.focusTrapHandler);
      this.focusTrapHandler = null;
    }
  }

  _handleResize() {
    const isDesktop = window.innerWidth >= this.breakpoint;

    if (isDesktop) {
      // PC表示：メニュー常時表示・リセット
      this.menu.classList.add("is-open");
      this.menu.setAttribute("aria-hidden", "false");
      document.body.classList.remove("no-scroll");
      this._releaseFocusTrap();
      this.toggleBtn.setAttribute("aria-hidden", "true");
      this.toggleBtn.setAttribute("disabled", "true");
    } else {
      // スマホ表示：toggle可能に戻す
      this.toggleBtn.removeAttribute("aria-hidden");
      this.toggleBtn.removeAttribute("disabled");
      if (!this.isOpen) {
        this.menu.classList.remove("is-open");
        this.menu.setAttribute("aria-hidden", "true");
      }
    }
  }
}