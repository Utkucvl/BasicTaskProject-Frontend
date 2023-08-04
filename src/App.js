import TaskList from "./components/TaskList";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import AddTaskPage from "./components/AddTaskPage";
import UpdateTaskPage from "./components/UpdateTaskPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import TestAdd from "./components/TestAdd";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<TaskList></TaskList>}></Route>
          <Route
            exact
            path="/add"
            element={
              <ProtectedRoute>
                <AddTaskPage></AddTaskPage>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/update/:taskId"
            element={
              <ProtectedRoute>
                <UpdateTaskPage></UpdateTaskPage>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/auth/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
          <Route
            exact
            path="/auth/login"
            element={<LoginPage></LoginPage>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
