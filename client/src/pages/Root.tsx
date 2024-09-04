import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Sidebar } from "../components/Root/Sidebar/Sidebar";
import { HeaderContent } from "../components/Root/HeaderContent/HeaderContent";
import { FillHeader } from "../shared/ui/FillHeader/FillHeader";

const Root = () => {

  return (
    <Layout className="rootLayout">
      <Sidebar />
      <Layout>
        <Header className="rootHeader">
          <HeaderContent><FillHeader/></HeaderContent>
        </Header>
        <Content className="rootContent">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export { Root };
