
import { useLocation } from "react-router-dom";
import { PagePath } from "../../models/PagePath";
import { ProfileHeader } from "../PageHeaderData/ProfileHeader";
import { MyTaskHeader } from "../PageHeaderData/MyTaskHeader";
import { ProjectsHeader } from "../PageHeaderData/ProjectsHeader";
import { ProjectHeader } from "../PageHeaderData/ProjectHeader";

interface LocationState {
  pathname: string;
}

const FillHeader = () => {
  const location = useLocation();
  const { pathname } = location as LocationState;
  if (pathname === PagePath.profile) {
    return <ProfileHeader />;
  } else if (pathname === PagePath.myTasks) {
    return <MyTaskHeader />;
  } else if (pathname === PagePath.projects) {
    return <ProjectsHeader />;
  } else if (pathname === PagePath.project) {
    return <ProjectHeader />
  }
  return <h3>Заголовок</h3>;
};

export { FillHeader };
