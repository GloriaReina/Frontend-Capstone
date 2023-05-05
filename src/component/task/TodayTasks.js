import { EditForm } from './EditForm';
import './TodayTasks.css';




export const TodayTasks = ({ tasks, fetchAllTasks }) => 

{
 
  /*Function that filters the list of tasks based on the current date & 
    returns a new array that contains only the tasks that are due on the current date.*/

  const filterTasksByDate = () => {
    const currentDate = new Date();
    return tasks.filter((task) => {
      const dueDate = new Date( task.deadline);
       
      return (
/* add UTC(Coordinated Universal Time) in order to have consistent time zone = avoid issues with daylight saving time changes.

the getDate method returns the day of the month based on the local time zone of the computer= the tasks for the current day were not  displaying because the current day dates in my database where being converted to be a day behind
*/
        dueDate.getUTCDate() === currentDate.getUTCDate() &&
        dueDate.getUTCMonth() === currentDate.getUTCMonth() &&
        dueDate.getUTCFullYear() === currentDate.getUTCFullYear()
      );
    });
  };

  let filteredTasks = filterTasksByDate();
  filteredTasks = filteredTasks.filter(task=>{ return task.completed===false})

  /*  new array (sortedFilteredTasks) takes a copy of the (filteredTask array) which holds tasks due on current day and sorts these tasks by urgency level.
  
  a and b = two elements of the array being compared, if a-b<0, a is displayed first, if >0, b is displayed first, if = 0 nothing changes
  */

  const sortedFilteredTasks = [...filteredTasks].sort((a, b) => a.urgencyLevel - b.urgencyLevel);



  return (
    <>
    <div>
      <h1>Tasks due today:</h1>
      <ul>
        {sortedFilteredTasks.map((task) => (
          <>
          {/* add a CSS class based on urgency level of each task--use to color-code tasks based off */}
           <div className={`task-item urgency-${task.urgencyLevel}`}>
          <li key={task.id}>{task.description} </li>
          
          </div>
          <EditForm task={task}
                  fetchAllTasks={fetchAllTasks}
                  //  //pass fetchALLTasks prop EditForm component so that it can use it after the PUT request to update page with current state; and task so it can have access to task object for edits
                  />
          </>
        ))}
      </ul>
    </div>
  </>
)}
