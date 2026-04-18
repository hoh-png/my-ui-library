import type { Meta, StoryObj } from '@storybook/react';
import Menu, { MenuItem, SubMenu } from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs']
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalMenu: Story = {
  render: () => (
    <Menu mode="vertical" onSelect={(key) => console.log('Selected:', key)}>
      <MenuItem key="1">菜单项 1</MenuItem>
      <MenuItem key="2">菜单项 2</MenuItem>
      <MenuItem key="3">菜单项 3</MenuItem>
      <SubMenu key="sub1" title="子菜单">
        <MenuItem key="4">子菜单项 1</MenuItem>
        <MenuItem key="5">子菜单项 2</MenuItem>
      </SubMenu>
      <MenuItem key="6" disabled>禁用菜单项</MenuItem>
    </Menu>
  )
};

export const HorizontalMenu: Story = {
  render: () => (
    <Menu mode="horizontal" onSelect={(key) => console.log('Selected:', key)}>
      <MenuItem key="1">首页</MenuItem>
      <MenuItem key="2">产品</MenuItem>
      <MenuItem key="3">关于我们</MenuItem>
      <SubMenu key="sub1" title="更多">
        <MenuItem key="4">联系我们</MenuItem>
        <MenuItem key="5">帮助中心</MenuItem>
      </SubMenu>
    </Menu>
  )
};

export const WithDefaultSelected: Story = {
  render: () => (
    <Menu mode="vertical" selectedKey="2">
      <MenuItem key="1">未选中</MenuItem>
      <MenuItem key="2">默认选中</MenuItem>
      <MenuItem key="3">其他项</MenuItem>
    </Menu>
  )
};