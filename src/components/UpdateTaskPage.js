import React, { useState } from "react";
import { Button, FormLabel, Input } from "@mui/joy";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { useDispatch } from "react-redux";
import { updateTodo, updateTodoByForm } from "../store/todoSlice";
import { changeTodos } from "../store/todoSlice";

function UpdateTaskPage() {
  const location = useLocation();
  const { nameProp, descriptionProp, statusProp, assignedToProp, pointProp } =
    location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const [name, setName] = useState([]);
  const [status, setStatus] = useState([]);
  const [description, setDescription] = useState([]);
  const [point, setPoint] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);

  useEffect(() => {
    getInitialStates();
  }, []);

  const getInitialStates = () => {
    setName(nameProp);
    setStatus(statusProp);
    setDescription(descriptionProp);
    setPoint(pointProp);
    setAssignedTo(assignedToProp);
  };

  const isItValidToUpdate = () => {
    if (
      name === "" ||
      status === "" ||
      description === "" ||
      assignedTo === "" ||
      point === ""
    ) {
      alertify.error("You could not update your task");
    } else {
      alertify.success("You have updated your task");
    }
  };

  const changeUpdateState = () => {
    if (
      name !== "" &&
      status !== "" &&
      description !== "" &&
      assignedTo !== "" &&
      point !== ""
    ) {
      dispatch(
        updateTodo({
          name: name,
          description: description,
          status: status,
          assignedTo: assignedTo,
          point: point,
        })
      );
    }
  };

  return (
    <div>
      <Container>
        <h3>Updating task by filling spaces</h3>{" "}
        <FormLabel>Task Name : </FormLabel>
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></Input>
        <FormLabel>Task Description: </FormLabel>
        <Input
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></Input>
        <FormLabel>Task Status: </FormLabel>
        <Input
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        ></Input>
        <FormLabel>Task AssignedTo : </FormLabel>
        <Input
          value={assignedTo}
          onChange={(e) => {
            setAssignedTo(e.target.value);
          }}
        ></Input>
        <FormLabel>Task Point : </FormLabel>
        <Input
          value={point}
          onChange={(e) => {
            setPoint(e.target.value);
          }}
        ></Input>
        <Button
          style={{ marginTop: "40px", marginLeft: "38%", marginRight: "12px" }}
          onClick={() => {
            isItValidToUpdate();
            dispatch(
              updateTodoByForm({
                id: taskId,
                name: name,
                description: description,
                status: status,
                assignedTo: assignedTo,
                point: point,
              })
            );
            changeUpdateState();

            dispatch(changeTodos());
            navigate("/");
          }}
        >
          Update Task
        </Button>
        <Link to={"/"} className="link">
          <Button
            style={{
              marginTop: "40px",
              marginRight: "35%",
              marginLeft: "12px",
            }}
            onClick={() => {
              alertify.warning("You have closed to updating page");
            }}
          >
            Close Updating Form
          </Button>
        </Link>
      </Container>
    </div>
  );
}
export default UpdateTaskPage;
