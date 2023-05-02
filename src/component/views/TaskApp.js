// import { Route, Router, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Login } from "../authentication/Login";
import { Register } from "../authentication/Register";
import { Authorized } from "./Authorized";
import { NavBar } from "../nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"


export const TaskApp= () => {
  return <Router>
  
  <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={
          <Authorized>
            <>
              <NavBar />    
              <ApplicationViews />  
              
               
          </>
          </Authorized>
        } />
      </Routes>
      </Router>
}



// function App() {
//   return (
//     <Routes>

//         <Route path="*" element={
//         <Authorized>
//           <>
//           <Login/>
//           <Register/>
//
//           {/* <TaskList/> */}
//
//           </>
//           </Authorized >
//           } />
//        <Route path="/tasklist" element={<TaskList />} />
//       </Routes>
//   );
// };

// export default App;

// This was already in here for help
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
