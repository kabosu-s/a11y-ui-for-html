import type { Meta, StoryObj } from "@storybook/html-vite";
import { createTemplate } from './Accordion.ts';


const meta  = {
  title: 'Composite/アコーディオン',
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
