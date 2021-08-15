import React, { FC } from 'react';
import Dummy from '../../assets/images/dummy-lecture.png';
import Star from './Star';
import Tags from './Tags';

const Card: FC = () => {
  return (
    <div className="card-container">
      <img className="rounded-xl" src={Dummy} alt="lecture" />
      <div className="bg-white h-11 mt-3 font-medium text-gray-400">
        안드로이드 앱 개발을 위한 실전 React Native 배우기
      </div>
      <div className="bg-white text-shuttle-gray mt-10px text-xs mb-1">
        강사명
      </div>
      <Star />
      <div className="mt-5">
        <Tags />
      </div>
    </div>
  );
};

export default Card;
