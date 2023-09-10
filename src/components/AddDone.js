import React, { useContext,  useRef, useState} from "react";

import DoneContext from "../ContextDone/Done/DoneContext";



const AddDone = () => {
  const context = useContext(DoneContext);
 
  const {  addDone} = context;



  
  const ref = useRef(null);
  const refClose = useRef(null);
  const [Done, setDone] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const AddDones = () => {
    setDone({ title: "", description: "" })
    ref.current.click();
   
    
  };
  const handleClick = () => {
    refClose.current.click();
    addDone( Done.title, Done.description);
   
    // props.showAlert("Updated Successfully", "success");
  };
  const onChange = (e) => {
    setDone({ ...Done, [e.target.name]: e.target.value });
  };
  return (
    <>
<button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#addDoneModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="addDoneModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Done
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
                    value={Done.title}
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
                    value={Done.description}
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
                disabled={Done.title.length < 5 || Done.description.length < 5}
                className="btn btn-primary"
              >
                Add Done
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <i
        className="fa-solid fa-plus" onClick={()=>{AddDones()}}
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

export default AddDone;
