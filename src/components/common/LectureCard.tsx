import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CONST_RATING_TYPE } from '../../interfaces';
import Star from './Star';
import Tags from './Tags';

interface LectureCardProps {
  title: string;
  thumbnail: string;
  nickname: string;
  type: string;
  status: string | null;
  expired: string | null;
}

const LectureCard: FC<LectureCardProps> = ({
  title,
  thumbnail,
  nickname,
  type,
  status,
  expired,
}) => {
  return (
    <div className="card-container">
      <img className="rounded-xl" src={thumbnail} alt="lecture" />
      <div className="mt-3 font-medium text-gray-400 bg-white h-11">
        <Link to="/lecture/0">{title}</Link>
      </div>
      <div className="mb-1 text-xs bg-white text-shuttle-gray mt-[10px]">
        {nickname}
      </div>
      <Star width="16" rating={CONST_RATING_TYPE.FIVE} />
      <div className="mt-5">
        <Tags />
      </div>
      {type && <div className="mt-5 text-center">{type}</div>}
      {status && <div className="mt-5 text-center">{status}</div>}
      {expired && <div className="mt-5 text-center">{expired}</div>}
    </div>
  );
};

export default LectureCard;
