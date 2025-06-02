import './modal.css';
import '../../01_component/button/button.css';

type ModalStackItem = {
  modal: HTMLElement;
  trigger: HTMLElement;
};
const modalStack: ModalStackItem[] = [];
const focusableSelectors = [
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
  '[contenteditable]',
].join(', ');

function openModal(modalId: string, triggerEl: HTMLElement) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  modal.style.display = 'flex';
  requestAnimationFrame(() => {
    modal.classList.add('visible');
  });
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');

  modalStack.push({ modal, trigger: triggerEl });
  trapFocus(modal);

  const focusables = modal.querySelectorAll<HTMLElement>(focusableSelectors);
  focusables[0]?.focus();

  updateAriaForModals();
}

function closeModal(modalId: string) {
  const index = modalStack.findIndex((m) => m.modal.id === modalId);
  if (index === -1) return;

  const { modal, trigger } = modalStack[index];
  modal.classList.remove('visible');
  modal.classList.add('hiding');
  modal.setAttribute('aria-hidden', 'true');
  modalStack.splice(index, 1);
  document.removeEventListener('keydown', modal._trapHandler as EventListener);

  if (modalStack.length === 0) {
    document.body.classList.remove('no-scroll');
  } else {
    const top = modalStack[modalStack.length - 1];
    trapFocus(top.modal);
  }

  updateAriaForModals();

  // フェードアウト後に display: none
  setTimeout(() => {
    modal.classList.remove('hiding');
    modal.style.display = 'none';
  }, 300);

  // フォーカス戻す
  if (trigger && typeof trigger.focus === 'function') {
    setTimeout(() => trigger.focus(), 0);
  }
}

function updateAriaForModals() {
  document.querySelectorAll<HTMLElement>('.modal').forEach((modal) => {
    const isTop = modalStack[modalStack.length - 1]?.modal === modal;
    modal.setAttribute('aria-hidden', isTop ? 'false' : 'true');
  });
}

function trapFocus(modal: HTMLElement) {
  const focusables = modal.querySelectorAll<HTMLElement>(focusableSelectors);
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  const handler = (e: KeyboardEvent) => {
    const isTop = modalStack[modalStack.length - 1]?.modal === modal;
    if (!isTop) return;

    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    } else if (e.key === 'Escape') {
      closeModal(modal.id);
    }
  };

  // 一旦解除してから再登録
  document.removeEventListener('keydown', modal._trapHandler as EventListener);
  modal._trapHandler = handler;
  document.addEventListener('keydown', handler);
}
// 拡張プロパティを HTMLElement に追加
declare global {
  interface HTMLElement {
    _trapHandler?: (e: KeyboardEvent) => void;
  }
}
// イベントバインド
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll<HTMLElement>('[data-open-modal]').forEach((btn) => {
    const targetId = btn.dataset.openModal!;
    btn.addEventListener('click', () => openModal(targetId, btn));
  });

  document.querySelectorAll<HTMLElement>('[data-close-modal]').forEach((btn) => {
    const targetId = btn.dataset.closeModal!;
    btn.addEventListener('click', () => closeModal(targetId));
  });

  document.querySelectorAll<HTMLElement>('.overlay').forEach((overlay) => {
    const modal = overlay.closest('.modal') as HTMLElement;
    overlay.addEventListener('click', () => closeModal(modal.id));
  });

  document.querySelectorAll<HTMLElement>('.primary-action').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal') as HTMLElement;
      alert(`アクション実行：${modal.id}`);
      closeModal(modal.id);
    });
  });
});

export interface ModalProps {
  defaultOpen?: boolean;
  modalId?: string;
}

export const createTemplate = (props: ModalProps) => {
  const { 
    defaultOpen = false,
    modalId = 'modal1',
  } = props;

  return /* html */ `
  <div class="btn_area">
    <button data-open-modal="${modalId}" class="btn btn_medium btn_primary">モーダルを開く</button>
  </div>
    <div id="${modalId}" class="modal ${defaultOpen ? '' : 'hidden'}"
        role="dialog" aria-modal="true" aria-labelledby="${modalId}Title"
        aria-hidden="${defaultOpen ? 'false' : 'true'}">
      <div class="overlay"></div>
      <div class="dialog">
        <div class="header" id="${modalId}Title">
          <h2>モーダルタイトル</h2>
          <button data-close-modal="${modalId}" class="close_btn" aria-label="閉じる">×</button>
        </div>
        <div class="body">
          <p>ここにモーダルの本文が入ります。</p>
        </div>
        <div class="footer">
          <button class="btn  btn_small btn_primary">決定</button>
          <button data-close-modal="${modalId}" class="btn btn_small btn_cancel">キャンセル</button>
        </div>
      </div>
    </div>
  `;
};
