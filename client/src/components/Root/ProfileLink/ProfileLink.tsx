import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import "./ProfileLink.css";
import { useAppSelector } from "../../../shared/hooks/redux";
import { MenuItem, getItem } from "../../../shared/utils/BuildMenuItems";
import { Menu } from "antd";

const ProfileLink = () => {
  const { nickname } = useAppSelector((state) => state.userReduser.user);
  
  const profileLink: MenuItem[] = [getItem(<Link to={"/profile"}>{nickname}</Link>, 'profile', <UserOutlined className="ProfileIcon"/>)]
  
  return (
    <Menu theme="light" items={profileLink}/>
  );
};

export { ProfileLink };
