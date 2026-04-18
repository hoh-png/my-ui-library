import React from 'react';
import { useFormContext } from './Form';
import './Form.scss';

export interface FormItemProps {
  name: string;
  label?: string;
  children: (value: any, onChange: any, disabled: boolean) => React.ReactNode;
}

export const FormItem: React.FC<FormItemProps> = ({ name, label, children }) => {
  const { formData, updateField, disabled, labelWidth } = useFormContext();
  
  const value = formData[name] || '';
  const onChange = (newValue: any) => updateField(name, newValue);

  return (
    <div className="form-item">
      {label && (
        <label className="form-item__label" style={{ width: labelWidth }}>
          {label}
        </label>
      )}
      <div className="form-item__control">
        {children(value, onChange, disabled)}
      </div>
    </div>
  );
};