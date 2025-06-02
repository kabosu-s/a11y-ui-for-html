import type { Meta, StoryObj } from '@storybook/html';
import { createTextfield, type TextfieldProps } from './Textfield';

const meta = {
  title: 'Component/Form/Textfield',
  tags: ['autodocs'],
  render: (args) => {
    return createTextfield(args as TextfieldProps);
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    errorMessage: { control: 'text' },
  },
  args: {},
}satisfies Meta<TextfieldProps>;

export default meta;
type Story = StoryObj<TextfieldProps>;

export const Primary: Story = {
  args: {
    label: 'テキストフィールド',
    placeholder: 'プレースホルダー',
  },
};

export const Required: Story = {
  args: {
    label: '必須テキストフィールド',
    placeholder: 'プレースホルダー',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: '無効テキストフィールド',
    placeholder: 'プレースホルダー',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    label: 'エラーテキストフィールド',
    placeholder: 'プレースホルダー',
    errorMessage: 'エラーメッセージ',
  },
};
