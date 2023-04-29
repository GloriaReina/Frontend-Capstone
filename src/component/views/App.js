import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/tasklist" component={TaskList} /> */}
      </Switch>
    </Router>
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


