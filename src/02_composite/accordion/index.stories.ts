import { createAccordion } from './Accordion';

export default {
  title: 'Composite/アコーディオン',
  component: createAccordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
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

export const WithExpanded = {
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