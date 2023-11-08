import React, { useContext, useEffect, useRef, useState } from "react";
// import  onDragEnd  from './Drag-end-handler';
import { Draggable } from "react-beautiful-dnd";
import Droppable from "./StrictModeDroppable";
import DoingContext from "../ContextDoing/Doing/DoingContext";
import DoingItem from "./DoingItem";

import { useNavigate } from "react-router-dom";
import AddDoing from "./AddDoing";
const Doing = () => {
  const context = useContext(DoingContext);
  let navigate = useNavigate();
  const { Doing, getDoing, editDoing } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [InitialDoing, setDoing] = useState({
    id: "This is ID",
    title: "This is Title",
    description: "This is Description",
  });
  const updateDoing = (harsh) => {
    ref.current.click();
    console.log(harsh);
    setDoing({
      id: harsh._id,
      title: harsh.title,
      description: harsh.description,
    });
  };

  const handleClick = () => {
    refClose.current.click();
    editDoing(InitialDoing.id, InitialDoing.title, InitialDoing.description);

    // props.showAlert("Updated Successfully", "success");
  };
  const onChange = (e) => {
    setDoing({ ...InitialDoing, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getDoing();
    } else {
      navigate("/login");
    }
  });

  return (
    <Droppable droppableId="doing">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <AddDoing />

          <button
            ref={ref}
            type="button"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#editDoingModal"
          >
            Launch demo modal
          </button>

          <div
            className="modal fade"
            id="editDoingModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Doing
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
                        value={InitialDoing.title}
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
                        value={InitialDoing.description}
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
                    disabled={
                      InitialDoing.title.length < 5 ||
                      InitialDoing.description.length < 5
                    }
                    className="btn btn-primary"
                  >
                    Update Doing
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row my-3">
            <h1 className="flex-grow-1 mb-0" style={{ marginTop: "-60px" }}>
              In-Progress
            </h1>
          </div>
          {Array.isArray(Doing) && Doing.length > 0 ? (
            Doing.map((doing, index) => (
              <Draggable key={doing._id} draggableId={doing._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DoingItem
                      key={doing._id}
                      updateDoing={updateDoing}
                      doing={{ doing }}
                      index={index}
                    />
                  </div>
                )}
              </Draggable>
            ))
          ) : (
            <p>No Work to display</p>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Doing;
