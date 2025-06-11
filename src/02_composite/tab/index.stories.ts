import type { Meta, StoryObj } from "@storybook/html-vite";
import { createTemplate, type TabProps } from "./tab";

const meta = {
  title: "Composite/タブ",
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    return createTemplate(args);
  },
}satisfies Meta<TabProps>;

export default meta;
type Story = StoryObj<TabProps>;

export const Primary: Story = {
  args: {
    tabs: [
      {
        label: "タブ 1",
        content: "タブ1のコンテンツです。",
      },
      {
        label: "タブ 2",
        content: "タブ2のコンテンツです。",
      },
      {
        label: "タブ 3",
        content: "タブ3のコンテンツです。",
      },
    ],
  },
};
