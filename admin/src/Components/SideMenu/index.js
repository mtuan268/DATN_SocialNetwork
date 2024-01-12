import {
  AppstoreOutlined,
  CommentOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "DashBoard",
            icon: <AppstoreOutlined />,
            key: "/dashboard",
          },
          {
            label: "Customers",
            key: "/customers",
            icon: <UserOutlined />,
          },
          {
            label: "Posts",
            key: "/inventory",
            icon: <ShopOutlined />,
          },
          {
            label: "Comments",
            key: "/orders",
            icon: <CommentOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
