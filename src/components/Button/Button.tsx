import React from 'react';
import './Button.scss';

export interface ButtonProps {
  type?: 'primary' | 'default' | 'danger';
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  children
}) => {
  const classes = [
    'btn',
    `btn-${type}`,
    `btn-${size}`,
    disabled && 'btn-disabled',
    loading && 'btn-loading'
  ].filter(Boolean).join(' ');
  
  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <span className="btn-spinner"></span>}
      <span className="btn-content">{children}</span>
    </button>
  );
};

export default Button;