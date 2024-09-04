import { Button } from "antd";
import "./SubmitButton.css";
import { FC } from "react";

interface ISubmitButtonProps {
  children: React.ReactNode;
  loading?: boolean;
}

const SubmitButton: FC<ISubmitButtonProps> = ({children, loading}) => {
  return (
    <Button htmlType="submit" type="primary" className="submitButton" loading={loading}>
      {children}
    </Button>
  );
};

export { SubmitButton };
