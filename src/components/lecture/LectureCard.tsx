import { FC } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { ITags } from '../../interfaces';
import Star from '../common/Star';
import Tag from '../common/Tag';

interface LectureCardProps {
  id: string;
  title: string;
  thumbnail: string;
  teacherId: string;
  teacherNickname: string;
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
  teacherId,
  teacherNickname,
  type,
  status,
  expired,
  tags,
  average_rating,
  reviews,
}) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    variableWidth: true,
  };
  return (
    <div className="w-full min-h-[443.5px] max-h-[443.5px] justify-self-center pr-[24px]">
      <img
        height="443.5px"
        className="object-none rounded-xl"
        src={thumbnail}
        alt="lecture"
      />
      <div className="mt-3 text-xs bg-white text-shuttle-gray">
        {/* {type === 'online' ? '온라인' : type === 'offline' ? '오프라인' : ''}{' '}
        {status && ' / '} */}
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
        {teacherNickname}
      </div>
      {/* <Star width="16" rating={+average_rating} /> */}
      {tags && tags.length > 0 && (
        // <div className="flex flex-wrap justify-start mt-5">
        <Slider className="flex w-full" {...settings}>
          {tags.map((tag) => {
            return (
              <div className="max-w-max py-[5px]" key={tag.id}>
                <Tag name={tag.name} />
              </div>
            );
          })}
        </Slider>
        // </div>
      )}
    </div>
  );
};

export default LectureCard;
