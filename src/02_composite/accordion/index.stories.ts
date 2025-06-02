import type { Meta, StoryObj } from "@storybook/html";
import { createAccordion, type AccordionProps  } from './Accordion';


const meta  = {
  title: 'Composite/アコーディオン',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    return createAccordion(args as AccordionProps);
  },
} satisfies Meta<AccordionProps>;

export default meta;
type Story = StoryObj<AccordionProps>;


export const Default: Story = {
  args: {
    items: [
      {
        header: 'アコーディオン1',
        content: 'アコーディオン1のコンテンツです。',
      },
      {
        header: 'アコーディオン2',
        content: 'アコーディオン2のコンテンツです。',
      },
      {
        header: 'アコーディオン3',
        content: 'アコーディオン3のコンテンツです。',
      },
    ],
  },
};

export const WithExpanded: Story = {
  args: {
    items: [
      {
        header: 'アコーディオン1',
        content: 'アコーディオン1のコンテンツです。',
        expanded: true,
      },
      {
        header: 'アコーディオン2',
        content: 'アコーディオン2のコンテンツです。',
      },
      {
        header: 'アコーディオン3',
        content: 'アコーディオン3のコンテンツです。',
      },
    ],
  },
}; 