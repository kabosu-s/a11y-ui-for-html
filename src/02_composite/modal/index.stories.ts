import type { Meta, StoryObj } from '@storybook/html';
import { createTemplate, type ModalProps } from "./Modal";

const meta = {
  title: 'Composite/モーダル',
  tags: ['autodocs'],
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
    modalId: {
      control: 'text',
      description: 'モーダルのID（他と衝突しないように）',
      defaultValue: 'modal1',
    },
  },
} satisfies Meta<ModalProps>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    defaultOpen: false,
    modalId: 'modal1',
  },
};