import React, { useContext,  useRef, useState} from "react";

import TodoContext from "../Context/Todos/TodoContext";



const AddTodos = () => {
  const context = useContext(TodoContext);
 
  const {  addTodos} = context;



  
  const ref = useRef(null);
  const refClose = useRef(null);
  const [Todo, setTodo] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const AddTodo = () => {
    ref.current.click();
   
    
  };
  const handleClick = () => {
    refClose.current.click();
    addTodos( Todo.title, Todo.description);
    // props.showAlert("Updated Successfully", "success");
  };
  const onChange = (e) => {
    setTodo({ ...Todo, [e.target.name]: e.target.value });
  };
  return (
    <>
<button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#addTodoModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="addTodoModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Todo
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
                    value={Todo.title}
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
                    value={Todo.description}
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
                disabled={Todo.title.length < 5 || Todo.description.length < 5}
                className="btn btn-primary"
              >
                Add Todo
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <i
        className="fa-solid fa-plus" onClick={()=>{AddTodo()}}
        style={{
          fontSize: '24px',
          cursor: 'pointer',
          color: 'blue',
          position: 'relative',
          marginLeft: '245px',
          marginTop: -'297px'
        }}
      ></i>
    
    
    </>
  );
};

export default AddTodos;
