import './checkbox.css';

export interface CheckboxOption {
  /**
   * チェックボックスのラベル
   */
  label: string;
  /**
   * チェックボックスの値
   */
  value: string;
  /**
   * チェックボックスが無効かどうか
   */
  disabled?: boolean;
}

export interface CheckboxProps {
  /**
   * チェックボックスのオプション
   */
  options: CheckboxOption[];
  /**
   * チェックボックスのエラーメッセージ
   */
  errorMessage?: string;
}

/**
 * チェックボックスコンポーネント
 */
export const createCheckbox = ({
  options,
  errorMessage,
}: CheckboxProps) => {
  const checkboxGroup = document.createElement('div');
  checkboxGroup.className = 'checkbox_group';

  const groupId = `checkbox-group-${Math.random().toString(36).substring(2, 15)}`;

  options.forEach((option) => {
    const checkbox = document.createElement('div');
    checkbox.className = 'checkbox';

    const id = `${groupId}-${option.value}`;

    const inputElement = document.createElement('input');
    inputElement.type = 'checkbox';
    inputElement.id = id;
    inputElement.value = option.value;
    inputElement.disabled = option.disabled || false;
    if (option.disabled) {
      inputElement.setAttribute('aria-disabled', 'true');
    }
    checkbox.appendChild(inputElement);

    const labelElement = document.createElement('label');
    labelElement.appendChild(document.createTextNode(option.label));
    labelElement.setAttribute('for', id);
    checkbox.appendChild(labelElement);

    checkboxGroup.appendChild(checkbox);
  });

  if (errorMessage) {
    const errorMessageId = `${groupId}-error`;
    checkboxGroup.setAttribute('aria-describedby', errorMessageId);
    const errorMessageElement = document.createElement('div');
    errorMessageElement.className = 'checkbox_error';
    errorMessageElement.innerText = errorMessage;
    errorMessageElement.id = errorMessageId;
    checkboxGroup.appendChild(errorMessageElement);
  }

  return checkboxGroup;
}; 