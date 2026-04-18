import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

const basicTabs = [
  { key: '1', label: '标签1', content: <div>内容1</div> },
  { key: '2', label: '标签2', content: <div>内容2</div> },
  { key: '3', label: '标签3', content: <div>内容3</div> },
];

export const Basic: Story = {
  args: {
    items: basicTabs,
    defaultActiveIndex: 1,
  },
};

const richTabs = [
  { 
    key: '1', 
    label: '用户信息', 
    content: (
      <div>
        <h3>用户信息</h3>
        <p>姓名: 李四</p>
        <p>职位: 前端开发</p>
      </div>
    ) 
  },
  { 
    key: '2', 
    label: '项目列表', 
    content: (
      <ul>
        <li>项目A</li>
        <li>项目B</li>
        <li>项目C</li>
      </ul>
    ) 
  },
];

export const WithRichContent: Story = {
  args: {
    items: richTabs,
    defaultActiveIndex: 1,
  },
};