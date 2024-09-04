import { FC } from "react";
import { Form, Link } from "react-router-dom";
import { Card, notification } from "antd";
import "./AuthForm.css";
import { Input } from "../../shared/ui/FormElements/UncotrolledInput";
import { SubmitButton } from "../../shared/ui/SubmitButton/SubmitButton";
import { FormElement } from "../../shared/ui/FormElements/FormElement";
import { useAppSelector } from "../../shared/hooks/redux";
import { INotification, openNotificationWithIcon } from "../../shared/utils/Notification";

const RegistrationForm: FC = () => {
  const { isLoading } = useAppSelector((state) => state.userReduser);
  const { error } = useAppSelector((state) => state.userReduser);
  const [api, contextHolder] = notification.useNotification();

  const handleSubmit = () => {
    if (error?.status === 400) {
      const notificationBody: INotification = {
        api: api,
        type: "error",
        message: "Ошибка при регистрации",
        description: error.message,
      };
      openNotificationWithIcon(notificationBody);
    }
  };
  return (
    <>
    {contextHolder}
    <Form onSubmit={handleSubmit} method="post" id="registration-form" className="formContainer">
      <Card title="Регистрация" bordered={false} style={{ width: 350 }}>
        <FormElement inputHeader="Почтовый адрес"
          type="text"
          name="email"
          isRequired
          minLength={4}
          maxLength={128}
          autoComplete="registration email"/>
        <FormElement
          inputHeader="Имя пользователя"
          type="text"
          name="nickname"
          isRequired
          minLength={4}
          maxLength={128}
          autoComplete="registration nickname"
        />
        <FormElement
          inputHeader="Пароль"
          type="text"
          name="password"
          isRequired
          minLength={8}
          maxLength={128}
          autoComplete="registration password"
        />
        <div className="controlBlock">
          <SubmitButton loading={isLoading}>Зарегистрироваться</SubmitButton>
          или
          <Link to={`/login`}>Войти</Link>
        </div>
      </Card>
    </Form>
    </>
  
  );
};

export { RegistrationForm };
