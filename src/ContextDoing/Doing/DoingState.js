import DoingContext from "./DoingContext";
import { useState } from "react";

const DoingState = (props) => {
  const host = "http://localhost:5000";
  const DoingInitial = [];

  const [Doing, setDoing] = useState(DoingInitial);
  const getDoing = async () => {
    const response = await fetch(`${host}/api/doingR/fetchallDoing`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    
    setDoing(json);
  };

  // Add a Doing
  const addDoing = async (title, description) => {
    const response = await fetch(`${host}/api/doingR/addDoing`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description }),
    });
    const json = await response.json();
    setDoing(json);
  };
  // Delete a Doing
  const deleteDoing = async (id) => {
    const response = await fetch(`${host}/api/doingR/deleteDoing/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    // console.log(Doings)
    const newDoing = Doing.filter((doing) => {
      return doing._id !== id;
    });
    setDoing(newDoing);
  };

  // };
  // Edit a Doing
  const editDoing = async (id, title, description) => {
    const response = await fetch(`${host}/api/doingR/updateDoing/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description }),
    });
    const json = await response.json();
    console.log(json);
    setDoing(json);
      };
  return (
    <DoingContext.Provider
      value={{ Doing, addDoing, deleteDoing, editDoing, getDoing }}
    >
      {props.children}
    </DoingContext.Provider>
  );
};

export default DoingState;
