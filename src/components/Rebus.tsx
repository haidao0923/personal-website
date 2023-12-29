import React, { useEffect, useState } from 'react';
import "../css/rebus.css";
import {SimpleGrid} from '@mantine/core';
import word_list from  "../lists/word_list.txt";

interface RebusProps {
    numberOfColumns: number;
  }

const Rebus: React.FC<RebusProps> = ({numberOfColumns}) => {
    const [seconds, setSeconds] = useState(0);
    const [randomWord, setRandomWord] = useState<string | null>(null);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [isPlayButtonHovered, setIsPlayButtonHovered] = useState(false);
    const [wordList, setWordList] = useState<string[] | null>([]);

    const handlePlayButtonHover = () => {
        setIsPlayButtonHovered(true);
      };

      const handlePlayButtonLeave = () => {
        setIsPlayButtonHovered(false);
      };

    const fetchRandomWord = async () => {
        try {
          const randomIndex = Math.floor(Math.random() * wordList!.length);
          setRandomWord(wordList![randomIndex]);
          console.log(wordList![randomIndex]);
          const id = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
          }, 1000);

          setIntervalId(id);

        } catch (error) {
          console.error("Error fetching random word:", error);
        }

        setSeconds(1);
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
        display: 'grid',
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
            <p className="play-instruction" style={{ display: seconds > 0 || isPlayButtonHovered ? 'block' : 'none'}}>{'You will be shown a group of pictures from the gallery -> Quickly match the pictures to the corresponding letter of the alphabet to solve the word'}</p>
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
        <div className="rebus-answer-group">
            <h2 className="rebus-answer-prompt">What is the secret word?</h2>
            <input className='rebus-answer-input'></input>
            <button className='rebus-submit-button'>Submit</button>
            <h1 className='timer'>Timer: {seconds}</h1>
        </div>
    </div>
    )
};

export default Rebus;