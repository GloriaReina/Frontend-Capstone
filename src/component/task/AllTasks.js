import React, { useState, useEffect } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
// import { TaskForm } from './TaskForm';
// import { TodayTasks } from './TodayTasks';
import { EditForm } from './EditForm';

export const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');


  const localAppUser = localStorage.getItem("app_user")
    const AppUserObject = JSON.parse(localAppUser)

  /* Fetched all tasks in data base and assigned data to state variable "tasks"*/
  const fetchAllTasks = () => {
    fetch(`http://localhost:8088/tasks`)
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

  // // ---------------->/*PROPS */------------------//
  /* This updateTaskDisplayed Function is passed to the EditForm component where it is called in the handleSaveClick funtion after the PUT request. All the tasks displayed to user to be updated with the edited info = show the task as it now is in state*/
  // ---------------->/*PROPS */------------------//
 
    const updateTaskDisplayed = (editedTask) => {
      setTasks(
        (prevTasks) =>
          prevTasks.map((task) =>
          // if the task id matches the updated task id, return the updated task, otherwise return the task
            task.id === editedTask.id ? editedTask : task
          ) 
      );
    };


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
      return task.urgencyLevel === "1";
    }

    if (filter === 'urgency level 2') {
        return task.urgencyLevel === "2";
      }

    if (filter === 'urgency level 3') {
        return task.urgencyLevel === "3";
      }

    if (filter === 'urgency level 4') {
        return task.urgencyLevel === "4";
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

  const sortedFilteredTasks = [...filteredTasks].sort((a, b) => a.urgencyLevel - b.urgencyLevel);

  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    });

    setTasks(updatedTasks);

    const updatedTask = updatedTasks.find((task) => task.id === taskId);
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

 return (
  <>
  {/* need to wrap it in div so that task form does not display on Task page since you are calling it in order to pass it taskSubmitted
  
  If have extra time...just create a parent component later to hold state*/}
{/* <div style={{ display: "none" }}><TaskForm taskSubmitted={taskSubmitted} /></div>
<div style={{ display: "none" }}><TodayTasks tasks={tasks} /></div> */}


    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Select Display Option
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
        {sortedFilteredTasks.map((task) => (
          <>
          {/* sent task and fetchAllTasks as props to EditForm */}
          <div className={`task-item urgency-${task.urgencyLevel}`}>      
          <li key={task.id}>{`${task.description} by ${task.deadline}`}</li>
          </div>
          <EditForm
                  task={task}
                  setTasks= {setTasks}
                  fetchAllTasks={fetchAllTasks}
                  updateTaskDisplayed={updateTaskDisplayed}
                  handleTaskCompletion={handleTaskCompletion}
                />
         
          
      </>
      
        ))}
      </ul>
    </Dropdown>
    </>
  );
} 
