import type { Meta, StoryObj } from "@storybook/html";
import { createTemplate, type TabProps } from ".";

const meta = {
  title: "テンプレート/Tab",
  tags: ["autodocs"],
  render: (args) => {
    return createTemplate(args);
  },
} satisfies Meta<TabProps>;

export default meta;
type Story = StoryObj<TabProps>;

export const Primary: Story = {
  args: {
    tabs: [
      {
        label: "Tab 1",
        content: "Content 1",
      },
      {
        label: "Tab 2",
        content: "Content 2",
      },
      {
        label: "Tab 3",
        content: "Content 3",
      },
    ],
  },
};
