import { createRadio } from './Radio';

export default {
  title: 'Component/Form/Radio',
  component: createRadio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    name: 'gender',
    options: [
      { value: 'male', label: '男性' },
      { value: 'female', label: '女性' },
      { value: 'other', label: 'その他' },
    ],
  },
};

export const Required = {
  args: {
    name: 'gender',
    options: [
      { value: 'male', label: '男性' },
      { value: 'female', label: '女性' },
      { value: 'other', label: 'その他' },
    ],
    required: true,
  },
};

export const Disabled = {
  args: {
    name: 'gender',
    options: [
      { value: 'male', label: '男性' },
      { value: 'female', label: '女性' },
      { value: 'other', label: 'その他' },
    ],
    disabled: true,
  },
};

export const WithError = {
  args: {
    name: 'gender',
    options: [
      { value: 'male', label: '男性' },
      { value: 'female', label: '女性' },
      { value: 'other', label: 'その他' },
    ],
    required: true,
    errorMessage: '性別を選択してください',
  },
};

export const WithDefaultValue = {
  args: {
    name: 'gender',
    options: [
      { value: 'male', label: '男性' },
      { value: 'female', label: '女性', checked: true },
      { value: 'other', label: 'その他' },
    ],
  },
}; 