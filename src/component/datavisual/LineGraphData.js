/*2nd try: typeError chartTaskData.filter is not a function/ when i cosole log it= dont have an array of tasks*/

import React, {useState, useEffect}from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from 'chart.js';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineGraphData = ()=>{

const[chartTaskData, setChartTaskData] = useState([]);
const[chartTaskDataObj, setChartTaskDataObj] = useState({});



/* Fetched all tasks in data base and assigned data to state variable "chartTaskData" also use useEffect to monitor state var changes= will reassign filtered tasks object with only the properties we need to the state var */
const fetchDataAllTasks = () => {
  return fetch(`http://localhost:8088/tasks`)
    .then((response) => response.json())
    .then((tasksArrayData) => {
        
      setChartTaskData(tasksArrayData);
    });
    
};

useEffect(() => {
fetchDataAllTasks();

}, []);



console.log(chartTaskData)

// Filter tasks by completion status (only include completed tasks) and  tasks with user input for actualTime
     
const filterTaskArrayData = chartTaskData.filter(task => task.completed === true && task.actualTime !== null && task.actualTime !== undefined && task.actualTime !== "");


/*From filteredTaskArrayDay--->Only select tasks from the past week. */

const tasksPastWeek = filterTaskArrayData.filter(task => {
	//create a new moment object for each task's deadline property
 	
		const taskDate = moment(task.deadline);

	// create a new moment object representing one week ago using the moment().subtract() method. We pass in the number of days we want to subtract (7) and the unit of time we're subtracting (days).
  		
		const oneWeekAgo = moment().subtract(7, 'days');

	// compare each taskDate to oneWeekAgo using the isAfter() method. If taskDate is after oneWeekAgo, the task is included in the 	 	   filtered array

  		return taskDate.isAfter(oneWeekAgo);
});


 // Create chart data
 const labels = tasksPastWeek.map(task => task.description);
 const estimatedTimes = tasksPastWeek.map(task => task.estimatedTime);
 const actualTimes = tasksPastWeek.map(task => task.actualTime);

setChartTaskDataObj({
  labels,
  datasets: [
    {
      label: 'Estimated Time',
      data: estimatedTimes,
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      label: 'Actual Time',
      data: actualTimes,
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
    },
  ],
});

const data = chartTaskDataObj

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

return <div style= {{id:"myChart", width:"400", height:"400"}}>
       {/* <Line options={options} data={data} />; */}
</div>

}






/*1st try*/

// import React, { useState, useEffect } from 'react';
// import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from 'chart.js';
// import moment from 'moment';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );


    
// const [chartTaskData, setChartTaskData] = useState({});

// /* Fetched all tasks in data base and assigned data to state variable "chartTaskData" also use useEffect to monitor state var changes= will reassign filtered tasks object with only the properties we need to the state var */

// useEffect(() => {
// const fetchDataAllTasks = () => {
//   return fetch(`http://localhost:8088/tasks`)
//     .then((response) => response.json())
//     .then((tasksArrayData) => {
//       setChartTaskData(tasksArrayData);
//     });
// };


// // Filter tasks by completion status (only include completed tasks) and  tasks with user input for actualTime
     
// const filterTaskArrayData = tasksArrayData.filter(task => task.completed === true && task.actualTime !== null && task.actualTime !== undefined && task.actualTime !== "");


// /*From filteredTaskArrayDay--->Only select tasks from the past week. */

// const tasksPastWeek = filterTaskArrayData.filter(task => {
// 	//create a new moment object for each task's deadline property
 	
// 		const taskDate = moment(task.deadline);

// 	// create a new moment object representing one week ago using the moment().subtract() method. We pass in the number of days we want to subtract (7) and the unit of time we're subtracting (days).
  		
// 		const oneWeekAgo = moment().subtract(7, 'days');

// 	// compare each taskDate to oneWeekAgo using the isAfter() method. If taskDate is after oneWeekAgo, the task is included in the 	 	   filtered array

//   		return taskDate.isAfter(oneWeekAgo);
// });

//   // Create chart data
//   const labels = tasksPastWeek.map(task => task.description);
//   const estimatedTimes = tasksPastWeek.map(task => task.estimatedTime);
//   const actualTimes = tasksPastWeek.map(task => task.actualTime);

//   setChartTaskData({
//     labels,
//     datasets: [
//       {
//         label: 'Estimated Time',
//         data: estimatedTimes,
//         borderColor: 'rgba(255, 99, 132, 1)',
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//       },
//       {
//         label: 'Actual Time',
//         data: actualTimes,
//         borderColor: 'rgba(54, 162, 235, 1)',
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//       },
//     ],
//   });

// fetchDataAllTasks();

// }, []);

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart',
//     },
//   },
// };


// export const data = {chartTaskData}