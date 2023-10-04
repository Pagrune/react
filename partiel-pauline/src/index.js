import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/style.css";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import ListTask from './pages/ListTask';
import Contact from './pages/Contact';
import Nav from "./components/Nav";
import Task from './pages/Task';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Nav/>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/tasks" element={<ListTask/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/task/:id" element={<Task />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
