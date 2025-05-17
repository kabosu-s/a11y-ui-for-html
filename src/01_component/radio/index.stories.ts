import type { Meta, StoryObj } from '@storybook/web-components';
import { createRadio, RadioProps } from './Radio';


const meta: Meta<RadioProps> = {
  title: 'Component/Form/Radio',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    const radiobox = createRadio(args as RadioProps);
    return radiobox;
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'ラジオボタンのオプション',
    },
  },
};

export default meta;
type Story = StoryObj;


export const Default: Story = {
  args: {
    name: 'gender',
    options: [
      { value: 'male', label: '男性' },
      { value: 'female', label: '女性' },
      { value: 'other', label: 'その他' },
    ],
  },
};
export const Disabled: Story = {
  args: {
    name: 'gender',
    options: [
      { value: 'male', label: '男性' },
      { value: 'female', label: '女性' },
      { value: 'other', label: 'その他' },
    ],
    disabled: true,
  },
};
export const WithError: Story = {
  args: {
    name: 'gender',
    options: [
      { value: 'male', label: '男性' },
      { value: 'female', label: '女性' },
      { value: 'other', label: 'その他' },
    ],
    required: true,
    errorMessage: '性別を選択してください',
  },
};