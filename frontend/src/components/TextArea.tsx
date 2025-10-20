import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  color?: string;
  borderColor?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, color, borderColor, id, ...props }) => (
  <div className="relative">
    {label && (
      <label
        htmlFor={id}
        className={`absolute top-[-0.8rem] left-[1rem] ${color} pl-[0.3rem] pr-[0.3rem] rounded-[1rem]`}
      >
        {label}
      </label>
    )}
    <textarea
      id={id}
      {...props}
      className={`p-[1rem] rounded-[1rem] border-2 ${borderColor || 'border-neutral-300'} w-full resize-none`}
    />
  </div>
);

export default TextArea;