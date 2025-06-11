import './accordion.css';

export interface AccordionProps {
  items: {
    header: string;
    content: string;
    /**
     * アコーディオンが開いているかどうか
     */
    expanded?: boolean;
  }[];
}

export class Accordion {
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
export const createAccordionTemplate = ({ items }: AccordionProps): string => {
  const indent = (lines: string[], level = 2) =>
    lines.map(line => " ".repeat(level * 2) + line).join("\n");

  const accordionItems = items.map((item) => {
    const lines = [
      `<details class="accordion_item js_accordion"${item.expanded ? " open" : ""}>`,
      ...indent([
        `<summary class="accordion_header">`,
        `${" ".repeat(4)}${item.header}`,
        `</summary>`,
        `<div class="accordion_content">`,
        `${" ".repeat(4)}<div class="accordion_inner">`,
        `${" ".repeat(6)}${item.content}`,
        `${" ".repeat(4)}</div>`,
        `</div>`,
      ], 1).split("\n"),
      `</details>`
    ];

    return lines.join("\n");
  });

  return [
    `<div class="accordion">`,
    indent(accordionItems, 1),
    `</div>`
  ].join("\n");
};
