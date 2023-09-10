import React, {useContext} from "react";
import DoingContext from "../ContextDoing/Doing/DoingContext";
// import { Draggable } from 'react-beautiful-dnd';

const DoingItem = (props) => {
  const context = useContext(DoingContext)
  const {deleteDoing} = context
  const { doing } = props.doing;
  const {updateDoing} = props
  // const {index} = props
  // // const { harsh } = props.note;
  // const { note } = props;
   
  return (
    
    <div className="row">
    <div className = "col-md-3">
      <div className="card my-3" style={{ width: '256px' }}>
        <div className="card-body"style={{ width: '257px',height:'212px' }}>
          <h5 className="card-title">Title: {doing.title}</h5>
          <p className="card-text">Description: {doing.description}</p>
          <i className="fa-solid fa-trash mx-2" style={{ cursor: 'pointer' }} onClick={()=>{deleteDoing(doing._id)}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" style={{ cursor: 'pointer' }} onClick={()=>{updateDoing(doing)}}></i>
        </div>
      </div>
    </div>
    </div>
     
 
  );
};

export default DoingItem;
