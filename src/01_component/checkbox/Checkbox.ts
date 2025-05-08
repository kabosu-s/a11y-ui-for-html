import './checkbox.css';

export interface CheckboxProps {
  /**
   * チェックボックスのラベル
   */
  label: string;
  /**
   * チェックボックスが無効かどうか
   */
  disabled?: boolean;
  /**
   * チェックボックスのエラーメッセージ
   */
  errorMessage?: string;
}

/**
 * チェックボックスコンポーネント
 */
export const createCheckbox = ({
  label,
  disabled,
  errorMessage,
}: CheckboxProps) => {
  const checkbox = document.createElement('div');
  checkbox.className = 'checkbox';

  const id = `checkbox-${Math.random().toString(36).substring(2, 15)}`;

  const inputElement = document.createElement('input');
  inputElement.type = 'checkbox';
  inputElement.id = id;
  inputElement.disabled = disabled || false;
  if (disabled) {
    inputElement.setAttribute('aria-disabled', 'true');
  }
  checkbox.appendChild(inputElement);

  const labelElement = document.createElement('label');
  labelElement.appendChild(document.createTextNode(label));
  labelElement.setAttribute('for', id);
  checkbox.appendChild(labelElement);

  if (errorMessage) {
    const errorMessageId = `${id}-error`;
    inputElement.setAttribute('aria-describedby', errorMessageId);
    const errorMessageElement = document.createElement('div');
    errorMessageElement.className = 'checkbox_error';
    errorMessageElement.innerText = errorMessage;
    errorMessageElement.id = errorMessageId;
    checkbox.appendChild(errorMessageElement);
  }

  return checkbox;
}; 