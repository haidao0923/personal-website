import React, { useEffect, useState } from "react";
import "../css/about.css";
import { Navbar } from "../components/NavBar";
import { NAVBARCONFIG } from "../components/NavBarConfig";
import { NavBarItemEnum } from "../components/NavBarItem";

export const About = (): JSX.Element => {
    const [text, setText] = useState<string>('');
    const inputText = "Hi there! Welcome to my About page. Keep exploring and interacting with the image gallery and maybe you'll find some fun secrets 😉. If you have any feedback, please leave them in the Contact page!";
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
        <h1 className="typewriter-text" dangerouslySetInnerHTML={{ __html: text }}></h1>
      </div>
    </div>
  );
};