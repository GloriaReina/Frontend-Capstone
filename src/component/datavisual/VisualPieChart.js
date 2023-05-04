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


    
   const data = {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
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