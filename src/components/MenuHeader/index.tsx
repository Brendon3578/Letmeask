import { ReactNode } from 'react';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

import { FiMenu } from 'react-icons/fi';

import './styles.scss'

type MenuHeaderProps = {
  children: ReactNode
}

export function MenuHeader ({children}:MenuHeaderProps) {
  
  return (
    <Menu menuButton={
      <MenuButton className='button menu-button'>
        <FiMenu className='global-icon menu-icon' />
      </MenuButton>
      }
      menuClassName="header-menu"
      transition
    >
      <MenuItem disabled>{children}</MenuItem>
    </Menu>
  );
}