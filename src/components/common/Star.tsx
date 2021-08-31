import { FC } from 'react';
import StarChecked from '../../assets/images/StarChecked.svg';
import StarHalfChecked from '../../assets/images/StarHalfChecked.svg';
import StarUnchecked from '../../assets/images/StarUnchecked.svg';

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
            <img
              src={StarUnchecked}
              width={width}
              className={`text-yellow my-auto`}
            />
            <img
              src={StarUnchecked}
              width={width}
              className={`text-yellow my-auto`}
            />
            <img
              src={StarUnchecked}
              width={width}
              className={`text-yellow my-auto`}
            />
            <img
              src={StarUnchecked}
              width={width}
              className={`text-yellow my-auto`}
            />
            <img
              src={StarUnchecked}
              width={width}
              className={`text-yellow my-auto`}
            />
          </>,
        );
      } else {
        // for (let i = 0; i < Math.floor(rating); i++) {
        //   stars.push(
        //     <img
        //       src={StarChecked}
        //       width={width}
        //       className={`text-yellow my-auto`}
        //     />,
        //   );
        // }
        // if(Math.round(rating - Math.floor(rating)) === 1) {
        //   stars.push(
        //     <img
        //       src={StarHalfChecked}
        //       width={width}
        //       className={`text-yellow my-auto`}
        //     />,
        //   );
        // }
        // if((5 - Math.ceil()))
        // if (((5 - rating) * 2) % 2 === 1) {
        //   stars.push(
        //     <img
        //       src={StarHalfChecked}
        //       width={width}
        //       className={`text-yellow my-auto`}
        //     />,
        //   );
        // }
        // for (let i = 0; i < 5 - stars.length; i++) {
        //   stars.push(
        //     <img
        //       src={StarUnchecked}
        //       width={width}
        //       className={`text-yellow my-auto`}
        //     />,
        //   );
        // }
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
      return stars;
    } else {
      return <></>;
    }
  };
  return (
    <>
      {rating >= 0 && (
        <div className="flex items-center bg-transparent">{contents()}</div>
      )}
    </>
  );
};

export default Star;
