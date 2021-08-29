import { faStar as StarChecked } from '@fortawesome/free-solid-svg-icons';
import { faStar as StarUnchecked } from '@fortawesome/free-regular-svg-icons';
import { faStarHalf as StarHalfchecked } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

interface StarProps {
  width: string;
  rating: number;
}

const Star: FC<StarProps> = ({ width, rating }) => {
  const contents = () => {
    if (rating >= 0) {
      const stars = [];
      if (rating === 0) {
        stars.push(
          <>
            <FontAwesomeIcon
              className={`w-[${width}px] text-yellow my-auto`}
              icon={StarUnchecked}
            />
            <FontAwesomeIcon
              className={`w-[${width}px] text-yellow my-auto`}
              icon={StarUnchecked}
            />
            <FontAwesomeIcon
              className={`w-[${width}px] text-yellow my-auto`}
              icon={StarUnchecked}
            />
            <FontAwesomeIcon
              className={`w-[${width}px] text-yellow my-auto`}
              icon={StarUnchecked}
            />
            <FontAwesomeIcon
              className={`w-[${width}px] text-yellow my-auto`}
              icon={StarUnchecked}
            />
          </>,
        );
      } else {
        for (let i = 0; i < Math.floor(rating); i++) {
          stars.push(
            <FontAwesomeIcon
              className={`w-[${width}px] text-yellow my-auto`}
              icon={StarChecked}
            />,
          );
        }
        if (((5 - rating) * 2) % 2 === 1) {
          stars.push(
            <FontAwesomeIcon
              className={`w-[${width}px] text-yellow my-auto`}
              icon={StarHalfchecked}
            />,
          );
        }
        for (let i = 0; i < 5 - stars.length; i++) {
          stars.push(
            <FontAwesomeIcon
              className={`w-[${width}px] text-yellow my-auto`}
              icon={StarUnchecked}
            />,
          );
        }
      }
      stars.push(<span>({rating === 0 ? 0 : rating})</span>);
      return stars;
    } else {
      return <></>;
    }
  };
  return (
    <>
      {rating >= 0 && <div className="flex bg-transparent">{contents()}</div>}
    </>
  );
};

export default Star;
