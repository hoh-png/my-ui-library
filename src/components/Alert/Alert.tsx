import React, { useState } from 'react';
import './Alert.scss';

export interface AlertProps {
  type?: 'success' | 'info' | 'warning' | 'error';
  message: string;
  description?: string;
  closable?: boolean;
  onClose?: () => void;
  showIcon?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  type = 'info',
  message,
  description,
  closable = false,
  onClose,
  showIcon = true
}) => {
  const [visible, setVisible] = useState(true);
  
  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };
  
  if (!visible) return null;
  
  const icons = {
    success: '✓',
    info: 'ℹ',
    warning: '⚠',
    error: '✗'
  };
  
  return (
    <div className={`alert alert-${type}`}>
      {showIcon && (
        <div className="alert-icon">{icons[type]}</div>
      )}
      <div className="alert-content">
        <div className="alert-message">{message}</div>
        {description && (
          <div className="alert-description">{description}</div>
        )}
      </div>
      {closable && (
        <button className="alert-close" onClick={handleClose}>
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;