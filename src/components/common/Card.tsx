import { FC } from 'react';
import { Link } from 'react-router-dom';
import Star from './Star';
import Tags from './Tags';

interface CardProps {
  title: string;
  thumbnail: string;
  teacherName: string;
}

const Card: FC<CardProps> = ({ title, thumbnail, teacherName }) => {
  return (
    <div className="card-container">
      <img className="rounded-xl" src={thumbnail} alt="lecture" />
      <div className="mt-3 font-medium text-gray-400 bg-white h-11">
        <Link to="/lecture/0">{title}</Link>
      </div>
      <div className="mb-1 text-xs bg-white text-shuttle-gray mt-10px">
        {teacherName}
      </div>
      <Star />
      <div className="mt-5">
        <Tags />
      </div>
    </div>
  );
};

export default Card;
