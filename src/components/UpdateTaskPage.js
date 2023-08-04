import React from "react";
import "./LoginAndRegisterPage.css";
import { useDispatch } from "react-redux";
import { Button, Form, Input, InputNumber } from "antd";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getAllTodos, updateTodoByForm } from "../store/todoSlice";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { changeTodos, getTodos } from "../store/todoSlice";
import { useLocation } from "react-router";
import { useParams } from "react-router";
import { updateTodo } from "../store/todoSlice";
function UpdateTaskPage() {
  const regExp = /[a-zA-Z]/g;
  const location = useLocation();
  const {
    nameProp,
    descriptionProp,
    statusProp,
    assignedToProp,
    pointProp,
    createdDateProp,
  } = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskId } = useParams();

  const isNumerical = (point) => {
    if (!regExp.test(point)) {
      return false;
    }
    return true;
  };

  const onFinish = async (data) => {
    console.log(data);
    if (
      data.name === "" ||
      data.status === "" ||
      data.description === "" ||
      data.assignedTo === "" ||
      data.point === null ||
      isNumerical(data.point) ||
      data.point === "" ||
      localStorage.getItem("accessToken") === null
    ) {
      alertify.error("You could not update your task");
    } else {
      alertify.success("You have updated your task");
    }
    dispatch(
      updateTodoByForm({
        id: taskId,
        name: data.name,
        description: data.description,
        status: data.status,
        assignedTo: data.assignedTo,
        point: data.point,
      })
    );
    if (
      data.name !== "" &&
      data.status !== "" &&
      data.description !== "" &&
      data.assignedTo !== "" &&
      data.point !== ""
    ) {
      dispatch(
        updateTodo({
          id: taskId,
          name: data.name,
          description: data.description,
          status: data.status,
          assignedTo: data.assignedTo,
          point: data.point,
          createdDate: createdDateProp,
        })
      );
    }
    const newTodoList = await dispatch(getAllTodos());
    dispatch(getTodos(newTodoList));
    navigate("/");
    dispatch(changeTodos());
  };
  return (
    <div className="login">
      <div className="col-1">
        <h3>Updating task by filling spaces</h3>
        <Form
          onFinish={onFinish}
          initialValues={{
            name: nameProp,
            status: statusProp,
            description: descriptionProp,
            assignedTo: assignedToProp,
            point: pointProp,
          }}
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
              Update Task
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
                alertify.warning("You have closed to updating page");
              }}
              danger
            >
              Close Updating Form
            </Button>
          </Link>
        </Form>
      </div>
      <div className="col-2"></div>
    </div>
  );
}
export default UpdateTaskPage;
