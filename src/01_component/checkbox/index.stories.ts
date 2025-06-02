import type { Meta, StoryObj } from '@storybook/web-components';
import { createCheckbox, type CheckboxProps } from './Checkbox';

const meta = {
  title: 'Component/Form/Checkbox',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    return createCheckbox(args as CheckboxProps);
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'チェックボックスのオプション',
    },
  },
}satisfies Meta<CheckboxProps>;

export default meta;
type Story = StoryObj<CheckboxProps>;

export const Default: Story = {
  args: {
    options: [
      { label: 'オプション1', value: 'option1' },
      { label: 'オプション2', value: 'option2' },
      { label: 'オプション3', value: 'option3' },
    ],
  },
};
export const Disabled: Story = {
  args: {
    options: [
      { label: 'オプション1', value: 'option1' },
      { label: 'オプション2', value: 'option2', disabled: true },
      { label: 'オプション3', value: 'option3' },
    ],
  },
}; 
export const WithError: Story = {
  args: {
    options: [
      { label: 'オプション1', value: 'option1' },
      { label: 'オプション2', value: 'option2' },
      { label: 'オプション3', value: 'option3' },
    ],
    errorMessage: '必須項目です',
  },
};