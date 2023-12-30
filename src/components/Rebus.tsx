import React, { useEffect, useState } from 'react';
import "../css/rebus.css";
import {SimpleGrid} from '@mantine/core';
import word_list from  "../lists/word_list.txt";

interface RebusProps {
    numberOfColumns: number;
  }

const Rebus: React.FC<RebusProps> = ({numberOfColumns}) => {
    const [wordList, setWordList] = useState<string[] | null>([]);
    const [randomWord, setRandomWord] = useState<string | null>(null);

    const [isPlayButtonHovered, setIsPlayButtonHovered] = useState(false);

    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [timer, setTimer] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [rebusScore, setRebusScore] = useState(0);
    const [rebusHighscore, setRebusHighscore] = useState(0);


    const handlePlayButtonHover = () => {
        setIsPlayButtonHovered(true);
    };

    const handlePlayButtonLeave = () => {
      setIsPlayButtonHovered(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserInput(event.target.value);
      console.log(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (userInput.trim().toLowerCase() == randomWord) {
        alert('Congratulations! You guessed the word correctly.');
      } else {
        alert('Sorry, the entered word does not match the secret word.');
      }
      setUserInput('');
    };

    const fetchRandomWord = async () => {
        try {
          const randomIndex = Math.floor(Math.random() * wordList!.length);
          setRandomWord(wordList![randomIndex]?.toLowerCase().trim());
          console.log(wordList![randomIndex]);
          const id = setInterval(() => {
            setTimer((prevSeconds) => {
              if (prevSeconds > 0) {
                return prevSeconds - 1;
              } else {
                clearInterval(id);
                return 0;
              }
            });
          }, 1000);

          setIntervalId(id);

        } catch (error) {
          console.error("Error fetching random word:", error);
        }
        setRebusScore(0);
        setTimer(30);
      };

    useEffect(() => {
    fetch(word_list)
    .then((response) => response.text())
    .then((textContent) => {
        setWordList(textContent.split('\n'));
    })
    }, [])

    useEffect(() => {
        // Clear the interval when the component unmounts
        return () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        };
    }, [intervalId]);

    const gridStyle = {
        display: timer > 0 ? 'grid' : 'none',
        width: '80%',
        margin: 'auto',
        gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
        gap: '16px',
        placeItems: 'center', // Center both horizontally and vertically
      };

    return (
    <div className="rebus-group">
        <div className="play-prompt" >
            <button
                className="play-button"
                onClick={fetchRandomWord}
                onMouseEnter={handlePlayButtonHover}
                onMouseLeave={handlePlayButtonLeave}>Play re🚌?</button>
            <h3 className='score-text'>Score: {rebusHighscore}</h3>
            <p className="play-instruction" style={{ display: timer > 0 || isPlayButtonHovered ? 'block' : 'none'}}>
              {'You will be shown a group of pictures from the gallery -> Quickly match the pictures to the corresponding letter of the alphabet to solve the word'}
            </p>
        </div>
        <div className='grid' style={gridStyle}>
            <img className='gridItem' src={require(`../images/A/0.png`)} />
            <img className='gridItem' src={require(`../images/A/0.png`)} />
            <img className='gridItem' src={require(`../images/A/0.png`)} />
            <img className='gridItem' src={require(`../images/A/0.png`)} />
            <img className='gridItem' src={require(`../images/A/0.png`)} />
            <img className='gridItem' src={require(`../images/A/0.png`)} />
            <img className='gridItem' src={require(`../images/A/0.png`)} />
            <img className='gridItem' src={require(`../images/A/0.png`)} />
        </div>
        <div className="rebus-answer-group" style={{display: timer > 0 ? '' : 'none'}}>
            <h2 className="rebus-answer-prompt">What is the secret word?</h2>
            <input
              id='rebus-answer-input'
              className='rebus-answer-input'
              type="text"
              value={userInput}
              onChange={handleInputChange}
            />
            <button className='rebus-submit-button' onClick={handleFormSubmit}>Submit</button>
            <h3 className='timer-text'>Timer: {timer}</h3>
            <h3 className='score-text'>Score: {rebusScore}</h3>
        </div>
    </div>
    )
};

export default Rebus;