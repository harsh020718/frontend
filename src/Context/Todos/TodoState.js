import TodoContext from "./TodoContext";
import { useState } from "react";

const TodoState = (props) => {
  const host = "http://localhost:5000";
  const TodosInitial = [];

  const [Todos, setTodos] = useState(TodosInitial);
  const getTodos = async () => {
    const response = await fetch(`/api/todoR/fetchalltodos`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    
    setTodos(json);
  };

  // Add a Todo
  const addTodos = async (title, description) => {
    const response = await fetch(`${host}/api/todoR/addTodo`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description }),
    });
    const json = await response.json();
    setTodos(json);
  };
  // Delete a Todo
  const deleteTodos = async (id) => {
    const response = await fetch(`${host}/api/todoR/deleteTodo/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    // console.log(Todos)
    const newTodos = Todos.filter((Todo) => {
      return Todo._id !== id;
    });
    setTodos(newTodos);
  };

  // };
  // Edit a Todo
  const editTodos = async (id, title, description) => {
    const response = await fetch(`${host}/api/todoR/updateTodo/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description }),
    });
    const json = await response.json();
    console.log(json);
    setTodos(json);
      };
  return (
    <TodoContext.Provider
      value={{ Todos, addTodos, deleteTodos, editTodos, getTodos }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoState;
