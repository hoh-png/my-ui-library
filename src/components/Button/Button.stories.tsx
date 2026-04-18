import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '按钮组件，用于触发用户操作'
      }
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'primary',
    children: '主要按钮'
  }
};

export const Default: Story = {
  args: {
    type: 'default',
    children: '默认按钮'
  }
};

export const Danger: Story = {
  args: {
    type: 'danger',
    children: '危险按钮'
  }
};

export const Large: Story = {
  args: {
    size: 'large',
    children: '大按钮'
  }
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: '中按钮'
  }
};

export const Small: Story = {
  args: {
    size: 'small',
    children: '小按钮'
  }
};

export const Loading: Story = {
  args: {
    loading: true,
    children: '加载中'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '禁用按钮'
  }
};

export const PrimaryLarge: Story = {
  args: {
    type: 'primary',
    size: 'large',
    children: '主要大按钮'
  }
};

export const DangerSmall: Story = {
  args: {
    type: 'danger',
    size: 'small',
    children: '危险小按钮'
  }
};

export const WithClick: Story = {
  args: {
    type: 'primary',
    children: '点击我',
    onClick: () => alert('按钮被点击了！')
  }
};