import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'


export const BigCalendar = ()=>{
    
    const [tasks, setTasks] = useState([]);

    const localAppUser = localStorage.getItem("app_user")
    const AppUserObject = JSON.parse(localAppUser)

//moment localizer solves date internationalization and localization
// Setup the localizer by providing the moment Object

    const localizer = momentLocalizer(moment)
    const dateFormat = 'YYYY-MM-DD'

/* Fetched all tasks in data base and assigned data to state variable "tasks"*/
    const fetchAllTasks = () => {
        return fetch(`http://localhost:8088/tasks`)
        .then((response) => response.json())
        .then((tasksArray) => {
/*filter tasks in database by user's id so that only their tasks displays*/
        const tasksById = tasksArray.filter(task=>{ return task.userId=== AppUserObject.id})
        setTasks(tasksById);
      });
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);


const events = tasks.map(task => ({
    title: task.description,
    start: moment(task.deadline, dateFormat).toDate(),
//Big Calendar treats event start/end dates as an exclusive range; for inclusive ranges, provide function endAccessor that returns the end date + 1 day
    end: moment(task.deadline, dateFormat).add(1, 'days').toDate(),
    allDay: true
  }))

  return (
    <div className="myCustomHeight"style={{width:600, height:300}}>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
    />
    </div>
  )
  
}