import React, { FC } from "react";
import styles from "./FormElementContainer.module.css";

interface IFormElementProps {
  children: React.ReactNode;
}

const FormElementContainer: FC<IFormElementProps> = ({ children }) => {
  return <div className={styles.formElement}>{children}</div>;
};

export { FormElementContainer };
