import './button.css';

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Button description for screen readers */
  ariaLabel?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in a pressed state */
  pressed?: boolean;
}

/** Primary UI component for user interaction */
export const createButton = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  onClick,
  ariaLabel,
  disabled = false,
  pressed = false,
}: ButtonProps) => {
  const btn = document.createElement('button');
  btn.setAttribute('type', 'button');
  btn.innerText = label;
  
  // アクセシビリティ属性の設定
  if (ariaLabel) {
    btn.setAttribute('aria-label', ariaLabel);
  }
  if (disabled) {
    btn.setAttribute('aria-disabled', 'true');
    btn.disabled = true;
    btn.setAttribute('tabindex', '-1');
  }
  if (pressed) {
    btn.setAttribute('aria-pressed', 'true');
  }
  
  // キーボード操作のサポート
  if (onClick) {
    btn.addEventListener('click', onClick);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    });
  }

  const mode = primary ? 'btn_primary' : 'btn_secondary';
  btn.className = ['btn', `btn_${size}`, mode].join(' ');

  if (backgroundColor) {
    btn.style.backgroundColor = backgroundColor;
  }

  return btn;
};
