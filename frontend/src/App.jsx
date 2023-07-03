import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Task from './Pages/Task';

const App = () => {
  return (
    <div className="app"> 
      <Routes> 
        <Route  path="/" element={<Home />} /> 
        <Route  path="/task/:id" element={<Task />} /> 
      </Routes>
    </div>
  )
}

export default App