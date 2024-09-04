import type { MenuProps } from "antd";
import { ScheduleOutlined, FolderOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


export type MenuItem = Required<MenuProps>["items"][number];

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const NavigationLinksList: MenuItem[] = [
  getItem(<Link to={"/my-tasks"}>Мои задачи</Link>, 'myTasks', <ScheduleOutlined />),
  getItem(<Link to={"/projects"}>Проекты</Link>, 'projects', <FolderOutlined />),
];