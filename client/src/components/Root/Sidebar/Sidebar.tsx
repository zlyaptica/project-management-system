import { FC, useState } from "react";
import { Divider, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { ProfileLink } from "../ProfileLink/ProfileLink";

import "./Sidebar.css";
import { NavigationLinksList } from "../../../shared/utils/BuildMenuItems";

const Sidebar: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider
      style={{ backgroundColor: colorBgContainer, borderRight: "1px solid gray" }}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
        
        <ProfileLink />
        <Divider />
        <Menu theme="light" items={NavigationLinksList}/>
    </Sider>
  );
};

export { Sidebar };
