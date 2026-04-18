import React, { useState } from 'react';
import './Form.scss';

export interface FormProps {
  onSubmit?: (data: Record<string, any>) => void;
  onReset?: () => void;
  children: React.ReactNode;
  labelWidth?: number | string;
  disabled?: boolean;
  className?: string;
}

export const Form: React.FC<FormProps> = ({
  onSubmit,
  onReset,
  children,
  labelWidth = '100px',
  disabled = false,
  className = '',
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const updateField = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    onSubmit?.(formData);
  };

  const handleReset = () => {
    if (disabled) return;
    setFormData({});
    onReset?.();
  };

  return (
    <form className={`form ${className}`} onSubmit={handleSubmit} onReset={handleReset}>
      <FormContext.Provider value={{ formData, updateField, disabled, labelWidth }}>
        {children}
      </FormContext.Provider>
    </form>
  );
};

// 创建 Context
const FormContext = React.createContext<any>(null);

// 自定义 Hook
export const useFormContext = () => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within Form');
  }
  return context;
};