import type { Meta, StoryObj } from '@storybook/html';
import { fn } from '@storybook/test';

import { createButton, type ButtonProps } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<ButtonProps> = {
  title: 'Component/ボタン',
  tags: ['autodocs'],
  render: (args) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return createButton(args);
  },
  argTypes: {
    backgroundColor: { control: 'color' },
    label: { control: 'text' },
    onClick: { action: 'onClick' },
    primary: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    ariaLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    pressed: { control: 'boolean' },
  },
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<ButtonProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'ボタンのらべる',
  },
};

export const Secondary: Story = {
  args: {
    label: 'セカンダリ',
  },
};

export const Large: Story = {
  args: {
    primary: true,
    size: 'large',
    label: '大きいボタン',
  },
};

export const Small: Story = {
  args: {
    primary: true,
    size: 'small',
    label: '小さいボタン',
  },
};

export const WithAriaLabel: Story = {
  args: {
    primary: true,
    label: '★',
    ariaLabel: 'おすすめ',
  },
};

export const Disabled: Story = {
  args: {
    primary: true,
    label: '無効なボタン',
    disabled: true,
  },
};
