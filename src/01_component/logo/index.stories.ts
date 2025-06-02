import type { Meta, StoryObj } from '@storybook/html';
import { createHeadlogo, type LogoProps } from './Headling';

const meta = {
  title: 'Component/ロゴ',
  render: (args) => createHeadlogo(args),
}satisfies Meta<LogoProps>;

export default meta;
type Story = StoryObj<LogoProps>;

export const  Primary: Story  = {
  args: {
      name: 'LOGO',
  },
};