import React from "react";
import { BrowserRouter as Routes, Route, Outlet } from "react-router-dom";
import {Login} from "../authentication/Login"
import {Register} from "../authentication/Register"
import {TaskList} from "../task/TaskList"


function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" exact component={Login}/>
        <Outlet />
        <Route path="/register" component={Register} />
        <Route path="/tasklist" component={TaskList} />
      </Route>
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


