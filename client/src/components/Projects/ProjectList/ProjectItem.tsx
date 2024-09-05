import { Button, notification } from "antd";
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ControlledInput } from "../../../shared/ui/FormElements/ControlledInput";
import { IProject } from "../../../shared/models/IProject";
import { IChangeTitleRequest } from "../../../store/reducers/ProjectsReducers/Models/ChangeTitle";
import {
  changeTitle,
  deleteProject,
} from "../../../store/reducers/ProjectsReducers/ActionCreators";
import { useAppDispatch } from "../../../store/store";
import { INotification, openNotificationWithIcon } from "../../../shared/utils/Notification";
import { IError } from "../../../shared/models/IError";
import "./ProjectItem.css"

interface IProjectItemProps {
  project: IProject;
}

const ProjectItem: FC<IProjectItemProps> = ({ project }) => {
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [notificationMessage, setNotificationMessage] = useState<INotification | null>(null);

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [isEditProjectTitle, setIsEditProjectTitle] = useState(false);

  const handleChangeProjectTitle = async (project_id: string, title: string) => {
    const changeTitleResponseBody: IChangeTitleRequest = {
      _id: project_id,
      title: title,
    };
    const resultAction = await dispatch(changeTitle(changeTitleResponseBody));
    if (deleteProject.rejected.match(resultAction)) {
      setNotificationMessage({
        api: api,
        type: "error",
        message: "Удаление проекта",
        description: (resultAction.payload as IError).message,
      });
      return;
    }
    setIsEditProjectTitle(false);
  };

  const handleDeleteProject = async (project_id: string) => {
    const resultAction = await dispatch(deleteProject(project_id));
    if (deleteProject.rejected.match(resultAction)) {
      setNotificationMessage({
        api: api,
        type: "error",
        message: "Удаление проекта",
        description: (resultAction.payload as IError).message,
      });
    } else {
      setNotificationMessage({
        api: api,
        type: "success",
        message: "Удаление проекта",
        description: "Проект успешно удален!",
      });
    }
  };

  const changeStateOfEditInput = (bool: boolean) => {
    setIsEditProjectTitle(bool)
    setUpdatedTitle(project.title)
  }

  useEffect(() => {
    if (notificationMessage) {
      openNotificationWithIcon(notificationMessage);
      setNotificationMessage(null); // Clear the notification message after displaying it
    }
  }, [notificationMessage]);

  return (
    <>
      {contextHolder}
      <tr className="projectsTableRow">
        <td className="projectsTableCell projectTitle">
          {isEditProjectTitle ? (
            <ControlledInput
              type="text"
              name="updatedTitle"
              isRequired
              minLength={4}
              maxLength={128}
              autoComplete="edit-project-title"
              value={updatedTitle}
              onChange={setUpdatedTitle}
            />
          ) : (
            <h3>
              <Link to={`/project/${project._id}`}>{project.title}</Link>
            </h3>
          )}
        </td>
        <td className="projectsTableCell projectButton">
          {isEditProjectTitle ? (
            <Button type="link" onClick={() => handleChangeProjectTitle(project._id, updatedTitle)}>
              Сохранить
            </Button>
          ) : (
            <Button type="link" onClick={() => changeStateOfEditInput(true)}>
              Изменить название
            </Button>
          )}
        </td>
        <td className="projectsTableCell projectButton">
          {isEditProjectTitle ? (
            <Button danger type="text" onClick={() => changeStateOfEditInput(false)}>
              Отменить
            </Button>
          ) : (
            <Button danger type="text" onClick={() => handleDeleteProject(project._id)}>
              Удалить
            </Button>
          )}
        </td>
      </tr>
    </>
  );
};

export { ProjectItem };
