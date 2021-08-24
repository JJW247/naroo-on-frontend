import { FC } from 'react';
import { Link } from 'react-router-dom';
import Dummy from '../../assets/images/dummy-lecture.png';
import Star from './Star';
import Tags from './Tags';

const Card: FC = () => {
  return (
    <div className="card-container">
      <img className="rounded-xl" src={Dummy} alt="lecture" />
      <div className="mt-3 font-medium text-gray-400 bg-white h-11">
        <Link to="/lecture/0">
          안드로이드 앱 개발을 위한 실전 React Native 배우기
        </Link>
      </div>
      <div className="mb-1 text-xs bg-white text-shuttle-gray mt-10px">
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
