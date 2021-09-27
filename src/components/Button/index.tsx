import { ButtonHTMLAttributes } from 'react';

import './styles.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
  isGray?: boolean;
};

export function Button({
    isOutlined = false,
    isGray = false,
    ...props
  }: ButtonProps)
  {
  return(
    <button
      className={`button ${isOutlined ? 'outlined' : ''} ${isGray ? 'gray' : ''}`}
      {...props}
    />
  )
}
