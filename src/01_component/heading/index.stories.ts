import type { Meta, StoryObj } from '@storybook/html';
import { createHeadlogo, type LogoProps } from './Headling';

const meta: Meta<LogoProps> = {
  title: 'Component/ロゴ',
    tags: ['autodocs'],
  render: (args) => createHeadlogo(args),
};

export default meta;
type Story = StoryObj<LogoProps>;

export const  Primary: Story  = {
  args: {
      name: 'LOGO',
  },
};