import React, { useState } from "react";
import { Button, FormLabel, Input } from "@mui/joy";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { useDispatch } from "react-redux";
import { addTodo, addTodoByForm, changeTodos } from "../store/todoSlice";

function AddTaskPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState([]);
  const [status, setStatus] = useState([]);
  const [description, setDescription] = useState([]);
  const [point, setPoint] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);

  const isItValidToAdd = () => {
    if (
      name == "" ||
      status == "" ||
      description == "" ||
      assignedTo == "" ||
      point == ""
    ) {
      alertify.error("You could not add your task");
    } else {
      alertify.success("You have added your task");
    }
  };
  const saveTask = () => {
    dispatch(
      addTodoByForm({
        name: name,
        description: description,
        status: status,
        assignedTo: assignedTo,
        point: point,
      })
    );
    dispatch(changeTodos());

    dispatch(
      addTodo({
        id: null,
        name: name,
        description: description,
        status: status,
        assignedTo: assignedTo,
        point: point,
        createdDate: Date.now(),
      })
    );
    navigate("/");
  };
  return (
    <Container>
      <h3>Adding new task by filling spaces</h3>{" "}
      <FormLabel>Task Name : </FormLabel>
      <Input
        placeholder="Task Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></Input>
      <FormLabel>Task Description: </FormLabel>
      <Input
        placeholder="Task Description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></Input>
      <FormLabel>Task Status: </FormLabel>
      <Input
        placeholder="Task Status"
        onChange={(e) => {
          setStatus(e.target.value);
        }}
      ></Input>
      <FormLabel>Task AssignedTo : </FormLabel>
      <Input
        placeholder="Task AssignedTo "
        onChange={(e) => {
          setAssignedTo(e.target.value);
        }}
      ></Input>
      <FormLabel>Task Point : </FormLabel>
      <Input
        placeholder="Task Point"
        onChange={(e) => {
          setPoint(e.target.value);
        }}
      ></Input>
      <Button
        style={{ marginTop: "40px", marginLeft: "38%", marginRight: "12px" }}
        onClick={() => {
          isItValidToAdd();
          saveTask();
        }}
      >
        Create New Task
      </Button>
      <Link to={"/"} className="link">
        <Button
          style={{ marginTop: "40px", marginRight: "35%", marginLeft: "12px" }}
          onClick={() => {
            alertify.warning("You have closed adding page");
          }}
        >
          Close Adding Form
        </Button>
      </Link>
    </Container>
  );
}
export default AddTaskPage;
