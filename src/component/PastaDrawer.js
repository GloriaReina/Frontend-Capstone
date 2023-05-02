import React from 'react';
import { Navbar, Nav, NavDropdown, NavLink } from 'react-bootstrap'


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
                                localStorage.removeItem("app_user")
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
                <div className="task-item" key={task.id}>
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