import React, { useEffect, useState } from "react";
import { Document, Page } from 'react-pdf';
import "../css/about.css";
import { Navbar } from "../components/NavBar";
import { NAVBARCONFIG } from "../components/NavBarConfig";
import { NavBarItemEnum } from "../components/NavBarItem";


export const About = (): JSX.Element => {
    const [text, setText] = useState<string>('');
    const inputText = "Hi there! Welcome to my About page. I am always open to learn new things. Send me a message in 'Contact' if you want to do something fun together 😄.";
    const delayBeforeRestart = 5000; // 5 seconds

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

      intervalId = setInterval(typingFunction, 150);

      // Run the first iteration immediately
      typingFunction();
    };

    useEffect(() => {
      startTypingAnimation(); // Initial start
    }, []); // Run once on component mount

  return (
    <div>
      <Navbar items={NAVBARCONFIG} selectedItem={NavBarItemEnum.ABOUT} />
      <div className="about">
      <div className="about-image-container">
        <img className='about-image' src={require(`../images/About/portrait.png`)}/>
        <h2 className="about-name">Hai Dao</h2>
        <div className="about-buttons-container">
          <button onClick={() => window.location.href=require("../Resume_Formal.pdf")} className="about-button">
            Resume
          </button>
          <a href="https://github.com/haidao0923" className="about-button about-link-button">
            GitHub
          </a>
          <a href="https://haidao0923.github.io/image-mask/" className="about-silart">
            <img className="about-image-button" src={require(`../images/About/SilArt.png`)}></img>
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