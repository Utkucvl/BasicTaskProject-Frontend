import React from "react";
import "./LoginAndRegisterPage.css";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { login } from "../store/todoSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (data) => {
    console.log(data);
   await dispatch(login({ userName: data.userName, password: data.password }));
    console.log(localStorage.getItem("accessToken"));

    if (localStorage.getItem("accessToken") !== null) {
      navigate("/");
    }
  };

  return (
    <div className="login">
      <div className="col-1">
        <h2>Log In</h2>

        <Form className="flex flex-col" onFinish={onFinish}>
          <Form.Item
            label="UserName"
            name="userName"
            rules={[{ required: true, message: "Please input your username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
          <Link
            to="/auth/register"
            style={{
              textDecoration: "none",
              color: "grey",
              fontSize: "13px",
            }}
          >
            Dont you have an account ? Click to register
          </Link>
        </Form>
      </div>
      <div className="col-2"></div>
    </div>
  );
}

export default LoginPage;
