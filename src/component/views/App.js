import React from "react";
import {Routes, Route, Outlet } from "react-router-dom";
import {Login} from "../authentication/Login"
import {Register} from "../authentication/Register"
import {TaskList} from "../task/TaskList"


function App() {
  return (
    <Routes>
      
        <Route path="/login" exact component={Login}/>
        <Route path="/register" component={Register} />
        <Route path="/tasklist" component={TaskList} />
      
    </Routes>
  );
};

export default App;


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


