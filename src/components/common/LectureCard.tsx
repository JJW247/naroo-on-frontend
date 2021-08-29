import { FC } from 'react';
import { Link } from 'react-router-dom';
import Star from './Star';
import Tag from './Tag';
import _ from 'lodash';

interface LectureCardProps {
  id: string;
  title: string;
  thumbnail: string;
  nickname: string;
  type: string;
  status: string | null;
  expired: string | null;
  tags: string[];
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
  reviews,
}) => {
  const filteredReviews = reviews ? [...reviews] : [];
  _.each(filteredReviews, (review) => _.update(review, 'rating', _.parseInt));
  const totalRating =
    !filteredReviews || filteredReviews.length === 0
      ? 0
      : Math.round(
          (_.sumBy(['rating'], _.partial(_.sumBy, filteredReviews)) /
            filteredReviews.length) *
            2,
        ) / 2;
  return (
    <div className="w-[280px] h-[423px] justify-self-center">
      <img className="rounded-xl" src={thumbnail} alt="lecture" />
      <div className="mt-3 font-medium text-gray-400 bg-white h-11">
        <Link to={`/lecture/${id}`}>{title}</Link>
      </div>
      <div className="mb-1 text-xs bg-white text-shuttle-gray mt-[10px]">
        {nickname}
      </div>
      <Star width="16" rating={+totalRating} />
      {tags && tags.length > 0 && (
        <div className="mt-5 flex">
          {tags.map((tagName) => {
            return <Tag name={tagName} />;
          })}
        </div>
      )}
      {type && <div className="mt-5 text-center">{type}</div>}
      {status && <div className="mt-5 text-center">{status}</div>}
      {expired && <div className="mt-5 text-center">{expired}</div>}
    </div>
  );
};

export default LectureCard;
