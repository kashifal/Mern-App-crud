import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Task from './Pages/Task';
import Sign from './Pages/Sign';
import Register from './Pages/Register';

const App = () => {
  return (
    <div className="app"> 
      <Routes> 
        <Route  path="/" element={<Home />} /> 
        <Route  path="/task/:id" element={<Task />} /> 
        <Route  path="/signin" element={<Sign />} /> 
        <Route  path="/register" element={<Register />} /> 
      </Routes>
    </div>
  )
}

export default App
