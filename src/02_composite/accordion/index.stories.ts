import type { Meta, StoryObj } from "@storybook/html-vite";
import { Accordion, createAccordionTemplate, type AccordionProps  } from './Accordion';


const meta  = {
  title: 'Composite/アコーディオン',
  parameters: {
    layout: 'centered',
    docs: {
        subtitle: '',
        description: {
          component: 'アコーディオンのコーディング例です',
        },
    },
  },
  render: (args) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = createAccordionTemplate(args as AccordionProps);

  // 初期化処理を明示的に呼び出す
  const detailsList = wrapper.querySelectorAll<HTMLDetailsElement>('.js_accordion');
  detailsList.forEach((details) => {
    const acc = new Accordion(details);
    acc.init();
  });

  return wrapper;
  },
} satisfies Meta<AccordionProps>;

export default meta;
type Story = StoryObj<AccordionProps>;


export const Primary: Story = {
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
