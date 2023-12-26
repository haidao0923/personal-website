import React, { useEffect } from 'react';
import './App.css';
import {Home} from './pages/home';
import {About} from './pages/about';
import {Contact} from './pages/contact';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {

  useEffect(() => {
    document.title = "Hai's Hub"
  }, [])

  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
  );
}

export default App;
