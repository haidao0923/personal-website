import React, { useEffect, useState } from 'react';
import "../css/rebus.css";
import {SimpleGrid} from '@mantine/core';
import word_list from  "../lists/word_list.txt";

interface RebusProps {
    numberOfColumns: number,
    category_count: number[];
}

const Rebus: React.FC<RebusProps> = ({numberOfColumns, category_count}) => {
    const [wordList, setWordList] = useState<string[] | null>([]);
    const [randomWord, setRandomWord] = useState<string | null>(null);
    const [randomSeed, setRandomSeed] = useState<number[]>([]);

    const [popupImage, setPopupImage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isPlayButtonHovered, setIsPlayButtonHovered] = useState(false);

    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [timer, setTimer] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [rebusScore, setRebusScore] = useState(0);
    const [rebusHighscore, setRebusHighscore] = useState(() => {
      // Load the high score from localStorage on component mount
      const storedHighscore = localStorage.getItem('rebusHighscore');
      return storedHighscore ? parseInt(storedHighscore, 10) : 0;
    });

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

        let newScore = rebusScore + 1;
        if (newScore > rebusHighscore) {
          setRebusHighscore(newScore)
        }
        setRebusScore(newScore);
        localStorage.setItem('rebusHighscore', String(rebusHighscore + 1));
        generateNewWord();
      } else {
        alert('Sorry, the entered word does not match the secret word.');
      }
      setUserInput('');
    };

    const openPopup = (imageSrc: string) => {
      setPopupImage(imageSrc);
      setShowPopup(true);
    };

    const closePopup = () => {
      setPopupImage('');
      setShowPopup(false);
    };

    const startRebus = async () => {
        let word = generateNewWord();
        setRebusScore(0);
        setTimer(30);

        const id = setInterval(() => {
          setTimer((prevSeconds) => {
            if (prevSeconds > 0) {
              return prevSeconds - 1;
            } else {
              setTimer(-1);
              clearInterval(id);
              return 0;
            }
          });
        }, 1000);

        setIntervalId(id);
    }

    const generateNewWord = () => {

        if (!wordList || wordList.length === 0) {
          // Handle the case where wordList is not yet initialized or is empty
          console.error("Word list is not yet available.");
          return null;
        }

        const randomIndex = Math.floor(Math.random() * wordList!.length);
        const newWord = wordList![randomIndex].toLowerCase().trim();
        setRandomWord(newWord);
        console.log(newWord);
        const newSeed: number[] = [];
        newWord.split('').forEach((letter, index) => (
            newSeed.push(Math.floor(Math.random() * category_count[newWord.charCodeAt(index) - 97]))
        ));
        console.log(newSeed);
        setRandomSeed(newSeed);
        return newWord;
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

    useEffect(() => {
      if (timer == -1) {
        alert(`Time's up! The word was ${randomWord}`);
        setTimer(0);
      }
    }, [timer]) // Timer is -1 when a game expires

    const gridStyle = {
        display: timer > 0 ? 'grid' : 'none',
        width: '80%',
        margin: 'auto',
        gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
        gap: '16px',
        placeItems: 'center', // Center both horizontally and vertically
      };

    return (
    <>
        <div className="rebus-group">
            <div className="play-prompt" >
                <button
                    className="play-button"
                    onClick={startRebus}
                    onMouseEnter={handlePlayButtonHover}
                    onMouseLeave={handlePlayButtonLeave}>Play re🚌?</button>
                <h3 className='score-text'>Highscore: {rebusHighscore}</h3>
                <p className="play-instruction" style={{ display: timer > 0 || isPlayButtonHovered ? 'block' : 'none'}}>
                  {'You will be shown a group of pictures from the gallery -> Quickly match the pictures to the corresponding letter of the alphabet to solve the word'}
                </p>
            </div>
            { randomWord && (<>
            <div className='grid' style={gridStyle}>
            {randomWord && randomSeed && randomWord.split('').map((letter, index) => (
                <img
                  key={index}
                  className='gridItem'
                  src={require(`../images/${letter.toUpperCase()}/${randomSeed[index]}.png`)}
                  onClick={() => openPopup(require(`../images/${letter.toUpperCase()}/${randomSeed[index]}.png`))}
                />
            ))}
            </div>
            <div className="rebus-answer-group" style={{display: timer > 0 ? '' : 'none'}}>
                <h2 className="rebus-answer-prompt">What is the secret word?</h2>
                <form onSubmit={handleFormSubmit}>
                    <input
                      id='rebus-answer-input'
                      className='rebus-answer-input'
                      type="text"
                      value={userInput}
                      onChange={handleInputChange}
                    />
                    <button className='rebus-submit-button' type='submit'>Submit</button>
                </form>
                <h3 className='timer-text'>Timer: {timer}</h3>
                <h3 className='score-text'>Score: {rebusScore}</h3>
            </div>
            </>
            )}
        </div>
        {showPopup && (
        <div className="popup" onClick={closePopup}>
          <div className="popup-content">
            <img className="popup-image" src={popupImage} alt="Full Size Image" />
          </div>
        </div>
        )}
    </>
    )
};

export default Rebus;