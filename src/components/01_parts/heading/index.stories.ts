import type { Meta, StoryObj } from '@storybook/html';
import { createHeadlogo } from './Headling';

const meta = {
  title: 'パーツ/Headd',
  tags: ['autodocs'],
  render: () => createHeadlogo(),
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const  Primary: Story  = {


};