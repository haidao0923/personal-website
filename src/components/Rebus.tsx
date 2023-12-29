import React, { useEffect, useState } from 'react';
import "../css/rebus.css";
import {SimpleGrid} from '@mantine/core';

interface RebusProps {
    numberOfColumns: number;
  }

const Rebus: React.FC<RebusProps> = ({numberOfColumns}) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures that the effect runs only once on mount

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
        gap: '16px',
        placeItems: 'center', // Center both horizontally and vertically
      };

    return (
    <div className="rebus-group">
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