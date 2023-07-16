import React from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

function Task({ task, deleteTask }) {
  const deleteMessage = (message) => {
    alertify.error(message);
  };
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
    <StyledTableRow style={{ background: "lightGreen" }} key={task.id}>
      <StyledTableCell component="th" scope="row">
        {task.id}
      </StyledTableCell>
      <StyledTableCell align="right">{task.name}</StyledTableCell>
      <StyledTableCell align="right">{task.description}</StyledTableCell>
      <StyledTableCell align="right">{task.status}</StyledTableCell>
      <StyledTableCell align="right">{task.assignedTo}</StyledTableCell>
      <StyledTableCell align="right">{task.point}</StyledTableCell>
      <StyledTableCell align="right">{task.createdDate}</StyledTableCell>
      <StyledTableCell align="right">
        <Link
          to={`/update/${task.id}`}
          state={{
            nameProp: task.name,
            descriptionProp: task.description,
            statusProp: task.status,
            assignedToProp: task.assignedTo,
            pointProp: task.point,
          }}
          className="link"
        >
          <Button style={{ background: "lightBlue", color: "black" }} size="sm">
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
            deleteTask(task.id, task);
            deleteMessage("You have deleted task");
          }}
        >
          X{" "}
        </Button>{" "}
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default Task;
