import { FC } from 'react';

import StarChecked from '../../assets/images/star-checked.svg';

interface StarProps {
  width: string;
  rating: number;
}

const Star: FC<StarProps> = ({ width, rating }) => {
  const contents = () => {
    if (rating > 0) {
      const stars = [];
      for (let i = 0; i < rating; i++) {
        stars.push(<img width={+width} src={StarChecked} alt="star-checked" />);
      }
      stars.push(<span>({rating})</span>);
      return stars;
    } else {
      return <></>;
    }
  };
  return (
    <>{rating > 0 && <div className="flex bg-transparent">{contents()}</div>}</>
  );
};

export default Star;
