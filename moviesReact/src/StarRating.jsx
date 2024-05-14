import { useState } from 'react';

const StarRating = ({ rating, setRating, blocked, num_stars }) => {
    const [hover, setHover] = useState(null);
    
    return (
        <div>
        {[...Array(num_stars)].map((star, i) => {
            const ratingValue = i;
            
            return (
            <label key={i} className='star-label'>
                <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                disabled={blocked}
                style={{display: "none"}}
                />
                <FaStar
                className="star"
                // If blocked do not change color on hover
                color={blocked ? (ratingValue < rating ? "#ffc107" : "#e4e5e9") : (ratingValue < (hover || rating) ? "#ffc107" : "#e4e5e9")}
                size={ratingValue < rating ? Math.min(30, 30 * (rating-ratingValue)) : 30}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                style={{cursor: blocked ? "default" : "pointer"}}
                />
            </label>
            );
        })}
        </div>
    );
    }

const FaStar = ({ color, size, onMouseEnter, onMouseLeave }) => {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        >
        <path
            fill={color}
            d="M12 2l2.29 7.45h7.71l-6 4.64 2.29 7.46-5.99-4.65-6 4.65 2.29-7.46-6-4.64h7.71z"
        />
        </svg>
    );
}

export default StarRating;
