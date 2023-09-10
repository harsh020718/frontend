import React, { useContext, useEffect, useRef, useState } from "react";
// import onDragEnd from './Drag-end-handler';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TodoContext from "../Context/Todos/TodoContext";
import TodoItem from "./TodoItem";

import { useNavigate } from "react-router-dom";
import AddTodos from "./AddTodo";

const Todos = () => {
  const context = useContext(TodoContext);
  let navigate = useNavigate();
  const { Todos, getTodos, editTodos } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [InitialTodo, setTodo] = useState({
    id: "This is ID",
    title: "This is Title",
    description: "This is Description",
  });
  
  const updateTodo = (harsh) => {
    ref.current.click();
    console.log(harsh);
    setTodo({ id: harsh._id, title: harsh.title, description: harsh.description });
  };

  const handleClick = () => {
    refClose.current.click();
    editTodos(InitialTodo.id, InitialTodo.title, InitialTodo.description);
    // props.showAlert("Updated Successfully", "success");
  };
  
  const onChange = (e) => {
    setTodo({ ...InitialTodo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTodos();
    } else {
      navigate("/login");
    }
  });

  return (
    <>
      <AddTodos />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editTodoModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="editTodoModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Todo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={InitialTodo.title}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={InitialTodo.description}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleClick}
                disabled={InitialTodo.title.length < 5 || InitialTodo.description.length < 5}
                className="btn btn-primary"
              >
                Update Todo
              </button>
            </div>
          </div>
        </div>
      </div>
      
      
        <div className="row my-3">
          <h1 className="flex-grow-1 mb-0" style={{ marginTop: '-60px' }}>
            Your Todos
          </h1>
        </div>
        
              {Array.isArray(Todos) && Todos.length > 0 ? (
                Todos.map((Todo, index) => (
                  
                        <TodoItem
                          key={Todo._id}
                          updateTodo={updateTodo}
                          Todo={{ Todo }}
                          index={index}
                        />
                ))
              ) : (
                <p>No Todos to display</p>
             
              )}
             
       
     
    </>
  );
};

export default Todos;
