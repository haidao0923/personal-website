import React, { useEffect } from 'react';
import './App.css';
import {Home} from './pages/home';
import {About} from './pages/about';
import {Secret} from './pages/secret';
import {Contact} from './pages/contact';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {

  useEffect(() => {
    document.title = "Hai's Hub"
  }, [])

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    // Log active slide names every 500ms
    const logActiveSlidePaths = () => {
        const activeSlides = document.querySelectorAll(`.active-slider`);
        const activeSlideIndices = Array.from(activeSlides).map((slide: any) => slide.getAttribute('data-key'));
        console.log(`Active Slide Indices`, activeSlideIndices);
    };

    // Set interval to log active slides every 500ms
    intervalId = setInterval(logActiveSlidePaths, 500);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const unlockedBadges: number[] = [];
  const completedBadges: number[] = [0];

  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/secret' element={<Secret unlockedBadges={unlockedBadges} completedBadges={completedBadges}/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
  );
}

export default App;
