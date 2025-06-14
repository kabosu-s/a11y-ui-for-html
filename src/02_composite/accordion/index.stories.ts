import type { Meta, StoryObj } from "@storybook/html-vite";
import { createTemplate } from './Accordion.ts';


const meta  = {
  title: 'Composite/アコーディオン',
  parameters: {
    layout: 'centered',
    docs: {
        subtitle: 'アコーディオン',
        description: {
          component: 'アコーディオンのコーディング例です',
        },
    },
  },
  render: () => createTemplate(),
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Primary: Story = {};
