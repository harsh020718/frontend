import React, { useContext, useEffect, useRef, useState } from "react";
// import  onDragEnd  from './Drag-end-handler';
import { Draggable } from "react-beautiful-dnd";
import Droppable from "./StrictModeDroppable";
import DoneContext from "../ContextDone/Done/DoneContext";
import DoneItem from "./DoneItem";

import { useNavigate } from "react-router-dom";
import AddDone from "./AddDone";
const Done = () => {
  const context = useContext(DoneContext);
  let navigate = useNavigate();
  const { Done, getDone, editDone } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [InitialDone, setDone] = useState({
    id: "This is ID",
    title: "This is Title",
    description: "This is Description",
  });
  const updateDone = (harsh) => {
    ref.current.click();
    console.log(harsh);
    setDone({
      id: harsh._id,
      title: harsh.title,
      description: harsh.description,
    });
  };

  const handleClick = () => {
    refClose.current.click();
    editDone(InitialDone.id, InitialDone.title, InitialDone.description);

    // props.showAlert("Updated Successfully", "success");
  };
  const onChange = (e) => {
    setDone({ ...InitialDone, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getDone();
    } else {
      navigate("/login");
    }
  });

  return (
    <Droppable droppableId="done">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <AddDone />

          <button
            ref={ref}
            type="button"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#editDoneModal"
          >
            Launch demo modal
          </button>

          <div
            className="modal fade"
            id="editDoneModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Done
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
                        value={InitialDone.title}
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
                        value={InitialDone.description}
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
                      InitialDone.title.length < 5 ||
                      InitialDone.description.length < 5
                    }
                    className="btn btn-primary"
                  >
                    Update Done
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="row my-3">
        <div className="row">
        <h1 className="flex-grow-1 mb-0"style={{
          marginTop: '-60px'
        }}>Completed</h1> */}

          <div className="row my-3">
            <h1 className="flex-grow-1 mb-0" style={{ marginTop: "-60px" }}>
              Completed
            </h1>
          </div>
          {Array.isArray(Done) && Done.length > 0 ? (
            Done.map((done, index) => (
              <Draggable key={done._id} draggableId={done._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    {...provided.dragHandleProps}
                  >
                    <DoneItem
                      key={done._id}
                      updateDone={updateDone}
                      done={{ done }}
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

export default Done;
