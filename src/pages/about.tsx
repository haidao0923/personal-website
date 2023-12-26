import React, { useEffect, useState } from "react";
import "../css/about.css";
import { Navbar } from "../components/NavBar";
import { NAVBARCONFIG } from "../components/NavBarConfig";
import { NavBarItemEnum } from "../components/NavBarItem";

export const About = (): JSX.Element => {
    const [text, setText] = useState<string>('');
    const inputText = "Hi there! Welcome to my About page. My name is Hai Dao and I am excited by many things. My philosophy towards life is to embrace the unexpected and to venture into uncharted terrorities. I am always open to trying new hobbies and approaches.";

    useEffect(() => {
      let index = 0;

      const intervalId = setInterval(() => {
        if (index <= inputText.length) {
        setText(inputText.substring(0, index).replace(/\n/g, '<br />'));
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, 100);

      return () => {
        clearInterval(intervalId); // Cleanup on component unmount
      };
    }, [inputText]);

  return (
    <div>
      <Navbar items={NAVBARCONFIG} selectedItem={NavBarItemEnum.ABOUT} />
      <div className="about">
        <h1 className="typewriter-text" dangerouslySetInnerHTML={{ __html: text }}></h1>
      </div>
    </div>
  );
};