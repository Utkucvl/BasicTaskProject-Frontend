import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  updateTodo: {
    id: null,
    name: null,
    description: null,
    status: null,
    createdDate: null,
    assignedTo: null,
    point: null,
  },
};

export const getAllTodos = createAsyncThunk(
  "getAllTodos",
  async (_, thunkApi) => {
    const newResponse = await axios.get("/task").catch((error) => {
      console.log(error);
    });
    return newResponse.data;
  }
);
export const changeTodos = createAsyncThunk(
  "changeTodos",
  async (_, thunkApi) => {
    const newResponse = await axios.get("/task").catch((error) => {
      console.log(error);
    });
    return newResponse.data;
  }
);

export const removeTodoById = createAsyncThunk(
  "removeTodoById",
  async (id, thunkApi) => {
    const newResponse = await axios.delete("/task/" + id).catch((error) => {
      console.log(error);
    });
    return newResponse.data;
  }
);

export const addTodoByForm = createAsyncThunk(
  "addTodoByForm",
  async (task, thunkApi) => {
    const updatedTask = {
      name: task.name,
      description: task.description,
      status: task.status,
      assignedTo: task.assignedTo,
      point: task.point,
    };
    const newResponse = await axios
      .post("/task", updatedTask)
      .catch((error) => {
        console.log(error);
      });
    return newResponse.data;
  }
);

export const updateTodoByForm = createAsyncThunk(
  "updateTodoByForm",
  async (task, thunkApi) => {
    const updatedTask = {
      name: task.name,
      description: task.description,
      status: task.status,
      assignedTo: task.assignedTo,
      point: task.point,
    };
    const newResponse = axios
      .put("/task/" + task.id, updatedTask)
      .catch((error) => {
        console.log(error);
      });

    return newResponse.data;
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos[0].push(action.payload);
    },
    updateTodo: (state, action) => {
      state.updateTodo = {
        ...state.updateTodo,
        name: action.payload.name,
        description: action.payload.description,
        status: action.payload.status,
        assignedTo: action.payload.assignedTo,
        point: action.payload.point,
      };
    },
    removeTodo: (state, action) => {
      state.todos[0] = state.todos[0].filter(
        (todo) => todo.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTodos.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    });
    builder.addCase(getAllTodos.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(getAllTodos.pending, (state, action) => {
      console.log("Loading");
    });
    builder.addCase(removeTodoById.fulfilled, (state) => {});
    builder.addCase(removeTodoById.rejected, (state) => {
      console.log("Task could not deleted");
    });
    builder.addCase(removeTodoById.pending, (state) => {
      console.log("Loading");
    });

    builder.addCase(addTodoByForm.fulfilled, (state, action) => {});
    builder.addCase(addTodoByForm.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(addTodoByForm.pending, (state, action) => {
      console.log("Loading");
    });
    builder.addCase(changeTodos.fulfilled, (state, action) => {
      state.todos[0] = action.payload;
    });
    builder.addCase(changeTodos.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(changeTodos.pending, (state, action) => {
      console.log("Loading");
    });
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
