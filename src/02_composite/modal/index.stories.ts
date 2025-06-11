import type { Meta, StoryObj } from '@storybook/html-vite';
import { createTemplate, type ModalProps } from "./Modal";

const meta = {
  title: 'Composite/モーダル',
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => {
    return createTemplate(args as ModalProps);
  },
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: '最初からモーダルを開いた状態にするか',
    },
  },
} satisfies Meta<ModalProps>;

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    defaultOpen: false,
  },
};