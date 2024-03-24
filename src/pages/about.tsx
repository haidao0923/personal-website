import React, { useEffect, useState } from "react";
import { Document, Page } from 'react-pdf';
import "../css/about.css";
import { Navbar } from "../components/NavBar";
import { NAVBARCONFIG } from "../components/NavBarConfig";
import { NavBarItemEnum } from "../components/NavBarItem";

import {analytics} from "../firebase.js";
import { logEvent } from "firebase/analytics";

import ReactGA from 'react-ga4';

export const About = (): JSX.Element => {
    const [text, setText] = useState<string>('');
    const [boardwayButtonImageIndex, setBoardwayButtonImageIndex] = useState(0);
    const inputText = "Hi there! Welcome to my About page. I am always open to learn new things. Send me a message in 'Contact' if you want to do something fun together 😄.";
    const delayBeforeRestart = 4000; // 4 seconds

    const startTypingAnimation = () => {
      let index = 0;
      let intervalId: NodeJS.Timeout;

      const typingFunction = () => {
          if (index <= inputText.length) {
            setText(inputText.substring(0, index).replace(/\n/g, '<br />'));
            index++;
          } else {
            clearInterval(intervalId);
            setTimeout(() => {
              startTypingAnimation(); // Restart typing animation
            }, delayBeforeRestart);
          }
      };

      intervalId = setInterval(typingFunction, 50);
      // Run the first iteration immediately
      typingFunction();
    };

    const startBoardwaySpriteChange = () => {
      let index = 0;
      let intervalId: NodeJS.Timeout;

      const boardwaySpriteChangeFunction = () => {
        setBoardwayButtonImageIndex(index);
        index = (index + 1) % 19; // 19 frames from 0 to 18
        return () => clearInterval(intervalId); // Clear interval on unmount
      }

      intervalId = setInterval(boardwaySpriteChangeFunction, 100);

      boardwaySpriteChangeFunction();

    }



    useEffect(() => {
      startTypingAnimation(); // Initial start
      console.log("Typing");
    }, []); // Run once on component mount

    useEffect(() => {
      startBoardwaySpriteChange(); // Initial start
      console.log("Boardway Sprite Change Started");
    }, []); // Run once on component mount

  return (
    <div>
      <Navbar items={NAVBARCONFIG} selectedItem={NavBarItemEnum.ABOUT} />
      <div className="about">
      <div className="about-image-container">
        <img className='about-image' src={require(`../images/About/portrait.png`)}/>
        <h2 className="about-name">Hai Dao</h2>
        <div className="about-buttons-container">
          <button onClick={() => {console.log("Before Clicked"); ReactGA.event({ action: 'clicked_resume', category: 'about_page', label: 'about_label', value: 1}); window.location.href=require("../Resume_Formal.pdf");}} className="about-button">
            Resume
          </button>
          <a href="https://github.com/haidao0923" className="about-button about-link-button">
            GitHub
          </a>
          <a href="https://boardway.vercel.app" className="about-boardway">
            <img className="about-boardway-button" src={require(`../images/About/Boardway/${boardwayButtonImageIndex}.png`)}></img>
          </a>
          <a href="https://haidao0923.github.io/image-mask/" className="about-silart">
            <img className="about-silart-button" src={require(`../images/About/SilArt.png`)}></img>
          </a>
          <a href="https://haidao0923.github.io/techdle/" className="about-techdle">
            <img className="about-techdle-button" src={require(`../images/About/Techdle.png`)}></img>
          </a>
          <a href="https://legendaryvn.itch.io/" className="about-button about-link-button">
            Game Portfolio
          </a>
          <button disabled={true} className="about-button">
            Map
          </button>
        </div>
      </div>
      <h1 className="typewriter-text" dangerouslySetInnerHTML={{ __html: text }}></h1>
      </div>
    </div>
  );
};