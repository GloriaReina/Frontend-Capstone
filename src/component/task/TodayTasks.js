import { EditForm } from "./EditForm";
import "./TodayTasks.css";

export const TodayTasks = ({ tasks, fetchAllTasks, setTasks }) => {
  /*value of taskId(can have any name) comes from  task.id property of the task object thats selected when user click its checkbox

  updatedTask array has all the original tasks, but with the completed status of the task with the matching taskId set to true */
  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    });

    //setTask prop from HomePage to update state var to updatedTasks so that on the homepage when user checks checkbox the state variable is updated so that the completed property is set to true and the task is removed from view
    setTasks(updatedTasks);

    /*find the updated task with the matching taskId using the find method. */
    const updatedTask = updatedTasks.find((task) => task.id === taskId);

    /*Then sends a PUT request to update the status of that task on the server using the fetch function.*/

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

  /*Function that filters the list of tasks based on the current date & 
    returns a new array that contains only the tasks that are due on the current date.*/

  /* At first was converting to UTC,but my computer is in EST & had to modify the code to account for the 4-hour time difference between EST and UTC so tasks due on the current day didnt disappear at 8pm.*/

  /*used toLocaleString() method to convert the current date and the task deadline to EST time before comparing them so format/time is the same and there's no discrepancies*/

  const filterTasksByDate = () => {
    const currentDate = new Date();
    const options = { timeZone: "America/New_York" }; // set timezone to EST
    const currentESTDate = new Date(
      currentDate.toLocaleString("en-US", options)
    );
console.log(currentESTDate)
    return tasks.filter((task) => {
      const dueDate = new Date(task.deadline);
      const dueESTDate = new Date(dueDate.toLocaleString("en-US", options));//"en-US"=language specific format, timeZone option= supports IANA/Olson time zones, such as America/New_York or Europe/London & allows you to work with timezones other than UTC or your own local time zone
      console.log(dueESTDate)
      return (
        dueESTDate.getDate() === currentESTDate.getDate() &&
        dueESTDate.getMonth() === currentESTDate.getMonth() &&
        dueESTDate.getFullYear() === currentESTDate.getFullYear()
      );
    });
  };

  let filteredTasks = filterTasksByDate();
  filteredTasks = filteredTasks.filter((task) => {
    return task.completed === false;
  });

  /*  new array (sortedFilteredTasks) takes a copy of the (filteredTask array) which holds tasks due on current day and sorts these tasks by urgency level.
  
  a and b = two elements of the array being compared, if a-b<0, a is displayed first, if >0, b is displayed first, if = 0 nothing changes
  */

  const sortedFilteredTasks = [...filteredTasks].sort(
    (a, b) => a.urgencyLevel - b.urgencyLevel
  );

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
              <EditForm
                task={task}
                fetchAllTasks={fetchAllTasks}
                handleTaskCompletion={handleTaskCompletion}
                //  //pass fetchALLTasks prop EditForm component so that it can use it after the PUT request to update page with current state; and task so it can have access to task object for edits
              />
            </>
          ))}
        </ul>
      </div>
    </>
  );
};
