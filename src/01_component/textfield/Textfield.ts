import './textfield.css';

export interface TextfieldProps {
  /**
   * テキストフィールドのラベル
   */
  label: string;
  /**
   * テキストフィールドのプレースホルダー
   */
  placeholder?: string;
  /**
   * テキストフィールドが必須かどうか
   */
  required?: boolean;
  /**
   * テキストフィールドが無効かどうか
   */
  disabled?: boolean;
  /**
   * テキストフィールドのエラーメッセージ
   */
  errorMessage?: string;
}

/**
 * テキストフィールドコンポーネント
 */
export const createTextfield = ({
  label,
  placeholder,
  required,
  disabled,
  errorMessage,
}: TextfieldProps) => {
  const textfield = document.createElement('div');
  textfield.className = 'textfield';

  const id = `textfield-${Math.random().toString(36).substring(2, 15)}`;

  const labelElement = document.createElement('label');
  labelElement.innerText = label;
  labelElement.setAttribute('for', id);
  textfield.appendChild(labelElement);

  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.id = id;
  inputElement.placeholder = placeholder || '';
  inputElement.required = required || false;
  inputElement.disabled = disabled || false;
  if (required) {
    inputElement.setAttribute('aria-required', 'true');
  }
  if (disabled) {
    inputElement.setAttribute('aria-disabled', 'true');
  }
  textfield.appendChild(inputElement);

  if (errorMessage) {
    const errorMessageId = `${id}-error`;
    inputElement.setAttribute('aria-describedby', errorMessageId);
    const errorMessageElement = document.createElement('div');
    errorMessageElement.className = 'textfield_error';
    errorMessageElement.innerText = errorMessage;
    errorMessageElement.id = errorMessageId;
    textfield.appendChild(errorMessageElement);
  }

  return textfield;
};
