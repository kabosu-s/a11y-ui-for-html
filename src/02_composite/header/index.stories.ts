import type { Meta, StoryObj } from "@storybook/html-vite";
import { createTemplate } from './Header.ts';

const meta  = {
  title: 'Composite/ヘッダー',
  parameters: {
    layout: 'centered',
    docs: {
        subtitle: 'アコーディオンのコーディング例です',
        description: {
          component: 'HTMLとJavascript、CSSで動作させてています。',
        },
    },
  },
  render: () => createTemplate(),
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Primary: Story = {};