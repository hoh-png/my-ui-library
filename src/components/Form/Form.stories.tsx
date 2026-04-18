import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Form } from './Form';
import { FormItem } from './FormItem';
import './Form.scss';

const meta = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof Form>;

export const Basic: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      <Form
        onSubmit={(data) => console.log('提交:', data)}
        onReset={() => console.log('重置')}
        labelWidth="100px"
      >
        <FormItem name="username" label="用户名">
          {(value, onChange, disabled) => (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              placeholder="请输入用户名"
              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
            />
          )}
        </FormItem>

        <FormItem name="email" label="邮箱">
          {(value, onChange, disabled) => (
            <input
              type="email"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              placeholder="请输入邮箱"
              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
            />
          )}
        </FormItem>

        <FormItem name="age" label="年龄">
          {(value, onChange, disabled) => (
            <input
              type="number"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              placeholder="请输入年龄"
              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
            />
          )}
        </FormItem>

        <div style={{ marginLeft: '100px' }}>
          <button type="submit" style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            提交
          </button>
          <button type="reset" style={{ marginLeft: '8px', padding: '8px 16px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            重置
          </button>
        </div>
      </Form>
    </div>
  ),
};

export const WithSelect: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      <Form
        onSubmit={(data) => console.log('提交:', data)}
        labelWidth="100px"
      >
        <FormItem name="username" label="用户名">
          {(value, onChange, disabled) => (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              placeholder="请输入用户名"
              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
            />
          )}
        </FormItem>

        <FormItem name="city" label="城市">
          {(value, onChange, disabled) => (
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
            >
              <option value="">请选择城市</option>
              <option value="beijing">北京</option>
              <option value="shanghai">上海</option>
              <option value="guangzhou">广州</option>
              <option value="shenzhen">深圳</option>
            </select>
          )}
        </FormItem>

        <FormItem name="gender" label="性别">
          {(value, onChange, disabled) => (
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
            >
              <option value="">请选择性别</option>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          )}
        </FormItem>

        <div style={{ marginLeft: '100px' }}>
          <button type="submit" style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            提交
          </button>
        </div>
      </Form>
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => {
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const validate = (data: any) => {
      const newErrors: Record<string, string> = {};
      if (!data.username) newErrors.username = '用户名不能为空';
      if (!data.email) newErrors.email = '邮箱不能为空';
      if (data.email && !data.email.includes('@')) newErrors.email = '邮箱格式不正确';
      if (!data.age) newErrors.age = '年龄不能为空';
      if (data.age && (data.age < 0 || data.age > 150)) newErrors.age = '年龄不合法';
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (data: any) => {
      if (validate(data)) {
        console.log('提交成功:', data);
        alert('提交成功！');
      }
    };

    return (
      <div style={{ width: '500px' }}>
        <Form
          onSubmit={handleSubmit}
          labelWidth="100px"
        >
          <FormItem name="username" label="用户名">
            {(value, onChange, disabled) => (
              <div>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                    if (errors.username) setErrors({ ...errors, username: '' });
                  }}
                  disabled={disabled}
                  placeholder="请输入用户名"
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: `1px solid ${errors.username ? '#ef4444' : '#d1d5db'}`,
                    borderRadius: '4px' 
                  }}
                />
                {errors.username && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.username}</div>}
              </div>
            )}
          </FormItem>

          <FormItem name="email" label="邮箱">
            {(value, onChange, disabled) => (
              <div>
                <input
                  type="email"
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  disabled={disabled}
                  placeholder="请输入邮箱"
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: `1px solid ${errors.email ? '#ef4444' : '#d1d5db'}`,
                    borderRadius: '4px' 
                  }}
                />
                {errors.email && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.email}</div>}
              </div>
            )}
          </FormItem>

          <FormItem name="age" label="年龄">
            {(value, onChange, disabled) => (
              <div>
                <input
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                    if (errors.age) setErrors({ ...errors, age: '' });
                  }}
                  disabled={disabled}
                  placeholder="请输入年龄"
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: `1px solid ${errors.age ? '#ef4444' : '#d1d5db'}`,
                    borderRadius: '4px' 
                  }}
                />
                {errors.age && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.age}</div>}
              </div>
            )}
          </FormItem>

          <div style={{ marginLeft: '100px' }}>
            <button type="submit" style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              提交
            </button>
            <button type="reset" style={{ marginLeft: '8px', padding: '8px 16px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              重置
            </button>
          </div>
        </Form>
      </div>
    );
  },
};

export const DisabledForm: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      <Form
        onSubmit={(data) => console.log('提交:', data)}
        labelWidth="100px"
        disabled={true}
      >
        <FormItem name="username" label="用户名">
          {(value, onChange, disabled) => (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              placeholder="这个表单被禁用了"
              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', background: '#f3f4f6' }}
            />
          )}
        </FormItem>

        <FormItem name="email" label="邮箱">
          {(value, onChange, disabled) => (
            <input
              type="email"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              placeholder="所有输入框都禁用了"
              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', background: '#f3f4f6' }}
            />
          )}
        </FormItem>

        <div style={{ marginLeft: '100px' }}>
          <button type="submit" disabled style={{ padding: '8px 16px', background: '#9ca3af', color: 'white', border: 'none', borderRadius: '4px', cursor: 'not-allowed' }}>
            提交
          </button>
          <button type="reset" disabled style={{ marginLeft: '8px', padding: '8px 16px', background: '#9ca3af', color: 'white', border: 'none', borderRadius: '4px', cursor: 'not-allowed' }}>
            重置
          </button>
        </div>
      </Form>
    </div>
  ),
};