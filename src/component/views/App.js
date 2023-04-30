import {Routes, Route } from "react-router-dom";
import {Login} from "../authentication/Login"
import {Register} from "../authentication/Register"
import {TaskList} from "../task/TaskList"
import { Authorized } from "./Authorized";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/> 
      <Route path="/register" element={<Register />} />
      <Route path="*" element={
        <Authorized>
            <>
              <div className="content-container">
                  <TaskList/>
              </div>

            </>
        </Authorized >
          } />
      
    </Routes>
  );
};

export default App;






// function App() {
//   return (
//     <Routes>

//         <Route path="*" element={
//         <Authorized>
//           <>
//           <Login/> 
//           <Register/>
//           <div className="content-container">
//           {/* <TaskList/> */}
//           </div>
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


