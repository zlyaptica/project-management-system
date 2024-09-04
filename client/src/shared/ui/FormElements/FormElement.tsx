import React, { FC } from "react";
import { Input } from "./UncotrolledInput";
import { FormElementContainer } from "../FormElementContainer/FormElementContainer";
import { InputHeader } from "./InputHeader";

interface IFormElementProps {
  inputHeader: string;
  type: string;
  name: string;
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
  autoComplete: string;
}

const FormElement: FC<IFormElementProps> = ({
  inputHeader,
  type,
  name,
  isRequired,
  minLength,
  maxLength,
  autoComplete,
}) => {
  return (
    <FormElementContainer>
      <InputHeader>{inputHeader}</InputHeader>
      <Input
        type={type}
        name={name}
        isRequired
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
      />
    </FormElementContainer>
  );
};

export { FormElement };
