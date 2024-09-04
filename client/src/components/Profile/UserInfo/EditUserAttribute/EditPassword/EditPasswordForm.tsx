import { Modal, notification } from "antd";
import React, { FC, FormEvent, useState } from "react";
import { Form } from "react-router-dom";
import { SubmitButton } from "../../../../../shared/ui/SubmitButton/SubmitButton";
import "./EditPasswordForm.css";
import { ControlledInput } from "../../../../../shared/ui/FormElements/ControlledInput";
import { INotification, openNotificationWithIcon } from "../../../../../shared/utils/Notification";
import { FormElementContainer } from "../../../../../shared/ui/FormElementContainer/FormElementContainer";

interface IEditPasswordProps {
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
  handleChangePassword: (oldPassword: string, newPassword: string) => void;
  isLoading: boolean;
}

const EditPasswordForm: FC<IEditPasswordProps> = ({
  isModalOpen,
  setIsModalOpen,
  handleChangePassword,
  isLoading,
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      const notificationBody: INotification = {
        api: api,
        type: "warning",
        message: "Изменение пароля",
        description: "Вы неверно повторили пароль",
      };
      openNotificationWithIcon(notificationBody);
      return;
    }

    if (oldPassword === newPassword) {
      const notificationBody: INotification = {
        api: api,
        type: "warning",
        message: "Изменение пароля",
        description: "Вы ввели используемый пароль",
      };
      openNotificationWithIcon(notificationBody);
      return;
    }
    handleChangePassword(oldPassword, newPassword);
  };
  return (
    <>
      {contextHolder}
      <Modal
        className="modal"
        title="Изменение пароля"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
      >
        <Form onSubmit={handleSubmit}>
          <FormElementContainer>
            <p className="inputHeader">Старый пароль</p>

            <ControlledInput
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={setOldPassword}
              isRequired
              minLength={8}
              maxLength={128}
              autoComplete="change-password old-password"
            />
          </FormElementContainer>
          <FormElementContainer>
            <p className="inputHeader">Новый пароль пароль</p>

            <ControlledInput
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={setNewPassword}
              isRequired
              minLength={8}
              maxLength={128}
              autoComplete="change-password new-password"
            />
          </FormElementContainer>
          <FormElementContainer>
            <p className="inputHeader">Подтвердите новый пароль</p>

            <ControlledInput
              type="password"
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={setConfirmNewPassword}
              isRequired
              minLength={8}
              maxLength={128}
              autoComplete="change-password confirm-new-password"
            />
          </FormElementContainer>
          <SubmitButton loading={isLoading}>Изменить</SubmitButton>
        </Form>
      </Modal>
    </>
  );
};

export { EditPasswordForm };
