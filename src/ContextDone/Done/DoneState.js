import DoneContext from "./DoneContext";
import { useState } from "react";

const DoneState = (props) => {
  const host = "http://localhost:5000";
  const DoneInitial = [];

  const [Done, setDone] = useState(DoneInitial);
  const getDone = async () => {
    const response = await fetch(`/api/doneR/fetchallDone`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log("Received data from API:", json);
    setDone(json);
  };

  // Add a Done
  const addDone = async (title, description) => {
    const response = await fetch(`${host}/api/doneR/addDone`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description }),
    });
    const json = await response.json();
    // setDone(json);
  };
  // Delete a Done
  const deleteDone = async (id) => {
    const response = await fetch(`${host}/api/doneR/deleteDone/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    // console.log(Dones)
    const newDone = Done.filter((done) => {
      return done._id !== id;
    });
    setDone(newDone);
  };

  // };
  // Edit a Done
  const editDone = async (id, title, description) => {
    const response = await fetch(`${host}/api/doneR/updateDone/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description }),
    });
    const json = await response.json();
    console.log(json);
    setDone(json);
      };
  return (
    <DoneContext.Provider
      value={{ Done, addDone, deleteDone, editDone, getDone}}
    >
      {props.children}
    </DoneContext.Provider>
  );
};

export default DoneState;
