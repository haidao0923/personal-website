import React from 'react';
import './App.css';
import {Home} from './pages/home';
import {About} from './pages/about';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
  );
}

export default App;
