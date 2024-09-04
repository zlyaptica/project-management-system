import React, { FC } from "react";
import styles from "./InputHeader.module.css";

interface IInputHeaderProps {
  children: React.ReactNode;
}

const InputHeader: FC<IInputHeaderProps> = ({ children }) => {
  return <div className={styles.inputHeader}>{children}</div>;
};

export { InputHeader };
