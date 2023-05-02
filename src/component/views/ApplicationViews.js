import { Outlet, Route, Routes } from "react-router-dom";
import { AllTasks } from "../task/AllTasks";
import { HomePage } from "../HomePage";

//render the <TicketList> component with  a <Route> component.

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/" element={
        <>
        <HomePage />
        <Outlet />
        
        </>
     }>

      </Route>
      <Route path="tasks" element={<AllTasks />} />
    </Routes>
  );
};

// if add route path within "/" route...the content in homepage will display in the other page