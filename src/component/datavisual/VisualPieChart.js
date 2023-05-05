import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export const VisualPieChart = () => {
    const[pieTaskData, setPieTaskData] = useState([]);

    const fetchDataAllTasks = () => {
      return fetch(`http://localhost:8088/tasks`)
        .then((response) => response.json())
        .then((tasksArrayData) => {
            
          setPieTaskData(tasksArrayData);
        });
        
    };
    
    useEffect(() => {
    fetchDataAllTasks();
    
    }, []);

// Filter tasks by completion status (only include completed tasks) and  tasks with user input for actualTime
const completedTasks = pieTaskData

/*From filteredTaskArrayDay--->Only select tasks that are completed and have an input for actualTime property. */

const filterTaskArrayData = completedTasks.filter(task => task.completed === true && task.actualTime !== "");

const categories = {
  "1": 0, // Self care
  "2": 0, // Family life
  "3": 0, // Work life
};

/* Created the variable weekAgo to filter out tasks that were completed a week ago (tasks whose date fall within 7 days of the current date*/
const weekAgo = new Date();
weekAgo.setDate(weekAgo.getDate() - 7);


/* check if the task's deadline is within the past week, if true, add its actualTime to the corresponding category in the categories object*/
filterTaskArrayData.forEach((task) => {
  if (new Date(task.deadline) >= weekAgo) {
    const category = task.category.toString();
    
    /*check if categories object has a property that matches the category property in the task object, if true, add actualTime to that category*/
    if (categories.hasOwnProperty(category)) {
      categories[category] += parseInt(task.actualTime);
    }
  }
});

   const data = {
      labels:  ["Self Care", "Family Life", "Work Life"],
      datasets: [
        {
          label: '# of Minutes',
          data: [
            categories["1"],
            categories["2"],
            categories["3"],
          ],
          backgroundColor: [
            "#67CC56", "#E88351", "#DCDE6A"
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1,
        },
      ],
    };
    
      return <div style={{width:600, height:300}}>
        <Doughnut data={data} />
        </div>
    }
  
  
  
export default VisualPieChart;