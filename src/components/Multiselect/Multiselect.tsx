import React, { useState, useRef, useEffect } from 'react';
import './Multiselect.scss';

export interface Option {
  label: string;
  value: string;
}

export interface MultiselectProps {
  options: Option[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
}

const Multiselect: React.FC<MultiselectProps> = ({
  options,
  value = [],
  onChange,
  placeholder = '请选择',
  disabled = false,
  searchable = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleOption = (optionValue: string) => {
    if (disabled) return;
    const newValue = value.includes(optionValue) ? value.filter(v => v !== optionValue) : [...value, optionValue];
    
    onChange?.(newValue);
  };
  
  const removeOption = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = value.filter(v => v !== optionValue);
    onChange?.(newValue);
  };
  
  const clearAll = () => {
    onChange?.([]);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const selectedLabels = value.map(v => {
    const option = options.find(opt => opt.value === v);
    return option ? { value: v, label: option.label } : null;
  }).filter(Boolean);
  
  return (
    <div className="multiselect" ref={containerRef}>
      <div
        className={`multiselect-input ${disabled ? 'multiselect-disabled' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="multiselect-tags">
          {selectedLabels.map((item) => (
            <span key={item!.value} className="multiselect-tag">
              {item!.label}
              <button
                className="multiselect-tag-remove"
                onClick={(e) => removeOption(item!.value, e)}
              >
                ×
              </button>
            </span>
          ))}
          {selectedLabels.length === 0 && (
            <span className="multiselect-placeholder">{placeholder}</span>
          )}
        </div>
        <div className="multiselect-actions">
          {value.length > 0 && (
            <button
              className="multiselect-clear"
              onClick={clearAll}
            >
              ✕
            </button>
          )}
          <span className="multiselect-arrow">{isOpen ? '▲' : '▼'}</span>
        </div>
      </div>
      
      {isOpen && !disabled && (
        <div className="multiselect-dropdown">
          {searchable && (
            <input
              type="text"
              className="multiselect-search"
              placeholder="搜索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <div className="multiselect-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <div
                  key={option.value}
                  className={`multiselect-option ${value.includes(option.value) ? 'multiselect-option-selected' : ''}`}
                  onClick={() => toggleOption(option.value)}
                >
                  <input
                    type="checkbox"
                    checked={value.includes(option.value)}
                    readOnly
                  />
                  <span>{option.label}</span>
                </div>
              ))
            ) : (
              <div className="multiselect-no-data">暂无数据</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Multiselect;