import { useState, useEffect} from "react";
import { TaskForm } from "./TaskForm";
import { TodayTasks } from "./TodayTasks";


export const HomePage = ()=>{
    
    const [tasks, setTasks] = useState([]);

    const localAppUser = localStorage.getItem("app_user")
    const AppUserObject = JSON.parse(localAppUser)

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

  // ---------------->/*PROPS */------------------//
  
  // passing fetchAllTasks function to TaskForm/TodayTasks component so that after form is submitted/POSTwe can update page with current state i.e user can see the new task they just added
  
  //TodayTask will take the fetchALLTasks prop and pass it to the EditForm component so that it can use it after the PUT request to update page with current state


  // ---------------->/*PROPS */------------------//
    
    return(
        <>
        <TaskForm fetchAllTasks={fetchAllTasks}/>
        <TodayTasks tasks={tasks} fetchAllTasks={fetchAllTasks} setTasks={setTasks} />
        
        </>
        
    )
}