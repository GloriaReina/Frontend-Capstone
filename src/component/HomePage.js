import { useState, useEffect} from "react";
import { TaskForm } from "./task/TaskForm";
import { TodayTasks } from "./task/TodayTasks";


export const HomePage = ()=>{
    
    const [tasks, setTasks] = useState([]);

  /* Fetched all tasks in data base and assigned data to state variable "tasks"*/
  const fetchAllTasks = () => {
    return fetch(`http://localhost:8088/tasks`)
      .then((response) => response.json())
      .then((tasksArray) => {
        setTasks(tasksArray);
      });
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  // ---------------->/*PROPS */------------------//
  
  // passing fetchAllTasks function to TaskForm/TodayTasks component so that after form is submitted/POSTwe can update page with current state i.e user can see the new task they just added
  
  //TodayTask will take the fetchALLTasks prop and pass it to the EditForm component so that it can use it after the PUT request to update page with current state


  // ---------------->/*PROPS */------------------//
    
    return(
        <>
        <TaskForm fetchAllTasks={fetchAllTasks}/>
        <TodayTasks tasks={tasks} fetchAllTasks={fetchAllTasks} />
        
        </>
        
    )
}