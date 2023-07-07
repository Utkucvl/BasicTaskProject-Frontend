import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import AddTaskPage from "./components/AddTaskPage";
import UpdateTaskPage from "./components/UpdateTaskPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<TaskList></TaskList>}></Route>
          <Route exact path="/add" element={<AddTaskPage></AddTaskPage>}></Route>
          <Route exact path="/update/:taskId" element={<UpdateTaskPage></UpdateTaskPage>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
