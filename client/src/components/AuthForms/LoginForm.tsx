import React, { FC } from "react";
import { Form, Link } from "react-router-dom";
import "./AuthForm.css";
import { Card, notification } from "antd";
import { SubmitButton } from "../../shared/ui/SubmitButton/SubmitButton";
import { FormElement } from "../../shared/ui/FormElements/FormElement";
import { useAppSelector } from "../../shared/hooks/redux";
import { INotification, openNotificationWithIcon } from "../../shared/utils/Notification";

const LoginForm: FC = () => {
  const { isLoading } = useAppSelector((state) => state.userReduser);
  const { error } = useAppSelector((state) => state.userReduser);
  const [api, contextHolder] = notification.useNotification();

  const handleSubmit = () => {
    if (error?.status === 400) {
      const notificationBody: INotification = {
        api: api,
        type: "error",
        message: "Ошибка при входе",
        description: error.message,
      };
      openNotificationWithIcon(notificationBody);
    }
  };

  return (
    <>
    {contextHolder}
      <Form onSubmit={handleSubmit} method="post" id="login-form" className="formContainer">
        <Card title="Вход в аккаунт" bordered={false} style={{ width: 350 }}>
          <FormElement
            inputHeader="Почтовый адрес"
            type="email"
            name="email"
            isRequired
            autoComplete="login email"
          />
          <FormElement
            inputHeader="Пароль"
            type="password"
            name="password"
            isRequired
            minLength={8}
            maxLength={128}
            autoComplete="login email"
          />
          <div className="controlBlock">
            <SubmitButton loading={isLoading}>Войти</SubmitButton>
            или
            <Link to={`/registration`}>Зарегистрироваться</Link>
          </div>
        </Card>
      </Form>
    </>
  );
};

export { LoginForm };
