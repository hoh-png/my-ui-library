import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select.tsx';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' },
];

export const Basic: Story = {
  args: {
    options: options,
    placeholder: '请选择水果',
    onChange: (value) => console.log('选中:', value),
  },
};

export const Disabled: Story = {
  args: {
    options: options,
    placeholder: '禁用状态',
    disabled: true,
  },
};