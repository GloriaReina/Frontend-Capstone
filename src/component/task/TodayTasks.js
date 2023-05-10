import React, { useState } from "react";
import { EditForm } from "./EditForm";
import { Container, Col, Row, Modal, Button } from "react-bootstrap";
import "./TodayTasks.css";

//recieved props from homepage
export const TodayTasks = ({ tasks, fetchAllTasks, setTasks }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [showModal, setShowModal] = useState(false);

  /*value of taskId(can have any name) comes from  task.id property of the task object thats selected when user click its checkbox

  updatedTask array has all the original tasks, but with the completed status of the task with the matching taskId set to true */
  const handleTaskCompletion = (taskId) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);
 
     const taskToCompleteId= taskToComplete.id 
        console.log(taskToCompleteId)
        console.log("this should be task to complete", taskToComplete)
 

    if (taskToComplete.actualTime.trim() === '') {
      setShowModal(true)
      
    } 
    else{
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: true };
        }
        return task;
      });
      setTasks(updatedTasks);
    
 

    /*find the updated task with the matching taskId using the find method. */
    const updatedTask = updatedTasks.find((task) => task.id === taskId);

    /*Then sends a PUT request to update the status of that task on the server using the fetch function.*/

    fetch(`http://localhost:8088/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    }).then(() => {
      // After updating fetch the updated tasks
      fetchAllTasks();
    });
  };
  }


  /*Function that filters the list of tasks based on the current date & returns a new array that contains only the tasks that are due on the current date.*/
  const filterTasksByDate = () => {
    const currentDate = new Date();
    const estOffset = -4 * 60; // Eastern Standard Time is UTC-4
    
    return tasks.filter((task) => {
      const dueDate = new Date(task.deadline);
      /*Convert my task date wich is in EST(my laptop's timezone) to UTC: get dealine time, add 4 hrs(estOffset value) and multiply by 60 (which gives us number in minutes) and then by 1000 (which gives us  number of milliseconds). The result gives a deadline with UTC timestamp */
      console.log("before:" , dueDate.getTime())
      const utcDueDate = new Date(
        dueDate.getTime() + estOffset * 60 * 1000 // convert to UTC by adding EST offset
        
      );
      console.log("after:" , utcDueDate.getTime())
      return (
        //convert current date to UTC & compare to my tasks' utcDueDate to have consistent time zone
        utcDueDate.getUTCDate() === currentDate.getUTCDate() &&
        utcDueDate.getUTCMonth() === currentDate.getUTCMonth() &&
        utcDueDate.getUTCFullYear() === currentDate.getUTCFullYear()
      );
    });
  };

  let filteredTasks = filterTasksByDate();
  filteredTasks = filteredTasks.filter((task) => {
    return task.completed === false;
  });

  /*  new array (sortedFilteredTasks) takes a copy of the (filteredTask array) which holds tasks due on current day and sorts these tasks by urgency level.
  
  a and b = two elements of the array being compared, if a-b<0, a is displayed first, if >0, b is displayed first, if = 0 nothing changes
  */

  const sortedFilteredTasks = [...filteredTasks].sort(
    (a, b) => a.urgencyLevel - b.urgencyLevel
  );

  return (
    <>
      
        <h1>Tasks due today</h1>
        {sortedFilteredTasks.map((task) => (
          <>
            <div className="today-task-container">
              <Container>
                <Row className={`urgency-${task.urgencyLevel}`}>
                  <Col key={task.id}>{`${task.description} `}</Col>
                  <Col className="button-column">
                    <EditForm
                      task={task}
                      fetchAllTasks={fetchAllTasks}
                      handleTaskCompletion={handleTaskCompletion}
                      showAlert={showAlert}
                      showModal={showModal}
                      setShowModal={setShowModal}
                      selectedTask={selectedTask}
                      setSelectedTask={setSelectedTask}
                      //  //pass fetchALLTasks prop EditForm component so that it can use it after the PUT request to update page with current state; and task so it can have access to task object for edits
                    />
                  </Col>
                </Row>
              </Container>
              
            </div>
          
          </>
        ))}
        <Modal show={showModal} >
        <Modal.Header >
          <Modal.Title className="image-container">
          Great Job! One less thing on your plate!!
            <img src="/images/cartoon-office-celebration-15570488.jpg" alt=" Picture of people celebrating" className="firework-img"/>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><em>Fill in completion time to mark task as complete!</em></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>g
    </>
  );
};
