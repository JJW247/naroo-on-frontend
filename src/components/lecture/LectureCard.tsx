import { FC } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { ITags } from '../../interfaces';
import Tag from '../common/Tag';

interface LectureCardProps {
  id: string;
  title: string;
  thumbnail: string;
  teacherNickname: string;
  status: string | null;
  expired: string | null;
  tags: ITags[] | [] | null;
}

const LectureCard: FC<LectureCardProps> = ({
  id,
  title,
  thumbnail,
  teacherNickname,
  status,
  expired,
  tags,
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
        width="356px"
        height="261px"
        className="object-fill rounded-xl min-w-[356px] max-w-[356px] min-h-[261px] max-h-[261px]"
        src={thumbnail}
        alt="lecture"
      />
      <div className="mt-3 text-xs bg-white text-shuttle-gray">
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
      {tags && tags.length > 0 && (
        <Slider className="flex w-full" {...settings}>
          {tags.map((tag) => {
            return (
              <div className="max-w-max py-[5px]" key={tag.id}>
                <Tag name={tag.name} />
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
};

export default LectureCard;
