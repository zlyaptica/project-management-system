import React, { FC } from "react";
import "./ProjectList.css";
import { Button } from "antd";
import { IProject } from "../../../shared/models/IProject";
import { Link } from "react-router-dom";

interface IProjectListProps {
  projects: IProject[];
  handleChangeProjectTitle: (id: string) => void;
  handleDeleteProject: (id: string) => void;
}

const ProjectList: FC<IProjectListProps> = ({ projects, handleChangeProjectTitle, handleDeleteProject }) => {
  return (
    <table className="projectsTable">
      <tbody>
        {projects.map((project) => (
          <tr key={project._id} className="projectsTableRow">
            <td className="projectsTableCell projectTitle">
              <h3>
                <Link to={`/project/${project._id}`}>{project.title}</Link>
              </h3>
            </td>
            <td className="projectsTableCell projectButton">
              <Button type="link" onClick={() => handleChangeProjectTitle(project._id)}>
                Изменить название
              </Button>
            </td>
            <td className="projectsTableCell projectButton">
              <Button danger type="text" onClick={() => handleDeleteProject(project._id)}>
                Удалить
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { ProjectList };

// <table>

//       <tr></tr>
//     </table>
