import { Modal, notification } from "antd";
import React, { FC, useState } from "react";
import { Form } from "react-router-dom";
import { SubmitButton } from "../../shared/ui/SubmitButton/SubmitButton";
import { ControlledInput } from "../../shared/ui/FormElements/ControlledInput";
import { InputHeader } from "../../shared/ui/FormElements/InputHeader";
import { FormElementContainer } from "../../shared/ui/FormElementContainer/FormElementContainer";
import { useAppDispatch } from "../../store/store";
import { createProject } from "../../store/reducers/ProjectsReducers/ActionCreators";
import { useAppSelector } from "../../shared/hooks/redux";
import { INotification, openNotificationWithIcon } from "../../shared/utils/Notification";
import { IError } from "../../shared/models/IError";

interface ICreateProjectFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
}

const CreateProjectForm: FC<ICreateProjectFormProps> = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useAppDispatch()
  const {isLoading} = useAppSelector(state => state.projectReducer)
  const [api, contextHolder] = notification.useNotification();

  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    const resultAction = await dispatch(createProject(title))
    if (createProject.rejected.match(resultAction)) {
      const notificationBody: INotification = {
        api: api,
        type: "error",
        message: "Создание проекта",
        description: (resultAction.payload as IError).message,
      };
      openNotificationWithIcon(notificationBody);
    } else {
      const notificationBody: INotification = {
        api: api,
        type: "success",
        message: "Создание проекта",
        description: "Проект успешно создан!",
      };
      openNotificationWithIcon(notificationBody);
      setIsModalOpen(false)
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        className="modal"
        title="Создание проекта"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
      >
        <Form onSubmit={handleSubmit}>
          <FormElementContainer>
            <InputHeader>Название проекта</InputHeader>
            <ControlledInput
              type="text"
              name="project_name"
              value={title}
              onChange={setTitle}
              isRequired
              minLength={8}
              maxLength={128}
              autoComplete="create-project project-name"
            />
          </FormElementContainer>
          <SubmitButton loading={isLoading}>Создать</SubmitButton>
        </Form>
      </Modal>
    </>
  );
};

export { CreateProjectForm };
