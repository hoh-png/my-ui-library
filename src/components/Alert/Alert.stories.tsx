import type { Meta, StoryObj } from '@storybook/react';
import Alert from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs']
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'success',
    message: '操作成功',
    description: '您的操作已成功完成!'
  }
};

export const Info: Story = {
  args: {
    type: 'info',
    message: '提示信息',
    description: '这是一条提示信息!'
  }
};

export const Warning: Story = {
  args: {
    type: 'warning',
    message: '警告',
    description: '请注意操作风险!'
  }
};

export const Error: Story = {
  args: {
    type: 'error',
    message: '错误',
    description: '操作失败，请重试!'
  }
};

export const Closable: Story = {
  args: {
    type: 'info',
    message: '可关闭的提示',
    closable: true,
    onClose: () => alert('提示已关闭')
  }
};

export const WithoutIcon: Story = {
  args: {
    type: 'success',
    message: '成功提示',
    showIcon: false
  }
};

export const SimpleMessage: Story = {
  args: {
    type: 'warning',
    message: '这是一条简单的警告信息'
  }
};