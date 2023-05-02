import { Outlet, Route, Routes } from "react-router-dom"
import { AllTasks } from "../task/AllTasks"
import { HomePage } from "../HomePage"


//render the <TicketList> component with  a <Route> component.

export const ApplicationViews = () => {
    return (
        <Routes>
            {/* <Route path="/" element={
                <>
                    <h1>Life Hack</h1>
                    <div>Your one-stop-shop to wrangle the chaos</div>

                    <Outlet />
                </>
            }> */}
                 <Route path="tasks" component={<AllTasks />} />
                <Route path="homepage" component={<HomePage />} />  
                
        {/* </Route> */}
        </Routes >
    )
}