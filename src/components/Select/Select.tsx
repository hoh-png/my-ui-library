// 作用：从多个选项中选一个（或选多个）。
// ┌─────────────────────────────────────┐
// │  请选择城市                      ▼  │  ← 点击展开
// └─────────────────────────────────────┘
//                     ↓
//         ┌─────────────────────────────┐
//         │ 北京                        │
//         │ 上海                        │  ← 选项列表
//         │ 广州                        │
//         │ 深圳                        │
//         └─────────────────────────────┘
import React, { useEffect, useState } from 'react';
import './Select.scss';

export interface SelectProps {
    options: { label: string; value: string }[];
    placeholder?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
    options,
    placeholder = '请选择',
    onChange,
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const selectedRef = React.useRef<HTMLDivElement>(null);

    const selectdLabel = options.find(option => option.value === selectedValue)?.label || placeholder;

    const handleSelect = (value: string) => {
        if (disabled) return;

        setSelectedValue(value);
        setIsOpen(false);
        onChange?.(value);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectedRef.current && !selectedRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="select" ref={selectedRef}>
            <div
                className={`select__trigger ${disabled ? 'select__trigger--disabled' : ''}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span className="select_value">{selectdLabel}</span>
                <span className={`select_arrow ${isOpen ? '▲' : '▼'}`}></span>
            </div>
            {isOpen && !disabled && (
                <div className="select__options">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`select__option ${option.value === selectedValue ? 'select__option--selected' : ''}`}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};