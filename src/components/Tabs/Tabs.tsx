// 作用：把内容分组，通过点击不同标签切换显示不同内容
// ┌─────────────────────────────────────┐
// │  [个人资料]  [账号安全]  [通知设置]  │  ← 标签栏
// ├─────────────────────────────────────┤
// │                                     │
// │   当前标签对应的内容会显示在这里      │
// │                                     │
// └─────────────────────────────────────┘

import React, { useState } from 'react';
import './Tabs.scss';

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveIndex?: number;
}

export const Tabs: React.FC<TabsProps> = ({ 
    items, defaultActiveIndex = 0 
}) => {
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

    const handleTabClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="tabs">
            <div className="tabs__header">
                {items.map((item, index) => (
                    <button
                        key={index}
                        className={`tabs__tab ${index === activeIndex ? 'tabs__tab--active' : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <div className="tabs__content">
                {items[activeIndex]?.content}
            </div>
        </div>
    );

}