import type { Meta, StoryObj } from '@storybook/web-components';
import { createCheckbox, CheckboxProps } from './Checkbox';

const meta: Meta<CheckboxProps> = {
  title: 'Component/Form/Checkbox',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    const checkbox = createCheckbox(args as CheckboxProps);
    return checkbox;
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'チェックボックスのオプション',
    },
  },
};

export default meta;
type Story = StoryObj;

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
    errorMessage: 'エラーメッセージが表示されます',
  },
};