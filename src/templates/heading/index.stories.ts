import type { Meta, StoryObj } from '@storybook/html';
import { createPage } from './index';

const meta = {
  title: 'テンプレート/Headd',
  render: () => createPage(),
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const  Primary: Story  = {};