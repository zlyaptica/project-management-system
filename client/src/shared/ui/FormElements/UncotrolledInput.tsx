import React, { FC } from "react";
import "./Input.css";

interface IInputProps {
  type: string;
  name: string;
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
  autoComplete: string;
}

const Input: FC<IInputProps> = ({
  type,
  name,
  isRequired,
  minLength,
  maxLength,
  autoComplete,
}) => {
  return (
    <input
      type={type}
      name={name}
      className="formInput"
      required={isRequired}
      autoComplete={autoComplete}
    />
  );
};

export { Input };
