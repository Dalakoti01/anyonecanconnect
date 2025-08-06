import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({ rating , className = ""  }) => {
  const totalStars = 5;
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    if (rating >= i) {
      // Full Star
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (rating >= i - 0.5) {
      // Half Star
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    } else {
      // Empty Star
      stars.push(<FaRegStar key={i} className="text-gray-400" />);
    }
  }

  return <div className={`flex ${className}`}>{stars}</div>;
};

export default RatingStars;
