//   const currentDate = new Date();
//   const date= currentDate.getDate()
//     console.log(date)
//   const incompletedTasksPastDeadline = tasks.filter(task => {
//   const deadlineDate = new Date(task.deadline);
//   const dateDeadline= deadlineDate.getDate()
  
//   return (!task.completed && date < dateDeadline);
// });

// console.log(incompletedTasksPastDeadline);



// Assuming you have a specific timezone for your tasks, e.g., 'America/New_York'
// const taskTimezone = 'America/New_York';

// // Function to compare task deadlines with the current date, considering timezones
// const isTaskPastDeadline = (task) => {
//   const taskDeadline = moment.tz(task.deadline, taskTimezone);
//   const currentDateTime = moment.tz(new Date(), taskTimezone);

//   return taskDeadline.isBefore(currentDateTime);
// };

// // Filter the tasks based on the past deadline
// const pastDeadlineArray = tasks.filter(isTaskPastDeadline);

// console.log(pastDeadlineArray);




// const pastDeadlineArray = task.filter(
//   (task) => task.completed === false && task.actualTime !== "" 
// );

// /*From filteredTaskArrayDay--->Only select tasks past current day. */

// const tasksPastDeadline = filterTaskArrayData.filter((task) => {
//   //create a new moment object for each task's deadline property

//   const taskDate = moment(task.deadline);

//   // create a new moment object representing current day 

//   const currentDay = moment()

//   // compare each taskDate to currentDay using the isAfter() method. If taskDate is after currentDay, the task is included in the filtered array

//   return taskDate.isBefore(currentDay);
// });

 
//    <Container >
//    <Row>
//      <Col  className="line-chart-container">
//        <Line data={data} options={options} />
//      </Col>
//      <Col >
//      <Card className="mt-5 ">
//  <Card.Header>Time Management Insight</Card.Header>
//  <Card.Body>
//    <Card.Text>
//      Graph estimated task completion time vs actual task completion time. 
//    </Card.Text>
//    {/* <Button variant="primary">Go somewhere</Button> */}
//  </Card.Body>
// </Card>
//      </Col>
//    </Row>
//  </Container>
 
 /*Function that filters the list of tasks based on the current date & returns a new array that contains only the tasks that are due on the current date.*/
 const filterTasksByDate = () => {
  const currentDate = new Date();
  const estOffset = 4 * 60; // Eastern Standard Time is UTC-4
  
  return tasks.filter((task) => {
    const dueDate = new Date(task.deadline);
    console.log(dueDate.getTime())
    /*Convert my task date wich is in EST(my laptop's timezone) to UTC: get dealine time, add 4 hrs(estOffset value) and multiply by 60 (which gives us number in minutes) and then by 1000 (which gives us  number of milliseconds). The result gives a deadline with UTC timestamp */
    // console.log("before:" , dueDate.getTime())
    const utcDueDate = new Date(
      dueDate.getTime() + estOffset  // convert to UTC by adding EST offset
      
    );
    console.log("after:" , utcDueDate.getTime())
    return (
      //convert current date to UTC & compare to my tasks' utcDueDate to have consistent time zone
      utcDueDate.getDate() === currentDate.getUTCDate() &&
      utcDueDate.getMonth() === currentDate.getUTCMonth() &&
      utcDueDate.getFullYear() === currentDate.getUTCFullYear()
    );
  });
};





/*Function that filters the list of tasks based on the current date & 
    returns a new array that contains only the tasks that are due on the current date.*/
/*new Date() constructor a Date object, without any arguments= current date and time... with a Date object, can use various methods to retrieve or modify its value, such as getDate(), getMonth(), getFullYear(), getTime() .*/

// const filterTasksByDate = () => {
//   const currentDate = new Date();
//   return tasks.filter((task) => {
//     const dueDate = new Date( task.deadline);
     
//     return (

/* add UTC(Coordinated Universal Time) in order to have consistent time zone = avoid issues with daylight saving time changes.

the getDate method returns the day of the month based on the local time zone of the computer= the tasks for the current day were not  displaying because the current day dates in my database where being converted to be a day behind
*/
//       dueDate.getUTCDate() === currentDate.getUTCDate() &&
//       dueDate.getUTCMonth() === currentDate.getUTCMonth() &&
//       dueDate.getUTCFullYear() === currentDate.getUTCFullYear()
//     );
//   });
// };

/*-------end of original conversion to UTC before modifying to subtract 4 hours-------*/




/*BigCalendar.js => can use moment.tz() method to create a moment object with a specific time zone? use to make sure in EST but may not need it since moment uses my computer's timezone setting 

------------> start of code

const startDateTime = moment.tz(`${task.deadline} ${task.startTime}`, dateFormat, 'America/New_York').toDate();
const endDateTime = moment.tz(`${task.deadline} ${task.endTime}`, dateFormat, 'America/New_York').toDate();

<--------------------end of code 
*/






{/* add a CSS class based on urgency level of each task--use to color-code tasks based off */}
{/* <div className={`task-item urgency-${task.urgencyLevel}`}>
<li key={task.id}>{task.description} </li>
</div> */}



 {/* need to wrap it in div so that task form does not display on Task page since you are calling it in order to pass it taskSubmitted
  
      {/* <div style={{ display: "none" }}><TaskForm taskSubmitted={taskSubmitted} /></div>
<div style={{ display: "none" }}><TodayTasks tasks={tasks} /></div> */}

/* original register jsx-no bootstrap*/
// return (
//   <div className="auth-form-container">
//   <Container>
//       <Row>
//       <Col xs={10} sm={6} lg={4} md={6} className="login-container mx-auto">
//           <form  className="register-form"onSubmit={handleRegister}>
//               <h2 className="mb-3 font-weight-normal register-title">Register </h2>
//               <fieldset>
//                   <label htmlFor="fullName" className="sansSerif"> Full Name </label>
//                   <input onChange={updateUser}
//                       type="text" id="fullName" className="form-control"
//                       placeholder="Enter your name" required autoFocus />
//               </fieldset>
//               <fieldset>
//                   <label htmlFor="email" className="sansSerif"> Email address </label>
//                   <input onChange={updateUser}
//                       type="email" id="email" className="form-control"
//                       placeholder="Email address" required />
//               </fieldset>
//               <fieldset>
//                   <button type="submit" className="sign-in-button"> Register </button>
//               </fieldset>
//           </form>
//           <section className="link--login">
//           <Link to="/login" className="registration-link sansSerif">
//             Already a member?
//           </Link>
//         </section>
//   </Col>
//   </Row>
//   </Container>
//   </div>
// )


/* original task list all task-no bootstrap*/

/* <div className={`task-item urgency-${task.urgencyLevel}`}> 
               <li
                  key={task.id}
                >{`${task.description} by ${task.deadline}`}
                </li>
              </div> */



/*first version login form; no boothstrap*/
// return (
//   <div className="auth-form-container">
//     <Container>
//       <Row>
//         <Col xs={10} sm={6} lg={4} md={8} className="login-container mx-auto">
//           <form className="login-form" onSubmit={handleLogin}>
//             <h1 className="login-heading">Login </h1>
//             <fieldset>
//               <label htmlFor="inputEmail" className="sansSerif">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(evt) => set(evt.target.value)}
//                 className="form-control"
//                 placeholder="Email address"
//                 required
//                 autoFocus
//               />
//             </fieldset>
//             <fieldset>
//               <label htmlFor="inputPassword">Password:</label>
//               <input
//                 type="password"
//                 value={pass}
//                 onChange={(evt) => setPass(evt.target.value)}
//                 placeholder="********"
//                 required
//                 autoFocus
//               />
//             </fieldset>
//             <fieldset>
//               <button type="submit" className="sign-in-button">
//                 Sign in
//               </button>
//             </fieldset>
//           </form>
//           <section>
//             <Link to="/register" className="registration-link sansSerif">
//               Not a member yet?
//             </Link>
//           </section>
//         </Col>
//       </Row>
//     </Container>
//   </div>
// );

//Code version: Filtered task date by "EST", Problem is what i get is 1day & ~4hrs behind my computer even though im in EST

/* At first was converting to UTC,but my computer is in EST & had to modify the code to account for the 4-hour time difference between EST and UTC so tasks due on the current day didnt disappear at 8pm.*/

/*used toLocaleString() method to convert the current date and the task deadline to EST time before comparing them so format/time is the same and there's no discrepancies*/

//   const filterTasksByDate = () => {
//     const currentDate = new Date();
//     const options = { timeZone: "America/New_York" }; // set timezone to EST
//     const currentESTDate = new Date(
//       currentDate.toLocaleString("en-US", options)
//     );
// console.log(currentESTDate)
//     return tasks.filter((task) => {
//       const dueDate = new Date(task.deadline);
//       const dueESTDate = new Date(dueDate.toLocaleString("en-US", options));//"en-US"=language specific format, timeZone option= supports IANA/Olson time zones, such as America/New_York or Europe/London & allows you to work with timezones other than UTC or your own local time zone
//       console.log(dueESTDate)
//       return (
//         dueESTDate.getDate() === currentESTDate.getDate() &&
//         dueESTDate.getMonth() === currentESTDate.getMonth() &&
//         dueESTDate.getFullYear() === currentESTDate.getFullYear()
//       );
//     });
//   };

//Code version: Filtered task date by "UTC" to have cosistent time zones btw entered tasks and current date comparison

// const filterTasksByDate = () => {
//   const currentDate = new Date();
//   return tasks.filter((task) => {
//     const dueDate = new Date( task.deadline);

//     return (
// /* add UTC(Coordinated Universal Time) in order to have consistent time zone = avoid issues with daylight saving time changes.

// the getDate method returns the day of the month based on the local time zone of the computer= the tasks for the current day were not  displaying because the current day dates in my database where being converted to be a day behind
// */
//       dueDate.getUTCDate() === currentDate.getUTCDate() &&
//       dueDate.getUTCMonth() === currentDate.getUTCMonth() &&
//       dueDate.getUTCFullYear() === currentDate.getUTCFullYear()
//     );
//   });
// };

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


  // // ---------------->/*PROPS */------------------//
  /* DID NOT END UP USING: This updateTaskDisplayed Function is passed to the EditForm component where it is called in the handleSaveClick funtion after the PUT request. All the tasks displayed to user to be updated with the edited info = show the task as it now is in state*/
  // ---------------->/*PROPS */------------------//

  // const updateTaskDisplayed = (editedTask) => {
  //   setTasks((prevTasks) =>
  //     prevTasks.map((task) =>
  //       // if the task id matches the updated task id, return the updated task, otherwise return the task
  //       task.id === editedTask.id ? editedTask : task
  //     )
  //   );
  // };

