// StarRating.tsx
import React, { useState } from 'react';
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
    <RatingContainer>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
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
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

export default StarRating;