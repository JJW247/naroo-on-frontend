import { FC } from 'react';
import StarChecked from '../../assets/images/StarChecked.svg';
import StarHalfChecked from '../../assets/images/StarHalfChecked.svg';
import StarUnchecked from '../../assets/images/StarUnchecked.svg';

interface StarProps {
  width: string;
  rating: number;
}

const Star: FC<StarProps> = ({ width, rating }) => {
  const stars = [];
  let keyIndex = 0;
  if (rating >= 0) {
    if (rating === 0) {
      for (let i = 0; i < 5; i++) {
        stars.push(
          <img
            src={StarUnchecked}
            width={width}
            className={`text-yellow my-auto`}
          />,
        );
      }
    } else {
      for (let i = 0; i < (Math.floor(rating) * 10) / 10; i++) {
        stars.push(
          <img
            src={StarChecked}
            width={width}
            className={`text-yellow my-auto`}
          />,
        );
      }
      if ((rating * 10) % 10 !== 0) {
        stars.push(
          <img
            src={StarHalfChecked}
            width={width}
            className={`text-yellow my-auto`}
          />,
        );
      }
      for (let i = 0; i < 5 - Math.ceil(rating); i++) {
        stars.push(
          <img
            src={StarUnchecked}
            width={width}
            className={`text-yellow my-auto`}
          />,
        );
      }
    }
    stars.push(<span>({rating === 0 ? 0 : rating})</span>);
  }
  return (
    <div>
      {rating >= 0 && (
        <div className="flex items-center bg-transparent">
          {stars.length > 0 &&
            stars.map((star) => {
              return <div key={keyIndex++}>{star}</div>;
            })}
        </div>
      )}
    </div>
  );
};

export default Star;
