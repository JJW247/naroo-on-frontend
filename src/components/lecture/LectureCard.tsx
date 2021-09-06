import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ITags } from '../../interfaces';
import Star from '../common/Star';
import Tag from '../common/Tag';

interface LectureCardProps {
  id: string;
  title: string;
  thumbnail: string;
  nickname: string;
  type: string;
  status: string | null;
  expired: string | null;
  tags: ITags[] | [] | null;
  average_rating: string;
  reviews:
    | {
        created_at: string;
        id: string;
        nickname: string;
        review: string;
        rating: number;
      }[]
    | [];
}

const LectureCard: FC<LectureCardProps> = ({
  id,
  title,
  thumbnail,
  nickname,
  type,
  status,
  expired,
  tags,
  average_rating,
  reviews,
}) => {
  console.log(tags);
  return (
    <div className="w-[280px] h-[423px] justify-self-center">
      <img className="rounded-xl" src={thumbnail} alt="lecture" />
      <div className="mt-3 text-xs bg-white text-shuttle-gray">
        {type === 'online' ? '온라인' : type === 'offline' ? '오프라인' : ''}{' '}
        {status && ' / '}
        {status === 'accept'
          ? '승인 완료'
          : status === 'apply'
          ? '승인 대기'
          : ''}
      </div>
      <div className="mt-[10px] font-medium text-gray-400 bg-white h-11">
        <Link to={`/lecture/${id}`}>{title}</Link>
      </div>
      <div className="mb-1 text-xs bg-white text-shuttle-gray mt-[10px]">
        {nickname}
      </div>
      <Star width="16" rating={+average_rating} />
      {tags && tags.length > 0 && (
        <div className="flex mt-5">
          {tags.map((tag) => {
            return <Tag name={tag.name} />;
          })}
        </div>
      )}
    </div>
  );
};

export default LectureCard;
