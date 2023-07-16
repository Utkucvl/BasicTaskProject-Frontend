import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTodos,
  addTodo,
  printTodos,
  removeTodo,
  removeTodoById,
  changeStateOfAdded,
} from "../store/todoSlice";
import Task from "./Task";

function TaskList() {
  let todoList = useSelector((state) => state.todo.todos)[0];
  const dispatch = useDispatch();
  const [isDeleted, setIsDeleted] = useState(false);
  const deleteTask = (id, task) => {
    setIsDeleted(true);
    dispatch(removeTodo(task));
    dispatch(removeTodoById(id));
  };
  useEffect(() => {
    dispatch(getAllTodos());
  }, []);
  useEffect(() => {
    dispatch(getAllTodos());
    setIsDeleted(false);
  }, [isDeleted]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <div>
      <TableContainer style={{ marginTop: "30px" }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">AssignedTo</StyledTableCell>
              <StyledTableCell align="right">Point</StyledTableCell>
              <StyledTableCell align="right">CreatedDate</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todoList ? (
              todoList.map((task) => (
                <Task task={task} deleteTask={deleteTask}></Task>
              ))
            ) : (
              <TableRow>
                <StyledTableCell colSpan={8} align="center">
                  Loading...
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
