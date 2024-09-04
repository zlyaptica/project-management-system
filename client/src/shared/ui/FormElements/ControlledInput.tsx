import React, { FC } from "react";

interface IInputProps<T = string> {
  type: string;
  name: string;
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
  autoComplete: string;
  value: T;
  onChange: (value: T) => void;
}

const ControlledInput: FC<IInputProps> = ({
  type,
  name,
  isRequired,
  minLength,
  maxLength,
  autoComplete,
  value,
  onChange,
}) => {
  return <input
  type={type}
  name={name}
  className="formInput"
  required={isRequired}
  autoComplete={autoComplete}
  value={value}
  onChange={(e) => onChange(e.target.value)}
/>
};

export { ControlledInput };
