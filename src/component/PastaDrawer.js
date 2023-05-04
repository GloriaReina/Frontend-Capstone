// import React from 'react';
// import { Navbar, Nav, NavDropdown, NavLink } from 'react-bootstrap'

// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from 'chart.js';
// import moment from 'moment';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const LineGraphData = ()=>{

// const [chartTaskData, setChartTaskData] = useState({});

// /* Fetched all tasks in data base and assigned data to state variable "chartTaskData" also use useEffect to monitor state var changes= will reassign filtered tasks object with only the properties we need to the state var */

// useEffect(() => {
// const fetchDataAllTasks = () => {
//   return fetch(`http://localhost:8088/tasks`)
//     .then((response) => response.json())
//     .then((tasksArrayData) => {
//       setChartTaskData(tasksArrayData);
//     });
// };


// // Filter tasks by completion status (only include completed tasks) and  tasks with user input for actualTime
     
// const filterTaskArrayData = tasksArrayData.filter(task => task.completed === true && task.actualTime !== null && task.actualTime !== undefined && task.actualTime !== "");


// /*From filteredTaskArrayDay--->Only select tasks from the past week. */

// const tasksPastWeek = filterTaskArrayData.filter(task => {
// 	//create a new moment object for each task's deadline property
 	
// 		const taskDate = moment(task.deadline);

// 	// create a new moment object representing one week ago using the moment().subtract() method. We pass in the number of days we want to subtract (7) and the unit of time we're subtracting (days).
  		
// 		const oneWeekAgo = moment().subtract(7, 'days');

// 	// compare each taskDate to oneWeekAgo using the isAfter() method. If taskDate is after oneWeekAgo, the task is included in the 	 	   filtered array

//   		return taskDate.isAfter(oneWeekAgo);
// });

// fetchDataAllTasks();

// }, []);

//  // Create chart data
//  const labels = tasksPastWeek.map(task => task.description);
//  const estimatedTimes = tasksPastWeek.map(task => task.estimatedTime);
//  const actualTimes = tasksPastWeek.map(task => task.actualTime);

// setChartTaskData({
//   labels,
//   datasets: [
//     {
//       label: 'Estimated Time',
//       data: estimatedTimes,
//       borderColor: 'rgba(255, 99, 132, 1)',
//       backgroundColor: 'rgba(255, 99, 132, 0.2)',
//     },
//     {
//       label: 'Actual Time',
//       data: actualTimes,
//       borderColor: 'rgba(54, 162, 235, 1)',
//       backgroundColor: 'rgba(54, 162, 235, 0.2)',
//     },
//   ],
// });

// const data = chartTaskData

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart',
//     },
//   },
// };




// return <div style= {{id:"myChart", width:"400", height:"400"}}>
//        <Line options={options} data={data} />;
// </div>

}















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