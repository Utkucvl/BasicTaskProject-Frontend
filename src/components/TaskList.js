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
import { GetRequest, DeleteTask } from "../services/HttpRequests";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const getTaskList = () => {
    GetRequest("/task")
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setTaskList(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const deleteTask = (id) => {
    DeleteTask("/task/" + id)
      .then((result) => {
        console.log(result);
        setIsDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTaskList();

  }, []);
  useEffect(() => {
    getTaskList();
    setIsDeleted(false);
  }, [isDeleted]);
  
  const deleteMessage = (message) =>{
    alertify.error(message)
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
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
            {taskList.map((task) => (
              <StyledTableRow
                style={{ background: "lightGreen" }}
                key={task.id}
              >
                <StyledTableCell component="th" scope="row">
                  {task.id}
                </StyledTableCell>
                <StyledTableCell align="right">{task.name}</StyledTableCell>
                <StyledTableCell align="right">
                  {task.description}
                </StyledTableCell>
                <StyledTableCell align="right">{task.status}</StyledTableCell>
                <StyledTableCell align="right">
                  {task.assignedTo}
                </StyledTableCell>
                <StyledTableCell align="right">{task.point}</StyledTableCell>
                <StyledTableCell align="right">
                  {task.createdDate}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Link to={`/update/${task.id}`} className="link" >
                    <Button
                      style={{ background: "lightBlue", color: "black" }}
                      size="sm"
                    >
                      Update
                    </Button>{" "}
                  </Link>
                  <Button
                    style={{
                      background: "red",
                      color: "black",
                      marginLeft: "2px",
                    }}
                    size="sm"
                    onClick={() => {
                      deleteMessage("You have deleted task")
                      deleteTask(task.id);
                    }}
                  >
                    X{" "}
                  </Button>{" "}
                </StyledTableCell>
              </StyledTableRow>
            ))}
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
