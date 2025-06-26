
export const Modalset = () => {
  document.addEventListener('DOMContentLoaded', () => {
    new ModalManager();
  });
};


class ModalManager {
  constructor() {
    this.modalStack = [];
    this.focusableSelectors = [
      'a[href]',
      'area[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'iframe',
      'object',
      'embed',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable]'
    ].join(', ');
    this._handleKeydown = this._handleKeydown.bind(this);
    document.addEventListener('keydown', this._handleKeydown); // ←ここだけでOK
    this._bindEvents();
    this._initDefaultModals();
  }

  _initDefaultModals() {
    document.querySelectorAll('.modal').forEach((modal) => {
      const btn = document.querySelector(`[data-open-modal="${modal.id}"]`);
      if (btn && btn.dataset.defaultOpen === 'true') {
        this._open(modal.id, btn, true);
      }
    });
  }

  _bindEvents() {
    document.querySelectorAll('[data-open-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const modalId = btn.dataset.openModal;
        const defaultOpen = btn.dataset.defaultOpen === 'true';
        this._open(modalId, btn, defaultOpen);
      });
    });

    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const modalId = btn.dataset.closeModal;
        this._close(modalId);
      });
    });

    document.querySelectorAll('.overlay').forEach((overlay) => {
      const modal = overlay.closest('.modal');
      overlay.addEventListener('click', () => {
        if (modal) this._close(modal.id);
      });
    });

  }

  _open(modalId, triggerEl, defaultOpen = false) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
      modal.classList.add('visible');
    });

    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');

    this.modalStack.push({ modal, trigger: triggerEl, defaultOpen });
    this._trapFocus(modal);

    const focusables = modal.querySelectorAll(this.focusableSelectors);
    if (focusables.length > 0) focusables[0].focus();

    this._updateAriaForModals();
  }

  _close(modalId) {
    const index = this.modalStack.findIndex((m) => m.modal.id === modalId);
    if (index === -1) return;

    const { modal, trigger } = this.modalStack[index];
    this.modalStack.splice(index, 1);

    modal.classList.remove('visible');
    modal.classList.add('hiding');
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    document.removeEventListener('keydown', modal._trapHandler);

    if (this.modalStack.length === 0) {
      document.body.classList.remove('no-scroll');
    } else {
      const topModal = this.modalStack[this.modalStack.length - 1];
      this._trapFocus(topModal.modal);
    }

    this._updateAriaForModals();

    if (trigger && typeof trigger.focus === 'function') {
      setTimeout(() => trigger.focus(), 0);
    }

    const openBtn = document.querySelector(`[data-open-modal="${modalId}"]`);
    if (openBtn) {
      openBtn.setAttribute('data-default-open', 'false');
    }

    setTimeout(() => {
      modal.classList.remove('hiding');
    }, 300);
  }

  _trapFocus(modal) {
    const focusables = modal.querySelectorAll(this.focusableSelectors);
    modal._firstFocusable = focusables[0];
    modal._lastFocusable = focusables[focusables.length - 1];
  }

  _handleKeydown(e) {
  const topModal = this.modalStack[this.modalStack.length - 1]?.modal;
  if (!topModal) return;

  const first = topModal._firstFocusable;
  const last = topModal._lastFocusable;

  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  } else if (e.key === 'Escape') {
    this._close(topModal.id);
  }
}

  _updateAriaForModals() {
    document.querySelectorAll('.modal').forEach((modal) => {
      const isTop = this.modalStack[this.modalStack.length - 1]?.modal === modal;
      modal.setAttribute('aria-hidden', isTop ? 'false' : 'true');
    });
  }
}