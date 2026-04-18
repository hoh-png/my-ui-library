// 作用：显示一个小图形/符号，用于视觉提示。
// 🔍  ← 搜索图标
// ❤️  ← 喜欢图标
// ⚙️  ← 设置图标
// ✖️  ← 关闭图标
import React from 'react';
import './Icon.scss';

export interface IconProps {
  size?: number;
  color?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({  
    size = 16,
    color = 'currentColor',
    children,
    className = '',
}) => {
    const iconClasses = ['icon', `icon--${size}`, className].filter(Boolean).join(' ');
       
    const iconStyle = {color, fontSize: size};

    return (
        <span className={iconClasses} style={iconStyle}>
            {children}
        </span>
    )
}


