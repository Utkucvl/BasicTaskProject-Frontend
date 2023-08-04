import React from "react";
import "./LoginAndRegisterPage.css";
import { useDispatch } from "react-redux";
import { handleRegister } from "../store/todoSlice";
import { useNavigate } from "react-router";
import { Button,Form,Input } from "antd";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";


function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onFinish = async (data) => {
   const response= await dispatch(
      handleRegister({ userName: data.userName, password: data.password })
    );
    if(response.error){
      alertify.error("Username is invalid",2)
    }
    if(!response.error){
     navigate("/auth/login")
    }
    
    
  };

  return (
    
      <div className="register">
        <div className="col-1">
          <h2>Sign In</h2>
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
            <Button  block type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
        </Form>
        </div>
        <div className="col-2"></div>
      </div>
   
  );
}

export default RegisterPage;
