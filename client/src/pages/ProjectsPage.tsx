import { useEffect, useState } from "react";
import { Button, notification } from "antd";
import { CreateProjectForm } from "../components/Projects/CreateProjectForm";
import { useAppSelector } from "../shared/hooks/redux";
import { useAppDispatch } from "../store/store";
import { ProjectList } from "../components/Projects/ProjectList/ProjectList";
import { changeTitle, deleteProject, getProjects } from "../store/reducers/ProjectsReducers/ActionCreators";
import { INotification, openNotificationWithIcon } from "../shared/utils/Notification";
import { IError } from "../shared/models/IError";

const ProjectsPage = () => {
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();

  const { projects } = useAppSelector((state) => state.projectReducer);
  const { isLoading } = useAppSelector((state) => state.projectReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeProjectTitle = async (id: string) => {
  };

  const handleDeleteProject = async (id: string) => {
    const resultAction = await dispatch(deleteProject(id));
    if (deleteProject.rejected.match(resultAction)) {
      const notificationBody: INotification = {
        api: api,
        type: "error",
        message: "Удаление проекта",
        description: (resultAction.payload as IError).message,
      };
      openNotificationWithIcon(notificationBody);
    } else {
      const notificationBody: INotification = {
        api: api,
        type: "success",
        message: "Удаление проекта",
        description: "Проект успешно удален!",
      };
      openNotificationWithIcon(notificationBody);
      setIsModalOpen(false)
    }
  };

  useEffect(() => {
    dispatch(getProjects())
  }, [])

  return (
    <div>
      {contextHolder}
      {isLoading && <p>Загрузка...</p>}
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Создать проект
      </Button>
      {projects ? (
        <ProjectList
          projects={projects}
          handleChangeProjectTitle={handleChangeProjectTitle}
          handleDeleteProject={handleDeleteProject}
        />
      ) : (
        <p>Вы не состоите ни в одном проекте</p>
      )}
      {isModalOpen && (
        <CreateProjectForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export { ProjectsPage };
