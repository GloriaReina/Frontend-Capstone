import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Container, Row, Col } from "react-bootstrap";
import "./VisualPieChart.css"

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
  "1": 0, // Self care: set ===0 & will add minutes of matching tasks to it
  "2": 0, // Family life
  "3": 0, // Work life
};

/* Created the variable weekAgo to filter out tasks that were completed a week ago (tasks whose date fall within 7 days of the current date*/
const weekAgo = new Date(); //sets current(today's) date
weekAgo.setDate(weekAgo.getDate() - 7); //set date to that of a week ago


/* check if the task's deadline is within the past week*/
filterTaskArrayData.forEach((task) => {
  if (new Date(task.deadline) >= weekAgo) {
    const category = task.category.toString(); //toString() is called on task.category to ensure its represented as a string so can display on web page (could have had a data type such as a number or boolean)
    
    /*check if categories object has a property("1","2","3") that matches the category property in the task object("1","2","3"), if true, add actualTime to that category*/
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
 
  return (
    <div className="pie-container mt-5 "style={{ width: 300, height: 300 }}>
      <Container>
        <Row>
          <Col className="line-chart-container">
          <Doughnut data={data} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

        
       
    
  
  
  
export default VisualPieChart;