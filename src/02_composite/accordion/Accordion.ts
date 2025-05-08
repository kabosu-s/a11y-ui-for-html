import './accordion.css';

export interface AccordionProps {
  /**
   * アコーディオンのアイテム
   */
  items: {
    /**
     * アコーディオンのヘッダー
     */
    header: string;
    /**
     * アコーディオンのコンテンツ
     */
    content: string;
    /**
     * アコーディオンが開いているかどうか
     */
    expanded?: boolean;
  }[];
}

class Accordion {
  private details: HTMLDetailsElement;
  private trigger: HTMLElement;
  private panel: HTMLElement;
  private isOpen: boolean;
  private isAnimating: boolean;

  constructor(el: HTMLDetailsElement) {
    this.details = el;
    this.trigger = el.querySelector('summary') as HTMLElement;
    this.panel = this.trigger.nextElementSibling as HTMLElement;
    this.isOpen = el.open;
    this.isAnimating = false;
  }

  init() {
    this._updateAria(this.isOpen);
    this.trigger.setAttribute('role', 'button');

    this.panel.style.overflow = 'hidden';
    this.panel.style.height = this.isOpen ? 'auto' : '0';

    this.trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });

    this.trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  async toggle() {
    if (this.isAnimating) return;

    this.isOpen = !this.isOpen;
    this.details.open = true;

    this._updateAria(this.isOpen);
    this.isAnimating = true;

    if (this.isOpen) {
      await this._expand();
    } else {
      await this._collapse();
      this.details.open = false;
    }

    this.isAnimating = false;
  }

  private _updateAria(isOpen: boolean) {
    this.trigger.setAttribute('aria-expanded', String(isOpen));
    this.panel.setAttribute('aria-hidden', String(!isOpen));
  }

  private _expand() {
    this.panel.style.height = 'auto';
    const height = this.panel.scrollHeight + 'px';
    this.panel.style.height = '0';
    requestAnimationFrame(() => {
      this.panel.style.transition = 'height 300ms ease-in-out';
      this.panel.style.height = height;
    });

    return new Promise<void>((res) => {
      this.panel.addEventListener('transitionend', () => {
        this.panel.style.height = 'auto';
        this.panel.style.transition = '';
        res();
      }, { once: true });
    });
  }

  private _collapse() {
    const height = this.panel.scrollHeight + 'px';
    this.panel.style.height = height;
    requestAnimationFrame(() => {
      this.panel.style.transition = 'height 300ms ease-in-out';
      this.panel.style.height = '0';
    });

    return new Promise<void>((res) => {
      this.panel.addEventListener('transitionend', () => {
        this.panel.style.transition = '';
        res();
      }, { once: true });
    });
  }
}

/**
 * アコーディオンコンポーネント
 */
export const createAccordion = ({ items }: AccordionProps) => {
  const accordion = document.createElement('div');
  accordion.className = 'accordion';

  const accordionItems = items.map((item) => {
    const details = document.createElement('details');
    details.className = 'accordion_item js_accordion';
    if (item.expanded) {
      details.setAttribute('open', '');
    }

    const summary = document.createElement('summary');
    summary.className = 'accordion_header';
    summary.innerText = item.header;

    const content = document.createElement('div');
    content.className = 'accordion_content';

    const inner = document.createElement('div');
    inner.className = 'accordion_inner';
    inner.innerHTML = item.content;

    content.appendChild(inner);
    details.appendChild(summary);
    details.appendChild(content);

    return details;
  });

  accordionItems.forEach(item => accordion.appendChild(item));

  // アコーディオンの初期化
  accordionItems.forEach((el) => {
    const acc = new Accordion(el as HTMLDetailsElement);
    acc.init();
  });

  return accordion;
}; 