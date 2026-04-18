import React, {useState} from 'react';
import './Input.scss';

export interface InputProps {
    label?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'search' ;
    size?: 'large' | 'medium' | 'small';
    placeholder?: string;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    onFocus?: () => void;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  size = 'medium',
  placeholder,
  prefix,
  suffix,
  onFocus,
  value: propValue,
  onChange,
  disabled = false,
  error,
}) => {
  const [internalValue, setInternalValue] = useState('');
  
  const isControlled = propValue !== undefined;
  const currentValue = isControlled ? propValue : internalValue;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    if (type === 'number') {
      if (newValue !== '' && isNaN(Number(newValue))) {
        return;
      }
    }
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue);
  };
  
  const classes = [
    'input-wrapper',
    `input-wrapper-${size}`,
    disabled && 'input-wrapper-disabled',
    error && 'input-wrapper-error',
    prefix && 'has-prefix',
    suffix && 'has-suffix',
  ].filter(Boolean).join(' ');
  
  const inputId = label ? `input-${Math.random().toString(36).slice(2, 8)}` : undefined;
  
  return (
    <div className="input-container">
      {/* // 若无label就不渲染标签 */}
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      
      {/* 同理，无pre不渲染前缀 */}
      <div className={classes}>
        {prefix && <div className="input-prefix">{prefix}</div>}
        
        <input
          id={inputId}
          className="input"
          type={type}
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={onFocus}
          onChange={handleChange}
        />
        
        {suffix && <div className="input-suffix">{suffix}</div>}
      </div>
      
      {error && (
        <div className="input-error-message">{error}</div>
      )}
    </div>
  );
};

export default Input;