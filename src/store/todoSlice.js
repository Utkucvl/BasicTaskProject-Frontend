import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../components/api";

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
  loading: true,
  err: {},
  isUpdated:false,
  isDeleted:false
};

export const getAllTodos = createAsyncThunk(
  "getAllTodos",
  async (_, thunkApi) => {
    try {
      const newResponse = await axiosInstance.get("/task");
      return newResponse.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);
export const changeTodos = createAsyncThunk(
  "changeTodos",
  async (_, thunkApi) => {
    try {
      const newResponse = await axiosInstance.get("/task");
      return newResponse.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const removeTodoById = createAsyncThunk(
  "removeTodoById",
  async (id, thunkApi) => {
    try {
      const newResponse = await axiosInstance.delete("/task/" + id, {});
      return newResponse.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const addTodoByForm = createAsyncThunk(
  "addTodoByForm",
  async (task, thunkApi) => {
    try {
      const addedTask = {
        name: task.name,
        description: task.description,
        status: task.status,
        assignedTo: task.assignedTo,
        point: task.point,
        userId: localStorage.getItem("currentUser"),
      };
      const newResponse = await axiosInstance.post("/task", addedTask, {});
      return newResponse.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const updateTodoByForm = createAsyncThunk(
  "updateTodoByForm",
  async (task, thunkApi) => {
    try {
      const updatedTask = {
        name: task.name,
        description: task.description,
        status: task.status,
        assignedTo: task.assignedTo,
        point: task.point,
        userId: localStorage.getItem("currentUser"),
      };
      const newResponse = await axiosInstance.put(
        "/task/" + task.id,
        updatedTask,
        {}
      );
      return newResponse.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const handleRegister = createAsyncThunk(
  "register",
  async (user, thunkApi) => {
    try {
      const newResponse = await axiosInstance.post("/auth/register", user);
      return newResponse.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const login = createAsyncThunk("login", async (user, thunkApi) => {
  try {
    const newResponse = await axiosInstance.post("/auth/login", user);
    console.log(newResponse.data);
    localStorage.setItem("accessToken", newResponse.data.accessToken);
    localStorage.setItem("currentUser", newResponse.data.userId);
    localStorage.setItem("refreshToken",newResponse.data.refreshToken)
    return newResponse.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response);
  }
});
export const refresh = createAsyncThunk("refresh", async (refreshData, thunkApi) => {
  try {
    const newResponse = await axiosInstance.post("/auth/refresh", refreshData);
    console.log("refreshed")
    console.log(newResponse.data);
    localStorage.setItem("accessToken", newResponse.data.accessToken);
    return newResponse.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response);
  }
});

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos[0].push(action.payload);
    },
    updateTodo: (state, action) => {
      state.updateTodo =  {
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
    getTodos: (state, action) => {
      state.todos[0].push(action.payload);
    },
    
  },

  extraReducers: (builder) => {
    builder.addCase(getAllTodos.fulfilled, (state, action) => {
      state.todos.push(action.payload);
      state.loading = false;
      state.err = "";
    });
    builder.addCase(getAllTodos.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });
    builder.addCase(getAllTodos.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(removeTodoById.fulfilled, (state) => {
      state.loading = false;
      state.err = "";
      state.isDeleted=true
    });
    builder.addCase(removeTodoById.rejected, (state) => {
      state.loading = false;
      state.err = "Problem on deleting Data.";
    });
    builder.addCase(removeTodoById.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addTodoByForm.fulfilled, (state, action) => {
      state.loading = false;
      state.err = "";
    });
    builder.addCase(addTodoByForm.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on adding Data.";
    });
    builder.addCase(addTodoByForm.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(changeTodos.fulfilled, (state, action) => {
      state.todos[0] = action.payload;
      state.loading = false;
      state.err = "";
    });
    builder.addCase(changeTodos.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });
    builder.addCase(changeTodos.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(handleRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.err = "";
    });
    builder.addCase(handleRegister.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on register.";
    });
    builder.addCase(handleRegister.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.err = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on login.";
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.loading = false;
      state.err = "";
    });
    builder.addCase(refresh.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on refreshing.";
    });
    builder.addCase(refresh.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const { addTodo, removeTodo, updateTodo, getTodos } = todoSlice.actions;

export default todoSlice.reducer;
