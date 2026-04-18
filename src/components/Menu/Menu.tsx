import React, { useState, createContext, useContext } from 'react';
import './Menu.scss';

// 菜单上下文
interface MenuContextType {
  selectedKey: string;
  onSelect: (key: string) => void;
  mode: 'horizontal' | 'vertical';
}

const MenuContext = createContext<MenuContextType | null>(null);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu components must be used within Menu');
  }
  return context;
};

// Menu 组件
export interface MenuProps {
  selectedKey?: string;
  mode?: 'horizontal' | 'vertical';
  onSelect?: (key: string) => void;
  children?: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({
  selectedKey: externalSelectedKey,
  mode = 'vertical',
  onSelect,
  children
}) => {
  const [internalSelectedKey, setInternalSelectedKey] = useState<string>('');
  const selectedKey = externalSelectedKey ?? internalSelectedKey;
  
  const handleSelect = (key: string) => {
    setInternalSelectedKey(key);
    onSelect?.(key);
  };
  
  return (
    <MenuContext.Provider value={{ selectedKey, onSelect: handleSelect, mode }}>
      <ul className={`menu menu-${mode}`}>
        {children}
      </ul>
    </MenuContext.Provider>
  );
};

export interface MenuItemProps {
  key: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  key: itemKey,
  disabled = false,
  children
}) => {
  const { selectedKey, onSelect, mode } = useMenu();
  const isActive = selectedKey === itemKey;
  
  const handleClick = () => {
    if (!disabled) {
      onSelect(itemKey);
    }
  };
  
  return (
    <li
      className={`menu-item ${isActive ? 'menu-item-active' : ''} ${disabled ? 'menu-item-disabled' : ''}`}
      onClick={handleClick}
    >
      {children}
    </li>
  );
};


export interface SubMenuProps {
  key: string;
  title: string;
  children?: React.ReactNode;
}

export const SubMenu: React.FC<SubMenuProps> = ({
  key: subKey,
  title,
  children
}) => {
  const [open, setOpen] = useState(false);
  const { selectedKey, mode } = useMenu();
  
  const isActive = selectedKey === subKey;
  
  const handleToggle = () => {
    setOpen(!open);
  };
  
  return (
    <li className={`submenu ${isActive ? 'submenu-active' : ''}`}>
      <div className="submenu-title" onClick={handleToggle}>
        {title}
        <span className="submenu-arrow">{open ? '▼' : '▶'}</span>
      </div>
      {open && (
        <ul className="submenu-items">
          {children}
        </ul>
      )}
    </li>
  );
};

export default Menu;