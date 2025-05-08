import './radio.css';

export interface RadioProps {
  /**
   * ラジオボタンのグループ名
   */
  name: string;
  /**
   * ラジオボタンのオプション
   */
  options: {
    /**
     * ラジオボタンの値
     */
    value: string;
    /**
     * ラジオボタンのラベル
     */
    label: string;
    /**
     * ラジオボタンが選択されているかどうか
     */
    checked?: boolean;
  }[];
  /**
   * ラジオボタンが無効かどうか
   */
  disabled?: boolean;
  /**
   * ラジオボタンのエラーメッセージ
   */
  errorMessage?: string;
}

/**
 * ラジオボタンコンポーネント
 */
export const createRadio = ({
  name,
  options,
  disabled,
  errorMessage,
}: RadioProps) => {
  const radio = document.createElement('fieldset');
  radio.className = 'radio';
  radio.setAttribute('role', 'radiogroup');

  if (errorMessage) {
    radio.setAttribute('aria-describedby', `${name}-error`);
  }

  const radioOptions = options.map((option, index) => {
    const id = `radio-${name}-${index}`;
    const radioOption = document.createElement('div');
    radioOption.className = 'radio_option';

    const inputElement = document.createElement('input');
    inputElement.type = 'radio';
    inputElement.id = id;
    inputElement.name = name;
    inputElement.value = option.value;
    inputElement.checked = option.checked || false;
    inputElement.disabled = disabled || false;
    if (disabled) {
      inputElement.setAttribute('aria-disabled', 'true');
    }
    radioOption.appendChild(inputElement);

    const labelElement = document.createElement('label');
    labelElement.appendChild(document.createTextNode(option.label));
    labelElement.setAttribute('for', id);
    radioOption.appendChild(labelElement);

    return radioOption;
  });

  radioOptions.forEach(option => radio.appendChild(option));

  if (errorMessage) {
    const errorMessageElement = document.createElement('div');
    errorMessageElement.className = 'radio_error';
    errorMessageElement.innerText = errorMessage;
    errorMessageElement.id = `${name}-error`;
    radio.appendChild(errorMessageElement);
  }

  return radio;
}; 