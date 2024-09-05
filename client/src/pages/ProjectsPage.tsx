import { useEffect, useState } from "react";
import { Button } from "antd";
import { CreateProjectForm } from "../components/Projects/CreateProjectForm";
import { useAppSelector } from "../shared/hooks/redux";
import { ProjectList } from "../components/Projects/ProjectList/ProjectList";
import { useAppDispatch } from "../store/store";
import { getProjects } from "../store/reducers/ProjectsReducers/ActionCreators";

const ProjectsPage = () => {
  const dispatch = useAppDispatch()
  const { projects } = useAppSelector((state) => state.projectReducer);
  const { isLoading } = useAppSelector((state) => state.projectReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getProjects())
  }, [dispatch])

  return (
    <div>
      {isLoading && <p>Загрузка...</p>}
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Создать проект
      </Button>
      {projects ? (
        <ProjectList
          projects={projects}
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
