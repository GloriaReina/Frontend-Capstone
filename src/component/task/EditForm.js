import React, { useState, useEffect } from "react";
import { Button, Form, CloseButton, Col,Row } from "react-bootstrap";
import "./EditForm.css";


// task/taskSubmitted prop received from Homepage
export const EditForm = ({task,fetchAllTasks, handleTaskCompletion}) => {

    
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editUrgency, setEditUrgency] = useState(task.urgencyLevel);
  const [editCategory, setEditCategory] = useState(task.category);
  const [editDeadline, setEditDeadline] = useState(task.deadline);
  const [editEstimatedTime, setEditEstimatedTime] = useState(task.estimatedTime);
  const [editActualTime, setEditActualTime] = useState(task.actualTime);
  const [editStartTime, setEditStartTime] = useState(task.startTime);
  const [editEndTime, setEditEndTime] = useState(task.endTime);
  const [editCompleted, setEditCompleted] = useState(task.completed);
  // const [selectTaskId, setSelectedTaskId] = useState(task.id)
 

/*Pass the task.id(a number) to the handleTaskCompletion function in AllTasks(calls it taskId) so it can compare if the the task array to find the selected task*/
 
const handleCheckboxChange = (id) => {
  
      handleTaskCompletion(id);
       
  };
 

  // this will be executed whenever the task object changes
  useEffect(() => {
    setEditDescription(task.description);
    setEditCategory(task.category);
    setEditUrgency(task.urgencyLevel);
    setEditEstimatedTime(task.estimatedTime);
    setEditActualTime(task.actualTime);
    setEditCompleted(task.completed);
    setEditDeadline(task.deadline);
    setEditStartTime(task.startTime)
    setEditEndTime(task.endTime)
  }, [task]);

//   displays edit form
  const handleEditClick = () => {
    setIsEditing(true);
  };

  //   hides edit form
  const handleCloseIconClick = () => {
    setIsEditing(false);
  };

  
 

  // this is the DELETE request to remove a task from the database
  const handleDeleteTask = (id) => {
    fetch(`http://localhost:8088/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchAllTasks();
    });
  };



  const handleSaveClick = (event) => {
    event.preventDefault();

  const localAppUser = localStorage.getItem("app_user");
  const appUserObject = JSON.parse(localAppUser);

    const editedTaskData = {
      userId: appUserObject.id,
      description: editDescription,
      deadline: editDeadline,
      category:editCategory,
      urgencyLevel:editUrgency,
      estimatedTime:editEstimatedTime,
      actualTime:editActualTime,
      startTime:editStartTime,
      endTime:editEndTime,
      completed:editCompleted
    };

    fetch(`http://localhost:8088/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTaskData),
    })
      .then((response) => response.json())
      .then((editedTask) => {
        fetchAllTasks();
        setIsEditing(false);
      });
  };

  return (
    <Form>
      {isEditing ? (
        <>
          <div className="edit-task-close-button">
            <CloseButton
              type="button"
              onClick={handleCloseIconClick}
            ></CloseButton>
          </div>
          <Form.Group className="task-form-group">
            <Form.Label className="task-form-label">Description:</Form.Label>
            <Form.Control
              type="text"
              required
              value={editDescription}
              onChange={(event) => setEditDescription(event.target.value)}
              placeholder="Enter task description"
            />
          </Form.Group>
          <Form.Group className="task-form-group">
            <Form.Label className="task-form-label">Deadline:</Form.Label>
            <Form.Control
              type="date"
              required
              value={editDeadline}
              onChange={(event) => setEditDeadline(event.target.value)}
              placeholder="Select due date"
            />
          </Form.Group >
          <Form.Group as={Row} controlId="category" className="task-form-group">
            <Form.Label column sm={2} className="task-form-label">
              Category:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                required
                value={editCategory}
                onChange={(event) => setEditCategory(event.target.value)}
              >
                <option value="">-- Select Category --</option>
                <option value="1">Self care</option>
                <option value="2">Family life</option>
                <option value="3">Work life</option>
              </Form.Control>
            </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="urgency" className="task-form-group">
            <Form.Label column sm={2} className="task-form-label">
              Urgency:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                required
                value={editUrgency}
                onChange={(event) => setEditUrgency(event.target.value)}
              >
                <option value="">-- Select Urgency --</option>
                <option value="1">Urgent and Important</option>
                <option value="2">Urgent but not important</option>
                <option value="3">Not Urgent but important</option>
                <option value="4">Not Urgent and Not important</option>
              </Form.Control>
            </Col>
            </Form.Group>
            <Form.Group className="task-form-group">
            <Form.Label className="task-form-label">Estimated Time:</Form.Label>
            <Form.Control
              type="text"
              required
              value={editEstimatedTime}
              onChange={(event) => setEditEstimatedTime(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="task-form-group">
            <Form.Label className="task-form-label">Start Time:</Form.Label>
            <Form.Control
              type="time"
              required
              value={editStartTime}
              onChange={(event) => setEditStartTime(event.target.value)}
            />
            </Form.Group>
            <Form.Group className="task-form-group">
            <Form.Label className="task-form-label">End Time:</Form.Label>
            <Form.Control
              type="time"
              required
              value={editEndTime}
              onChange={(event) => setEditEndTime(event.target.value)}
            />
            </Form.Group>
            <Form.Group className="task-form-group">
            <Form.Label className="task-form-label">Completion Time:</Form.Label>
            <Form.Control
              type="text"
              required
              value={editActualTime}
              onChange={(event) => setEditActualTime(event.target.value)}
             />
              </Form.Group>
          <Button
            variant="success"
            bsPrefix="save-task-button"
            onClick={handleSaveClick}
          >
            Save
          </Button>
        </>
      ) : (
        <>
         <Button
variant="success"
bsPrefix="edit-task-button"
onClick={handleEditClick}
>Edit</Button>

<Button
bsPrefix="task-delete-button"
variant="success"
onClick={() => handleDeleteTask(task.id)}
>Delete </Button>

        
        <input
        type="checkbox"
        label= "Check to complete" 
        checked={task.completed}
        onChange={() => handleCheckboxChange(task.id)} />
        </>
      )}
    </Form>
  );
};
