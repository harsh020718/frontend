import React, {useContext} from "react";
import DoneContext from "../ContextDone/Done/DoneContext";


const DoneItem = (props) => {
  const context = useContext(DoneContext)
  const {deleteDone} = context
  const { done } = props.done;
  const {updateDone} = props
  
  return (
    
    <div className="row"  >
    <div className = "col-md-3">
      <div className="card my-3" style={{ width: '256px' }}>
        <div className="card-body"style={{ width: '257px',height:'212px' }}>
          <h5 className="card-title">Title: {done.title}</h5>
          <p className="card-text">Description: {done.description}</p>
          <i className="fa-solid fa-trash mx-2" style={{ cursor: 'pointer' }} onClick={()=>{deleteDone(done._id)}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" style={{ cursor: 'pointer' }} onClick={()=>{updateDone(done)}}></i>
        </div>
      </div>
    </div>
    </div>
     
 
  );
};

export default DoneItem;
