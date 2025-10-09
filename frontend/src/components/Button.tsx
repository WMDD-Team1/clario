import { ReactNode } from "react";

const Button = () => {
  return <button className='p-[1rem] rounded-[1rem] bg-gray-500'>Button</button>;
};

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className}`}
    >
      {children}
    </button>
  );
};
export default Button;
