import React from "react";
import { useForm } from "react-hook-form";
import "./LoginAndRegisterPage.css";
import { useDispatch } from "react-redux";
import { Button, Container, FormLabel } from "@mui/material";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getAllTodos, updateTodoByForm } from "../store/todoSlice";
import { useState } from "react";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import {
  changeTodos,
  getTodos,
} from "../store/todoSlice";
import { useLocation } from "react-router";
import { useParams } from "react-router";
import { updateTodo } from "../store/todoSlice";
function TestAdd() {
  const location = useLocation();
  const { nameProp, descriptionProp, statusProp, assignedToProp, pointProp } =
    location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskId } = useParams();
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: nameProp,
      status: descriptionProp,
      description: statusProp,
      assignedTo: assignedToProp,
      point: pointProp,
    },
  });

  const onSubmit = async (data) => {
    if (
      data.name === "" ||
      data.status === "" ||
      data.description === "" ||
      data.assignedTo === "" ||
      data.point === "" ||
      localStorage.getItem("accessToken") === null
    ) {
      alertify.error("You could not update your task");
    } else {
      alertify.success("You have updated your task");
    }
    dispatch(
      updateTodoByForm({
        id:taskId,
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
          name: data.name,
          description: data.description,
          status: data.status,
          assignedTo: data.assignedTo,
          point: data.point,
        })
      );
    }
    const newTodoList = await dispatch(getAllTodos());
    dispatch(getTodos(newTodoList));
    dispatch(changeTodos());
    navigate("/");
    console.log(data);
    reset({
      name: "",
      status: "",
      description: "",
      assignedTo: "",
      point: null,
    });
  };
  return (
    <Container>
      <div className="login">
        <div className="col-1">
          <h3>Adding new task by filling spaces</h3>
          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormLabel style={{ color: "black", fontSize: "16px" }}>
              Name :{" "}
            </FormLabel>
            <input
              value={getValues("name")}
              onChange={(e)=>{
                setValue("name",e.target.value)
              }}
              name="taskName"
              type="text"
              placeholder=" Name"
              {...register("name")}
            ></input>
            <FormLabel style={{ color: "black", fontSize: "16px" }}>
              Status :{" "}
            </FormLabel>
            <input
              value={statusProp}
              name="status"
              type="text"
              placeholder=" Status"
              {...register("status")}
            ></input>
            <FormLabel style={{ color: "black", fontSize: "16px" }}>
              Description :{" "}
            </FormLabel>
            <input
              value={descriptionProp}
              name="description"
              type="text"
              placeholder=" Description"
              {...register("description")}
            ></input>
            <FormLabel style={{ color: "black", fontSize: "16px" }}>
              AssignedTo :{" "}
            </FormLabel>
            <input
              value={assignedToProp}
              name="assignedTo"
              type="text"
              placeholder=" AssignedTo"
              {...register("assignedTo")}
            ></input>
            <FormLabel style={{ color: "black", fontSize: "16px" }}>
              Point :{" "}
            </FormLabel>
            <input
              value={pointProp}
              name="point"
              type="text"
              placeholder=" Point"
              {...register("point")}
            ></input>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                size="large"
                style={{
                  marginTop: 10,
                  background: "linear-gradient(45deg,#2196F3 30% , 21CBF3 90%)",
                  color: "white",
                }}
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
                variant="contained"
                size="small"
                style={{
                  marginTop: 10,
                  background: "linear-gradient(45deg,#2196F3 30% , 21CBF3 90%)",
                  color: "white",
                }}
                onClick={() => {
                  alertify.warning("You have closed to updating page");
                }}
              >
                Close Updating Form
              </Button>
            </Link>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </Container>
  );
}
export default TestAdd;
