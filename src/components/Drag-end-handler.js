const onDragEnd = (result) => {
    console.log(result)
    const { source, destination} = result;
  
    // Check if the task was dropped outside of a valid droppable area
    if (!destination) {
      return;
    }
  
    // Check if the task was moved from "To Do" to "Doing"
    if (
      source.droppableId === 'todoList' &&
      destination.droppableId === 'doingList'
    ) {
      // Implement the logic to update the task status in your database
      // You can use your `editTodos` and `addDoing` functions here
    }
  };
  
  export default onDragEnd;
  