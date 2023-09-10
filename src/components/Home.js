import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Todos from "./Todos"
import Doing from "./Doing"
import { DragDropContext } from "react-beautiful-dnd";
import  onDragEnd  from './Drag-end-handler';
import Done from "./Done";
const Home = () => {
    let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    else{

    }
  });

//   const {showAlert} = props
  return (
    // <DragDropContext onDragEnd={onDragEnd}>
    <div className="row">
    <div className="col-md-4">
        <Todos />
    </div>
    <div className="col-md-4">
        <Doing />
    </div>
    <div className="col-md-4">
        <Done />
    </div>
</div>
        // </DragDropContext>
  );
};

export default Home;
