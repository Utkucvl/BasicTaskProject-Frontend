import React, { useState } from "react";
import {
  ContactsOutlined,
  LinkedinFilled,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Menu, Layout } from "antd";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const items = [
  {
    label: "Basic Task App",
  },
  {
    label: "Contact",
    key: "SubMenu",
    icon: <ContactsOutlined />,
    children: [
      {
        type: "group",
        label: "Name and Surname : ",
        children: [
          {
            label: "Utku Cuval",
            key: "setting:1",
          },
        ],
      },
      {
        type: "group",
        label: "Communication",
        children: [
          {
            icon: <LinkedinFilled />,
            label: "Utku Çuval",
            key: "setting:3",
          },
          {
            icon: <MailOutlined />,
            label: "utku.cuval0507@gmail.com",
            key: "setting:4",
          },
        ],
      },
      {
        type: "group",
        label: "School",
        children: [
          {
            label: "Abdullah Gul University",
            key: "setting:3",
          },
        ],
      },
    ],
  },
];
const { Header } = Layout;
const Navbar = () => {
  const [reRenderPage,setReRenderPage] = useState(false)
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  useEffect(() => {
    
  }, [reRenderPage]);
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          height: "60px",
          justifyContent: "space-between",
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={onClick}
          selectedKeys={[current]}
          items={items}
        ></Menu>
        <div >
          {" "}
          {localStorage.getItem("accessToken") ? (
            <Button
              style={{ border:"none",height: "100%", width: "75px", float: "right" ,backgroundColor:"#030852",color:"white" }}
              onClick={ async () => {
                await localStorage.removeItem("accessToken")
                await localStorage.removeItem("currentUser")
                await localStorage.removeItem("refreshToken")
                setReRenderPage(!reRenderPage)
              }}
            >
              {" "}
              Log out{" "}
            </Button>
          ) : (
            <Link to = "auth/login">
              {" "}
              <Button onClick={()=>{console.log("auth gitdi")}} style={{ border:"none", height: "100%", width: "75px", float: "right"  ,backgroundColor:"#030852",color:"white" ,textDecoration:"none"}}>
                {" "}
                Log in{" "}
              </Button>
            </Link>
          )}{" "}
        </div>
      </Header>
    </Layout>
  );
};
export default Navbar;
