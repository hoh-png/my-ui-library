import type { Meta, StoryObj } from '@storybook/react';
import Multiselect from './Multiselect';
import { useState } from 'react';

const meta: Meta<typeof Multiselect> = {
  title: 'Components/Multiselect',
  component: Multiselect,
  tags: ['autodocs']
} satisfies Meta<typeof Multiselect>;

export default meta;
type Story = StoryObj<typeof meta>;

const fruitOptions = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' },
  { label: '西瓜', value: 'watermelon' }
];

export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <Multiselect
        options={fruitOptions}
        value={value}
        onChange={setValue}
        placeholder="请选择水果"
      />
    );
  }
};

export const WithSearch: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <Multiselect
        options={fruitOptions}
        value={value}
        onChange={setValue}
        placeholder="可搜索的水果"
        searchable
      />
    );
  }
};

export const Disabled: Story = {
  args: {
    options: fruitOptions,
    value: ['apple'],
    disabled: true,
    placeholder: '禁用的多选框'
  }
};

export const WithDefaultValue: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['apple', 'banana']);
    return (
      <Multiselect
        options={fruitOptions}
        value={value}
        onChange={setValue}
        placeholder="选择水果"
      />
    );
  }
};