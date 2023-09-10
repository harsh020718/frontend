import React, {useContext} from "react";
import TodoContext from "../Context/Todos/TodoContext";
// import { Draggable } from 'react-beautiful-dnd';

const TodoItem = (props) => {
  const context = useContext(TodoContext)
  const {deleteTodos} = context
  const { Todo } = props.Todo;
  const {updateTodo} = props
  // const {index} = props
  // // const { harsh } = props.note;
  // const { note } = props
   
  return (
    
    <div className="row">
    <div className = "col-md-3">
      <div className="card my-3" style={{ width: '256px' }}>
        <div className="card-body" style={{ width: '257px',height:'212px' }}>
          <h5 className="card-title">Title: {Todo.title}</h5>
          <p className="card-text">Description: {Todo.description}</p>
          <i className="fa-solid fa-trash mx-2" style={{ cursor: 'pointer' }} onClick={()=>{deleteTodos(Todo._id)}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" style={{ cursor: 'pointer' }} onClick={()=>{updateTodo(Todo)}}></i>
        </div>
      </div>
    </div>
    </div>
    
   
  );
};

export default TodoItem;
