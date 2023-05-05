return (
  <>
 {/* passing to EditForm so form can use the state variable and the function to allow edit button to display/hide form when clicked  */}
{isEditFormVisible && (<EditForm 
      />
    )}
    <Container>
      <Form>
      <div className="add-new-task-button">
            <Button
              bsPrefix="newtask-button"
              variant="success"
              onClick= {toggleAddTaskForm}
            >
              + New Task
            </Button>
      </div>
      {isFormVisible ? <>
        <div className="add-task-close-button">
          <CloseButton
            type="button"
            onClick={toggleAddTaskForm}
          ></CloseButton>
        </div>
        <Form.Group as={Row} controlId="urgency">
          <Form.Label column sm={2} for="validationDefault01" class="form-label">
            Urgency:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              class="form-select" 
              id="validationDefault01" 
              as="select"
              required
              value={task.urgencyLevel}
              onChange={(evt) => {
                const copy = { ...task };
                copy.urgencyLevel = evt.target.value;
                /*reset fields to default setting*/
                update(copy);
              }}
            >
              <option selected disabled value="">-- Select Urgency --</option>
              <option value="1">Urgent and Important</option>
              <option value="2">Urgent but not important</option>
              <option value="3">Not Urgent but important</option>
              <option value="4">Not Urgent and Not important</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="category">
          <Form.Label column sm={2} for="validationDefault02" class="form-label">
            Category:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              class="form-select" 
              id="validationDefault02" 
              as="select"
              required
              value={task.category}
              onChange={(evt) => {
                const copy = { ...task };
                copy.category = evt.target.value;
                update(copy);
              }}
            >
              <option selected disabled value="">-- Select Category --</option>
              <option value="1">Self care</option>
              <option value="2">Family life</option>
              <option value="3">Work life</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group className="task-form-group">
          <Form.Label className="task-form-label" for="validationDefault03" class="form-label">Description:</Form.Label>
          <Form.Control  
            class="form-control" 
            id="validationDefault03" 
            type="text"
            required
            placeholder="Enter task description"
            value={task.description}
            onChange={(evt) => {
              const copy = { ...task };
              copy.description = evt.target.value;
              update(copy);
            }}
          />
        </Form.Group>

        <Form.Group className="task-form-group">
          <Form.Label className="task-form-label" for="validationDefault04" class="form-label">Deadline:</Form.Label>
          <Form.Control
            class="form-select" 
            id="validationDefault04" 
            type="date"
            required
            placeholder="Enter Due Date"
            value={task.deadline}
            onChange={(evt) => {
              const copy = { ...task };
              copy.deadline = evt.target.value;
              update(copy);
            }}
            
          />
        </Form.Group>
        <Form.Group className="task-form-group">
          <Form.Label className="task-form-label" for="validationDefault05" class="form-label">Estimated Time:</Form.Label>
          <Form.Control
            class="form-control" 
            id="validationDefault05" 
            type="text"
            required
            placeholder="Length of time needed (min) "
            value={task.estimatedTime}
            onChange={(evt) => {
              const copy = { ...task };
              copy.estimatedTime = evt.target.value;
              update(copy);
            }}
          />
        </Form.Group>
        <Form.Group className="task-form-group">
          <Form.Label className="task-form-label" for="validationDefault06" class="form-label">
            Completion Time:
          </Form.Label>
          <Form.Control
            class="form-control" 
            id="validationDefault06"
            type="text"
            required
            placeholder="Length of time used (min) "
            value={task.actualTime}
            onChange={(evt) => {
              const copy = { ...task };
              copy.actualTime = evt.target.value;
              update(copy);
            }}
          />
        </Form.Group>

        <Button
          variant="success"
          bsPrefix="submit-task-button"
          onClick={(clickEvent) => {
            handleSubmitButtonClick(clickEvent);
          }}
        >
          Submit Task
        </Button>
        </>
        :""
        }
      </Form>
    </Container>
  </>
);





/* Was getting a undefined error for description in EditForm when i clicked on New task button to display the form....the reason was that both editform and TaskForm where sharing state & the:
toggleAddTaskForm = () => {setIsFormVisible(!isFormVisible)};
  
meaning when i clicked on new task button--it would set boolean to true, then both forms would want to display...then i would get an error in editform because it could not be populated with the info from tasks it needed to edit

solution:
Needed to give EditForm its own state & toggleEditForm function to display the edit form
    */ 




//original App.js

/*import {Routes, Route, Switch } from "react-router-dom";
import {Login} from "../authentication/Login"
import {Register} from "../authentication/Register"
import {AllTasks} from "../task/AllTasks"
import { Authorized } from "./Authorized";
import { NavBar } from "../nav/NavBar";
import { HomePage } from "../HomePage";



function App() {
  return <Routes>
      <Route path="/login" element={<Login/>}/> 
      <Route path="/register" element={<Register />} />
      
      <Route path="*" element={
        <Authorized> 
          <div className="container">
          <nav className="navbar">  
              <NavBar />
          </nav>
          <div className="content">
              <AllTasks/>
              <HomePage />
              </div>
    </div>
        </Authorized >

          } />
    </Routes>
  
};

export default App; */


//Original code for nav bar
/*  return (
        <Navbar className='navbar' expand="lg" bg="navbar-background" variant="dark" >
            <Navbar.Brand href="#home" bsPrefix="navbar-brand-custom">Life Hack</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="#homepage" bsPrefix="nav-link-custom">HomePage</Nav.Link>
                    <Nav.Link href="#tasks" bsPrefix="nav-link-custom">Tasks</Nav.Link>
                    <Nav.Link as={Link} bsPrefix="nav-link-custom" to="visuals" offset={-100}>Visuals</Nav.Link>
                    <Nav.Link as={Link} bsPrefix="nav-link-custom" to="profiles" offset={-100}>Profile</Nav.Link>
                    
                    
                    {isLoggedIn &&
                            <Nav.Link bsPrefix="nav-link-custom" to="/" onClick={() => {
                                localStorage.removetask("app_user")
                                navigate("/", { replace: true })
                            }}>Logout</Nav.Link>
                    }

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )*/








// orifinal AllTasks displaying incomplete tasks

/*
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

export const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const fetchAllTasks = () => {
    fetch(`http://localhost:8088/tasks`)
      .then((response) => response.json())
      .then((tasksArray) => {
        setTasks(tasksArray);
      });
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  useEffect(() => {
    const completeTasksList = tasks.filter((task) => !task.completed);
    setFilteredTasks(completeTasksList);
  }, [tasks]);

  // when the user checks the checkbox, this function updates the complete property to 'true'
  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        // there's no automerge function, must copy the whole object when updating one property so not to lose the other properties w/in the selected obj... or will create a new new obj that only has the updated property value
        return { ...task, completed: true };
      }
      return task;
    });
    // set state variable to new list that has the updated property value changes
    setTasks(updatedTasks);

    // retrieves the task object that we want to update from the array of updated tasks...use find() method to search for a task obj in the updatedTasks array that has an id property matching the value of taskId & assigns it to updatedTask
    const updatedTask = updatedTasks.find((task) => task.id === taskId);

    // taskId= unique identifier for a task object that stored in the database

    fetch(`http://localhost:8088/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    }).then(() => {
      // After updating proper task object fetch all tasks
      fetchAllTasks();
    });
  };

  return (
    <>
      <Container id="task-container">
        <Row>
          <Col>
            <h1 className="task-heading">My Tasks</h1>
            <div className="task-list-container">
              {filteredTasks.map((task) => (
                <div className="task-task" key={task.id}>
                  <p className="task-input">{`${task.description} by ${task.deadline}`}</p>

                  <Form.Group className="task-form-group">
                    <Form.Check
                      type="checkbox"
                      label="Mark task as complete"
                      checked={task.completed}
                      onChange={() => handleTaskCompletion(task.id)}
                    />
                  </Form.Group>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
*/