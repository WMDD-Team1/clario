import { ReactNode } from 'react';
import { colorOptions } from './style/color';
import classNames from 'classnames';

interface ButtonProps {
  buttonColor?:
    | 'white'
    | 'lightButton'
    | 'darkButton'
    | 'regularButton'
    | 'deleteButton'
    | 'whiteButton';
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  width?: string;
  textColor?: string;
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  type = 'button',
  buttonColor,
  width,
  textColor,
  disabled = false,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        'p-[1rem] rounded-[1rem]',
        colorOptions[buttonColor],
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
      style={{ width: width, color: textColor }}
    >
      {children}
    </button>
  );
};
export default Button;
