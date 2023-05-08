import { EditForm } from "./EditForm";
import { Container,Col,Row } from "react-bootstrap";
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
    <h1>Tasks due today</h1>
      <div>
        
          {sortedFilteredTasks.map((task) => (
            <>
            <div className="today-task-container">
            <Container >  
              <Row className={`urgency-${task.urgencyLevel}`}>
              <Col key={task.id}>{`${task.description} `}
              
              </Col>
              <Col>
              <EditForm
                task={task}
                fetchAllTasks={fetchAllTasks}
                handleTaskCompletion={handleTaskCompletion}
                //  //pass fetchALLTasks prop EditForm component so that it can use it after the PUT request to update page with current state; and task so it can have access to task object for edits
              />
              </Col>
              </Row>
              </Container> 
              </div>
              
              
            </>
          ))}
        
      </div>
    </>
  );
};
