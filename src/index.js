import React from 'react';
import {ReactDOM, createRoot} from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import './index.css';
// import reportWebVitals from './reportWebVitals';
import App from './component/views/App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//     <App />
//     </BrowserRouter>
// );

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
