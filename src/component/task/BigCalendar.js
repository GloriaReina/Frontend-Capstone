import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import './BigCalendar.css';
import {Container,Row,Col} from "react-bootstrap";





export const BigCalendar = () => {
  const [tasks, setTasks] = useState([]);

  const localAppUser = localStorage.getItem("app_user");
  const AppUserObject = JSON.parse(localAppUser);

  /* Fetched all tasks in data base and assigned data to state variable "tasks"*/
  useEffect(() => {
    const fetchAllTasks = () => {
      return fetch(`http://localhost:8088/tasks`)
        .then((response) => response.json())
        .then((tasksArray) => {
          /*filter tasks in database by user's id so that only their tasks displays*/
          const tasksById = tasksArray.filter((task) => {
            return task.userId === AppUserObject.id;
          });
          setTasks(tasksById);
        });
    };
    fetchAllTasks();
  }, [tasks]);

  //moment localizer solves date internationalization/localization
  // Setup the localizer by providing the moment Object

  const localizer = momentLocalizer(moment);
  const dateFormat = "YYYY-MM-DD HH:mm";
  
  const taskList = tasks.map((task) => {
    /*mapping tasks & using moment to parse the deadline, startTime, and endTime strings and dateFormat var to create: Date object with date/time info.*/
    const startDateTime = moment(`${task.deadline} ${task.startTime}`,dateFormat).toDate();
    const endDateTime = moment(`${task.deadline} ${task.endTime}`,
      dateFormat ).toDate();
    /*Setting the start and end properties of the event object to date objects.*/

    /*Setting the allDay property to false to indicate that the event has a specific start and end time.*/
    return {
      title: task.description,
      start: startDateTime,
      end: endDateTime,
      allDay: false,
    };
  });

  return (
    <div className="calendar-container mt-5 " >
      <Container >
      <Row >
        <Col className="calendar-container" style={{ width: 900, height: 700, }}>
        <Calendar 
        localizer={localizer}
        events={taskList}
        startAccessor="start"
        endAccessor="end"
      />
        </Col>
      </Row>
    </Container>
    </div>
  );
};
