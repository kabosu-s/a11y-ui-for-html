import { createCheckbox } from './Checkbox';

export default {
  title: 'Component/Form/Checkbox',
  component: createCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    label: '利用規約に同意する',
  },
};

export const Required = {
  args: {
    label: '利用規約に同意する',
    required: true,
  },
};

export const Disabled = {
  args: {
    label: '利用規約に同意する',
    disabled: true,
  },
};

export const WithError = {
  args: {
    label: '利用規約に同意する',
    required: true,
    errorMessage: '必須項目です',
  },
}; 