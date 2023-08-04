import React from "react";
import "./LoginAndRegisterPage.css";
import { useDispatch } from "react-redux";
import { Button,Form,Input, InputNumber } from "antd";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getAllTodos, login } from "../store/todoSlice";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { addTodoByForm,addTodo,changeTodos,getTodos } from "../store/todoSlice";
function AddTaskPage() {
  const regExp = /[a-zA-Z]/g;
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const isNumerical = (point) =>{
    if(!regExp.test(point)){
      return false
    }
    return true
  } 

  const onFinish = async (data) => {
    console.log(data);
    if (
      data.name === "" ||
      data.status === "" ||
      data.description === "" ||
      data.assignedTo === "" ||
      data.point === null ||
      isNumerical(data.point)||
      data.point ===""||
      localStorage.getItem("accessToken") === null
    ) {
      alertify.error("You could not add your task");
    } else {
      alertify.success("You have added your task");
    }
    dispatch(
      addTodoByForm({
        name: data.name,
        description: data.description,
        status: data.status,
        assignedTo: data.assignedTo,
        point: data.point,
      })
    );
    const newTodoList =  await dispatch(getAllTodos())
    dispatch(getTodos(newTodoList))
    dispatch(changeTodos());

    dispatch(
      addTodo({
        id: null,
        name: data.name,
        description: data.description,
        status: data.status,
        assignedTo: data.assignedTo,
        point: data.point,
        createdDate: Date.now(),
      })
    );
      navigate("/");
    
    
  };
  return (
    
    <div className="login">
    <div className="col-1">
      <h3>Adding task by filling spaces</h3>
      <Form
        onFinish={onFinish}
        id="form"
        className="flex flex-col"
      >
        <Form.Item
          label="Name"
          name="name"
          style={{ color: "black", fontSize: "16px" }}
          rules={[{ required: true, message: "Please input your name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          style={{ color: "black", fontSize: "16px" }}
          rules={[{ required: true, message: "Please input your status" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          style={{ color: "black", fontSize: "16px" }}
          rules={[{ required: true, message: "Please input your description" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Assigned To"
          name="assignedTo"
          style={{ color: "black", fontSize: "16px" }}
          rules={[{ required: true, message: "Please input your assignedTo" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Point"
          name="point"
          style={{ color: "black", fontSize: "16px" }}
          rules={[{ required: true, message: "Please input your point" }]}
        >
          <InputNumber style={{width:"265px"}} />
        </Form.Item>

        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Button
            block
            type="primary"
            htmlType="submit"
            
          >
            Add Task
          </Button>
        </div>
        <Link
          to="/"
          className="link"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Button
            block
            type="primary"
            htmlType="submit"
            onClick={() => {
              alertify.warning("You have closed to adding page");
            }}
            danger
          >
            Close Adding Form
          </Button>
        </Link>
      </Form>
    </div>
    <div className="col-2"></div>
  </div>
    
  );
}
export default AddTaskPage;
