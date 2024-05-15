import React, { useState } from 'react';

// Generate unique ID for SVG gradients
let idCounter = 0;
const generateUniqueId = () => {
  idCounter += 1;
  return `star-gradient-${idCounter}`;
};

const StarRating = ({ rating, setRating, blocked, num_stars }) => {
  const [hover, setHover] = useState(null);

  const getStarFraction = (index) => {
    const value = hover !== null ? hover : rating;
    if (value <= index) return 0;
    if (value < index + 1) return value - index;
    return 1;
  };
  return (
    <div>
      {[...Array(num_stars)].map((star, i) => {
        const ratingValue = i + 1;
        const uniqueId = generateUniqueId(); // Generate a unique ID for each star

        return (
          <label key={i} className='star-label'>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => !blocked && setRating(ratingValue)}
              disabled={blocked}
              style={{ display: "none" }}
            />
            <FaStar
              className="star"
              fraction={getStarFraction(i)}
              onMouseEnter={() => !blocked && setHover(ratingValue)}
              onMouseLeave={() => !blocked && setHover(null)}
              uniqueId={uniqueId}
              style={{ cursor: blocked ? 'default' : 'pointer' }}
            />
          </label>
        );
      })}
    </div>
  );
};

const FaStar = ({ fraction, onMouseEnter, onMouseLeave, uniqueId, style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      viewBox="0 0 24 24"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    >
      <defs>
        <linearGradient id={uniqueId} x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset={`${fraction * 100}%`} style={{ stopColor: '#ffc107', stopOpacity: 1 }} />
          <stop offset={`${fraction * 100}%`} style={{ stopColor: '#e4e5e9', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${uniqueId})`}
        d="M12 2l2.29 7.45h7.71l-6 4.64 2.29 7.46-5.99-4.65-6 4.65 2.29-7.46-6-4.64h7.71z"
      />
    </svg>
  );
};

export default StarRating;