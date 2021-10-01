import { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';

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
      className={cx(
        'button',
        { outlined: isOutlined },
        { gray: isGray }
      )}
      {...props}
    />
  )
}
