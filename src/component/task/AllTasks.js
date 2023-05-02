import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { TaskForm } from './TaskForm';

export const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');


  /* Fetched all tasks in data base and assigned data to state variable "tasks"*/
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

  // ---------------->/*PROPS */------------------//
  
  // passing function to TaskForm component so that after form is submited/POST new object,we can update page with current state i.e user can see the new task they just added

  const taskSubmitted = () => {
    fetchAllTasks();
  };
  // ---------------->/*PROPS */------------------//

    /* 
    When user selects an option from the dropdown menu, the onclick event will cause the state variable to be updated to one of the conditional statements below

    filtered tasks variable that will hold an array of tasks based off of whatever condition is met
    
    */
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    }

    if (filter === 'complete tasks') {
      return task.completed;
    }

    if (filter === 'incomplete tasks') {
      return !task.completed;
    }

    if (filter === 'urgency level 1') {
      return task.urgency === 1;
    }

    if (filter === 'urgency level 2') {
        return task.urgency === 2;
      }

    if (filter === 'urgency level 3') {
        return task.urgency === 3;
      }

    if (filter === 'urgency level 4') {
        return task.urgency === 4;
      }
      if (filter === 'Self Care Tasks') {
        return task.category === "1";
      }
  
      if (filter === 'Family-Life Tasks') {
          return task.category === "2";
        }
  
      if (filter === 'Work-Life Tasks') {
          return task.category === "3";
        }

    return true;
  });

 return (
  <>
  {/* need to wrap it in div so that task form does not display on Task page since you are calling it in order to pass it taskSubmitted */}
<div style={{ display: "none" }}><TaskForm taskSubmitted={taskSubmitted} /></div>


    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        All Tasks
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setFilter('all')}>All tasks</Dropdown.Item>
        <Dropdown.Item onClick={() => setFilter('complete tasks')}>
          Completed tasks
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setFilter('incomplete tasks')}>
          Incomplete tasks
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setFilter('urgency level 1')}>
          Urgency Leve 1 tasks
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setFilter('urgency level 2')}>
          Urgency Leve 2 tasks
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setFilter('urgency level 3')}>
          Urgency Leve 3 tasks
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setFilter('urgency level 4')}>
          Urgency Leve 4 tasks
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setFilter('Self Care Tasks')}>
          Self Care Tasks
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setFilter('Family-Life Tasks')}>
        Family-Life Tasks
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setFilter('Work-Life Tasks')}>
        Work-Life Tasks
        </Dropdown.Item>
      </Dropdown.Menu>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ul>
    </Dropdown>
    </>
  );
} 
