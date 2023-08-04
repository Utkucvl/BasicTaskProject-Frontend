import React, { useState } from "react";
import { Button, Popconfirm, Row, Table } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { getAllTodos, removeTodo, removeTodoById } from "../store/todoSlice";
import Column from "antd/es/table/Column";
import { Space } from "antd";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

function TaskList() {
  let todoList = useSelector((state) => state.todo.todos)[0];
  const dispatch = useDispatch();
  const [isDeleted, setIsDeleted] = useState(false);
  const deleteTask = async (id, task) => {
    setIsDeleted(true);
    const removeRequest = await dispatch(removeTodoById(id));
    if (removeRequest.type == "removeTodoById/fulfilled") {
      dispatch(removeTodo(task));
    }
  };
  useEffect(() => {
    dispatch(getAllTodos());
  }, []);
  useEffect(() => {
    dispatch(getAllTodos());
    setIsDeleted(false);
  }, [isDeleted]);
  useEffect(() => {
    dispatch(getAllTodos());
  }, [todoList]);

  return (
    <div>
      <Navbar></Navbar>
      <Table dataSource={todoList}>
        <Row>
          {console.log(localStorage.getItem("accessToken"))}
          <Column title="Id" dataIndex="id"></Column>
          <Column title="Name" dataIndex="name"></Column>
          <Column title="Description" dataIndex="description"></Column>
          <Column title="Status" dataIndex="status"></Column>
          <Column title="AssignedTo" dataIndex="assignedTo"></Column>
          <Column title="Point" dataIndex="point"></Column>
          <Column title="CreatedDate" dataIndex="createdDate"></Column>
          <Column
            title="Actions"
            render={(_, task) => (
              <Space size="middle">
                <Link
                  to={`/update/${task.id}`}
                  state={{
                    nameProp: task.name,
                    descriptionProp: task.description,
                    statusProp: task.status,
                    assignedToProp: task.assignedTo,
                    pointProp: task.point,
                    createdDateProp: task.createdDate,
                  }}
                  className="link"
                >
                  <Button
                    style={{ backgroundColor: "blue", color: "white" }}
                    onClick={() => {
                      console.log(task.id);
                    }}
                  >
                    Update
                  </Button>
                </Link>

                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => {
                    {
                      deleteTask(task.id, task);
                      localStorage.getItem("accessToken")
                        ? alertify.success("You have deleted task")
                        : alertify.error("You have not delete task");
                    }
                  }}
                  onCancel={() => {
                    alertify.error("You have not deleted task");
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button style={{ backgroundColor: "red", color: "white" }}>
                    X
                  </Button>
                </Popconfirm>
              </Space>
            )}
          ></Column>
        </Row>
      </Table>

      <Link to="/add" className="link">
        <Button
          style={{
            background: "blue",
            color: "white",
            marginLeft: "45%",
            marginTop: "30px",
          }}
          size="large"
        >
          Add Task To List{" "}
        </Button>{" "}
      </Link>
    </div>
  );
}

export default TaskList;
