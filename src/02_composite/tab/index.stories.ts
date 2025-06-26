import type { Meta, StoryObj } from "@storybook/html-vite";
import { createTemplate } from './Tab.ts';


const meta  = {
  title: 'Composite/タブ',
  parameters: {
    layout: 'centered',
    docs: {
        subtitle: 'タブのコーディング例です',
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
