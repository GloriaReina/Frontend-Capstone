import React, { useState, useEffect } from "react";
import { Button, Form, CloseButton } from "react-bootstrap";

// task/taskSubmitted prop received from Homepage
export const EditForm = ({
    task= { description: "", deadline: "",completed:"", actualTime:"",estimatedTime:"",category:"",urgencyLevel:""},
    fetchAllTasks,
    updateTaskDisplayed
}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editUrgency, setEditUrgency] = useState(task.urgencyLevel);
  const [editCategory, setEditCategory] = useState(task.category);
  const [editDeadline, setEditDeadline] = useState(task.deadline);
  const [editEstimatedTime, setEditEstimatedTime] = useState(task.estimatedTime);
  const [editActualTime, setEditActualTime] = useState(task.actualTime);
  const [editCompleted, setEditCompleted] = useState(task.completed);

  // this will be executed whenever the task object changes
  useEffect(() => {
    setEditTask(task.description);
    setEditCategory(task.category);
    setEditUrgency(task.urgencyLevel);
    setEditEstimatedTime(task.estimatedTime);
    setEditActualTime(task.actualTime);
    setEditCompleted(task.completed);
    setEditDeadline(task.deadline);
  }, [task]);

  const handleEditClick = () => {
    setIsEditing(true);
  };
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

    const editedTaskData = {
      description: editDescription,
      deadline: editDeadline,
      category:editCategory,
      urgencyLevel:editUrgency,
      estimatedTime:editEstimatedTime,
      actualTime:editActualTime,
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
        updateTaskDisplayed(editedTask);
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
            <Form.Label className="task-form-label">Task:</Form.Label>
            <Form.Control
              type="text"
              required
              value={editTask}
              onChange={(event) => setEditTask(event.target.value)}
              placeholder="Enter new task"
            />
          </Form.Group>
          <Form.Group className="task-form-group">
            <Form.Label className="task-form-label">Due Date:</Form.Label>
            <Form.Control
              type="date"
              required
              value={editDueDate}
              onChange={(event) => setEditDueDate(event.target.value)}
              placeholder="Select due date"
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
          >
            Edit
          </Button>

          <Button
            bsPrefix="task-delete-button"
            variant="success"
            onClick={() => handleDeleteTask(task.id)}
          >
            Delete
          </Button>
        </>
      )}
    </Form>
  );
};
