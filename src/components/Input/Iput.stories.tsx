import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import { useState } from 'react';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],// 自动生成文档
  argTypes: {
    prefix: { control: {type:'text'}, description: '前缀内容' },
    suffix: { control: {type:'text'}, description: '后缀内容' },
    value: { control: {type:'text'}, },
  },
} satisfies Meta<typeof Input>;

// export导出meta类型以供Storybook使用
export default meta;

type Story = StoryObj<typeof Input>;

export const Basic: Story = {
  args: {
    placeholder: '请输入内容',
    size: 'medium'
  }
};

export const WithLabel: Story = {
  args: {
    label: '用户名',
    placeholder: '请输入用户名',
  }
};

export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input type="text" label="文本" placeholder="文本输入" />
      <Input type="password" label="密码" placeholder="密码输入" />
      <Input type="email" label="邮箱" placeholder="邮箱输入" />
      <Input type="number" label="数字" placeholder="数字输入" />
      <Input type="search" label="搜索" placeholder="搜索内容" />
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input size="large" placeholder="大尺寸输入框" />
      <Input size="medium" placeholder="中尺寸输入框" />
      <Input size="small" placeholder="小尺寸输入框" />
    </div>
  )
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div>
        <Input
          label="受控输入框"
          value={value}
          onChange={setValue}
          placeholder="输入内容..."
        />
        <div style={{ marginTop: 16, fontSize: 12, color: '#666' }}>
          当前输入: {value || '无'}
        </div>
      </div>
    );
  }
};

export const Disabled: Story = {
  args: {
    label: '禁用输入框',
    value: '不可编辑的内容',
    disabled: true,
  }
};

export const Error: Story = {
  args: {
    label: '邮箱',
    value: 'invalid-email',
    error: '请输入正确的邮箱地址',
  }
};

export const WithPrefix: Story = {
  args: {
    label: '搜索',
    prefix: '🔍',
    placeholder: '搜索...',
  }
};

export const WithSuffix: Story = {
  args: {
    label: '域名',
    suffix: '.com',
    placeholder: 'your-site',
  }
};

export const WithFocus: Story = {
  args: {
    label: '聚焦测试',
    placeholder: '点击我触发聚焦事件',
    onFocus: () => console.log('聚焦了'),
  }
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      age: ''
    });
    
    const [errors, setErrors] = useState({
      username: '',
      email: '',
      age: ''
    });

    const handleUsernameChange = (value: string) => {
      setFormData(prev => ({ ...prev, username: value }));

      if (errors.username) {
        setErrors(prev => ({ ...prev, username: '' }));
      }
    };
    
    const handleEmailChange = (value: string) => {
      setFormData(prev => ({ ...prev, email: value }));
      if (errors.email) {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    };
    
    const handleAgeChange = (value: string) => {
      setFormData(prev => ({ ...prev, age: value }));
      if (errors.age) {
        setErrors(prev => ({ ...prev, age: '' }));
      }
    };

    const validate = () => {
      const newErrors = {
        username: formData.username.length < 3 ? '用户名至少3个字符' : '',
        email: !formData.email.includes('@') ? '请输入有效的邮箱' : '',
        age: formData.age && (Number(formData.age) < 0 || Number(formData.age) > 150) ? '年龄必须在0-150之间' : ''
      };
      setErrors(newErrors);
      
      if (!newErrors.username && !newErrors.email && !newErrors.age) {
        alert('验证通过！');
      }
    };
    
    return (
      <div style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: 16 }}>
          <Input
            label="用户名"
            value={formData.username}
            onChange={handleUsernameChange}
            error={errors.username}
            placeholder="请输入用户名（至少3个字符）"
          />
        </div>
        
        <div style={{ marginBottom: 16 }}>
          <Input
            label="邮箱"
            type="email"
            value={formData.email}
            onChange={handleEmailChange}
            error={errors.email}
            placeholder="请输入邮箱（需要包含@）"
          />
        </div>
        
        <div style={{ marginBottom: 16 }}>
          <Input
            label="年龄"
            type="number"
            value={formData.age}
            onChange={handleAgeChange}
            error={errors.age}
            placeholder="请输入年龄（0-150）"
          />
        </div>
        
        <button 
          onClick={validate}
          style={{ 
            padding: '8px 16px', 
            cursor: 'pointer',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          验证表单
        </button>
      </div>
    );
  }
};