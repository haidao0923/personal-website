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

import badges from "./lists/badge_list";


function App() {

  useEffect(() => {
    document.title = "Hai's Hub"
  }, [])

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const logActiveSlidePaths = () => {
        const activeSlides = document.querySelectorAll(`.active-slider`);
        const activeSlideIndices = Array.from(activeSlides).map((slide: any) => slide.getAttribute('data-key'));
        checkBadgeCompletion(activeSlideIndices);
        console.log(`Active Slide Indices`, activeSlideIndices);
    };

    intervalId = setInterval(logActiveSlidePaths, 500);

    return () => clearInterval(intervalId);
  }, []);

  const unlockedBadges: number[] = [0,1];
  const completedBadges: number[] = [0];

  const checkBadgeCompletion = (activeSlideIndices: string[]) => {
    //TODO
    for (let i = 0; i < unlockedBadges.length; i++) {
      console.log("Unlocked Cond: " + badges[unlockedBadges[i]].unlockConditions)
      if (badges[unlockedBadges[i]].unlockConditions.every((e) => {
        return activeSlideIndices.includes(e);
      })) {
        console.log("Yay!!!" + unlockedBadges[i]);
        const badgeNumber = unlockedBadges.splice(i, 1)[0];
        completedBadges.push(badgeNumber);
        alert("You completed a badge! Check the Secret tab!")
      }
    }
  }

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
