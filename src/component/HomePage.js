import { useState, useEffect} from "react";
import { TaskForm } from "./task/TaskForm";
import { TodayTasks } from "./task/TodayTasks";

export const HomePage = ()=>{
    
    const [tasks, setTasks] = useState([]);

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
    
    return(
        <>
        <TaskForm taskSubmitted={taskSubmitted}/>
        <TodayTasks tasks={tasks} />
        </>
        
    )
}