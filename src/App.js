import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoState from "./Context/Todos/TodoState";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import DoneState from "./ContextDone/Done/DoneState";
import DoingState from "./ContextDoing/Doing/DoingState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useState } from "react";
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <TodoState>
        <DoingState>
          <DoneState>
            <Router>
              <Navbar />
              <Alert alert={alert} />
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home />} />

                  <Route
                    path="/login"
                    element={<Login showAlert={showAlert} />}
                  />
                  <Route
                    path="/signup"
                    element={<Signup showAlert={showAlert} />}
                  />
                </Routes>
              </div>
            </Router>
          </DoneState>
        </DoingState>
      </TodoState>
    </DndProvider>
  );
}

export default App;
