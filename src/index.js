import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configStore from './store/configStore'
import {Provider} from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SuccessPage from './components/success';
const store=configStore
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <Provider store={store}>  
  <BrowserRouter>

        <Routes>
          <Route exact path="/" element={<App />}/>
          <Route exact path="/success" element={<SuccessPage/>}/>

        </Routes>
  </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
