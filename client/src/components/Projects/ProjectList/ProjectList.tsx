import { FC} from "react";
import "./ProjectList.css";
import { IProject } from "../../../shared/models/IProject";
import { ProjectItem } from "./ProjectItem";

interface IProjectListProps {
  projects: IProject[];
}

const ProjectList: FC<IProjectListProps> = ({
  projects,
}) => {

  return (
    <table className="projectsTable">
      <tbody>
        {projects.map((project) => (
          <ProjectItem key={project._id} project={project}/>
        ))}
      </tbody>
    </table>
  );
};

export { ProjectList };