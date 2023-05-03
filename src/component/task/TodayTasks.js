export const TodayTasks = ({ tasks }) => {
  //   const [currentDate, setCurrentDate] = useState(new Date());

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

  const filteredTasks = filterTasksByDate();

  return (
    <div>
      <h1>Tasks due today:</h1>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ul>
    </div>
  );
};
