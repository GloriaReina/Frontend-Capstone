import { Outlet, Route, Routes } from "react-router-dom";
import { AllTasks } from "../task/AllTasks";
// import { HomePage } from "../HomePage";
import VisualLineGraph from "../datavisual/VisualLineGraph";
import VisualPieChart from "../datavisual/VisualPieChart";
import { HomePage } from "../task/HomePage";
import { VisualContainer } from "../datavisual/VisualContainer";



//render the <TicketList> component with  a <Route> component.

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/" element={
        <>
        <HomePage/>
        <Outlet />
        
        </>
     }>

      </Route>
      <Route path="tasks" element={<AllTasks />} />
      <Route path="visuals" element={
      <>
      <VisualContainer />
      {/* <VisualLineGraph />
      <VisualPieChart /> */}
      </>
      }/>
    </Routes>
  );
};

// if add route path within "/" route...the content in homepage will display in the other page