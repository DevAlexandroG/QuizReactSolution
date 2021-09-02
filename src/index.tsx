import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const app = (
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
)
ReactDOM.render(app,document.getElementById('root'))
reportWebVitals();
