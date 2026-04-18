import type { Meta, StoryObj } from '@storybook/react';
import { Upload } from './Upload';

const meta = {
  title: 'Components/Upload',
  component: Upload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Upload>;


export default meta;
type Story = StoryObj<typeof Upload>;

export const Basic: Story = {
  args: {
    buttonText: '点击上传',
    action: 'https://jsonplaceholder.typicode.com/posts',
    onChange: (file) => console.log('文件选择:', file),
  },
};

export const MultipleFiles: Story = {
  args: {
    buttonText: '上传多个文件',
    action: 'https://jsonplaceholder.typicode.com/posts',
    multiple: true,
    onChange: (file) => console.log('文件选择:', file),
  },
};

export const Disabled: Story = {
  args: {
    buttonText: '上传按钮禁用',
    disabled: true,
    },
};

export const WithImg: Story = {
  args: {
    buttonText: '上传图片',
    action: 'https://jsonplaceholder.typicode.com/posts',
    accept: 'image/*',
    onChange: (file) => console.log('文件选择:', file),
  },
};