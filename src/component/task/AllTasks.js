import React, { useState, useEffect } from "react";
import { Dropdown,Container,Col,Row, Modal,Button } from "react-bootstrap";
import { EditForm } from "./EditForm";
import { BigCalendar } from "./BigCalendar";
import Alert from 'react-bootstrap/Alert';

export const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("incomplete tasks");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedTask, setSelectedTask]= useState("")
  const [showModal, setShowModal] = useState(false)

  const localAppUser = localStorage.getItem("app_user");
  const AppUserObject = JSON.parse(localAppUser);

  /* Fetched all tasks in data base and assigned data to state variable "tasks"*/
  const fetchAllTasks = () => {
    fetch(`http://localhost:8088/tasks`)
      .then((response) => response.json())
      .then((tasksArray) => {
        /*filter tasks in database by user's id so that only their tasks displays*/
        const tasksById = tasksArray.filter((task) => {
          return task.userId === AppUserObject.id;
        });
        setTasks(tasksById);
      });
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  /* 
    When user selects an option from the dropdown menu, the onclick event will cause the state variable to be updated to one of the conditional statements below

    filtered tasks variable that will hold an array of tasks based off of whatever condition is met
    
    */
  const filteredTasks = tasks.filter((task) => {
    if (filter === "incomplete tasks") {
      return !task.completed;
    }

    if (filter === "complete tasks") {
      return task.completed;
    }

    if (filter === "urgency level 1") {
      return task.urgencyLevel === "1";
    }

    if (filter === "urgency level 2") {
      return task.urgencyLevel === "2";
    }

    if (filter === "urgency level 3") {
      return task.urgencyLevel === "3";
    }

    if (filter === "urgency level 4") {
      return task.urgencyLevel === "4";
    }
    if (filter === "Self Care Tasks") {
      return task.category === "1";
    }

    if (filter === "Family-Life Tasks") {
      return task.category === "2";
    }

    if (filter === "Work-Life Tasks") {
      return task.category === "3";
    }

    return true;
  });

  const sortedFilteredTasks = [...filteredTasks].sort(
    (a, b) => a.urgencyLevel - b.urgencyLevel
  );

  // const sortedFilteredTasksDate = [...filteredTasks].sort(
  //   (a, b) => a.deadline - b.deadline
  // );

  /*value of taskId(can have any name) comes from  task.id property of the task object thats selected when user click its checkbox

  The handleTaskCompletion function receives the taskId parameter,creates a new array of updatedTasks using the map function. updatedTask array has all the original tasks, but with the completed status of the task with the matching taskId set to true */

  
  const handleTaskCompletion = (taskId) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);
 
     const taskToCompleteId= taskToComplete.id 
        console.log(taskToCompleteId)
        console.log("this should be task to complete", taskToComplete)
    
    //now have a state var that holds the id of the selected task and can pass this to edit form
    // setSelectedTask(taskToCompleteId)
    
    

    if (taskToComplete.actualTime.trim() === '') {
      setShowModal(true)
      console.log("alltask")
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

  return (
    <>
      <BigCalendar className="big-calendar"/>

      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Select Task Display View
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setFilter("incomplete tasks")}>
            Incomplete tasks
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter("complete tasks")}>
            Completed tasks
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter("urgency level 1")}>
            Urgency Leve 1 tasks
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter("urgency level 2")}>
            Urgency Leve 2 tasks
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter("urgency level 3")}>
            Urgency Leve 3 tasks
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter("urgency level 4")}>
            Urgency Leve 4 tasks
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter("Self Care Tasks")}>
            Self Care Tasks
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter("Family-Life Tasks")}>
            Family-Life Tasks
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilter("Work-Life Tasks")}>
            Work-Life Tasks
          </Dropdown.Item>
        </Dropdown.Menu>

        <Container className="task-container" > 
          {sortedFilteredTasks.map((task) => (
            <> 
              <Row className={`urgency-${task.urgencyLevel}`}>
              <Col key={task.id}>{`${task.description} by ${task.deadline}`}
               {/* sent task and fetchAllTasks as props to EditForm */}
               <EditForm
                task={task}
                fetchAllTasks={fetchAllTasks}
                handleTaskCompletion={handleTaskCompletion}
                showAlert={showAlert}
                showModal={showModal}
                setShowModal={setShowModal}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
              />
              </Col>
              </Row>
              </>
              ))}
              </Container> 
              
      </Dropdown>
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
      </Modal>
    </>
  );
};
