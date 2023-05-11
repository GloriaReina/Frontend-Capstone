import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import moment from "moment";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./VisualLineGraph.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const VisualLineGraph = () => {
  const [chartTaskData, setChartTaskData] = useState([]);

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

  // Filter tasks by completion status (only include completed tasks) and  tasks with user input for actualTime
  const completedTasks = chartTaskData;

  const filterTaskArrayData = completedTasks.filter(
    (task) => task.completed === true && task.actualTime !== ""
  );

  /*From filteredTaskArrayDay--->Only select tasks from the past week. */

  const tasksPastWeek = filterTaskArrayData.filter((task) => {
    //create a new moment object for each task's deadline property

    const taskDate = moment(task.deadline);

    // create a new moment object representing one week ago using the moment().subtract() method. We pass in the number of days we want to subtract (7) and the unit of time we're subtracting (days).

    const oneWeekAgo = moment().subtract(7, "days");

    // compare each taskDate to oneWeekAgo using the isAfter() method. If taskDate is after oneWeekAgo, the task is included in the filtered array

    return taskDate.isAfter(oneWeekAgo);
  });


/*----------------------------------------------------------------------*/
  
/* map through tasksPastWeek and grab day name for each deadline date*/
  const taskDates = tasksPastWeek.map(task =>  new Date(task.deadline).toLocaleString("en-US", {timeZone: "UTC",weekday: 'long'}));
  git

 
/*----------------------------------------------------------------------*/

/*----------------------------------------------------------------------*/
const estTimeArray= tasksPastWeek.map((task) => task.estimatedTime && task.deadline)
// console.log(estTimeArray)

const sum = estTimeArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

const averageEstTime = sum / estTimeArray.length;

// console.log(averageEstTime);

/*----------------------------------------------------------------------*/
  // Map filterTaskArrayData array to create the data format expected by Chart.js
  const data = {
    labels: taskDates,
    datasets: [
      {
        label: "Estimated Time",
        data: tasksPastWeek.map((task) => task.estimatedTime),
        fill: false,
        borderColor: "#f00",
      },
      {
        label: "Actual Time",
        data: tasksPastWeek.map((task) => task.actualTime),
        fill: false,
        borderColor: "#83E077",
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Task Time Analysis",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="chart-container mt-5 " style={{ width: 600, height: 300 }}>
      <Container >
        <Row>
          <Col  className="line-chart-container">
            <Line data={data} options={options} />
          </Col>         
        </Row>
      </Container>
      <Container>
        <Row>
          <Col >
          <Card className="mt-5 ">
      <Card.Header>Time Management Insight</Card.Header>
      <Card.Body>
        <Card.Text>
          Graph estimated task completion time vs actual task completion time. 
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VisualLineGraph;

// export const VisualLineGraph = () => {
//   const completedTasks = [
//     { description: "Fix the piano!", deadline: "2023-05-01", estimatedTime: "10", actualTime: 45, completed: true },
//     { description: "Clean the attic", deadline: "2023-05-01", estimatedTime: "30", actualTime: 35, completed: true },
//     { description: "Mow the lawn", deadline: "2023-05-02", estimatedTime: "20", actualTime: 25, completed: true },
//     { description: "Paint the house", deadline: "2023-05-02", estimatedTime: "60", actualTime: 75, completed: true },
//     { description: "Wash the car", deadline: "2023-05-03", estimatedTime: "15", actualTime: 20, completed: true },
//     { description: "Do the laundry", deadline: "2023-05-03", estimatedTime: "45", actualTime: 50, completed: true },
//   ];

//   // MapcompletedTasks array to create the data format expected by Chart.js
//   const data = {
//     labels: completedTasks.map((task) => task.description),
//     datasets: [
//       {
//         label: "Estimated Time",
//         data: completedTasks.map((task) => task.estimatedTime),
//         fill: false,
//         borderColor: "#f00"
//       },
//       {
//         label: "Actual Time",
//         data: completedTasks.map((task) => task.actualTime),
//         fill: false,
//         borderColor: "#00f"
//       }
//     ]
//   };

//   const options = {
//     title: {
//       display: true,
//       text: "Task Time Analysis"
//     },
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true
//           }
//         }
//       ]
//     }
//   };

//   return <Line data={data} options={options} />;
// };

// export default VisualLineGraph;
