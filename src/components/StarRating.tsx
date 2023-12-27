import React, { useState } from 'react';
import "../css/contact.css"
import styled from 'styled-components';

interface StarRatingProps {
  onChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ onChange }) => {
  const [rating, setRating] = useState<number>(0);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
    onChange(selectedRating);
  };

  return (
    <RatingContainer className='rating'>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className="star"
          onClick={() => handleStarClick(star)}
          filled={star <= rating}
          src={star <= rating ? require('../images/filled-star.png') : require('../images/empty-star.png')}
          alt={`Star ${star}`}
        />
      ))}
    </RatingContainer>
  );
};

const RatingContainer = styled.div`
  display: flex;
`;

interface StarProps {
  filled: boolean;
}

const Star = styled.img<StarProps>`
  max-width: 50px;
  height: auto;
  align-items: center;
  cursor: pointer;
`;

export default StarRating;