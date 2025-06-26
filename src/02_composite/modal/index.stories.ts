import type { Meta, StoryObj } from '@storybook/html-vite';
import { createTemplate } from "./Modal.ts";

const meta = {
  title: 'Composite/モーダル',
  parameters: {
    layout: 'fullscreen',
    docs: {
        subtitle: 'モーダルのコーディング例です',
        description: {
          component: 'HTMLとJavascript、CSSで動作させてています。',
        },
    },
  },
  render: () =>  createTemplate(),
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Primary: Story = {};