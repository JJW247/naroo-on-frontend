import { CSSProperties, FC } from 'react';
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
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    variableWidth: true,
  };
  return (
    <div className="w-full md:w-[261px] min-h-[444px] max-h-[444px] mx-auto rounded-[8px] lecture-card-container">
      <Link
        to={`/lecture/${id}`}
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        <div
          className="rounded-t-[8px] w-full md:min-w-[261px] md:max-w-[261px] min-h-[261px] max-h-[261px] bg-cover lecture-card-container"
          style={{
            backgroundImage: `url(${thumbnail})`,
          }}
        />
      </Link>
      <div className="flex flex-wrap items-center w-full min-h-[183px] max-h-[183px] pt-[12px]">
        {status && (
          <div className="w-full px-[10px] text-[12px] text-[#808695]">
            {status === 'accept'
              ? '승인 완료'
              : status === 'apply'
              ? '승인 대기'
              : status === 'expired'
              ? '수강 만료'
              : ''}
          </div>
        )}
        <div className="w-full max-h-[48px] overflow-hidden px-[20px] text-[16px] font-semibold leading-[150%] text-[#17233D]">
          {title}
        </div>
        <div className="w-full px-[20px] font-medium text-[12px] leading-[150%] text-[#808695]">
          {teacherNickname}
        </div>
        {tags && tags.length > 0 && (
          <div
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          >
            <Slider
              className="flex w-full md:max-w-[261px] px-[20px] mb-[16px]"
              {...settings}
            >
              {tags.map((tag) => {
                return (
                  <div className="max-w-max py-[5px]" key={tag.id}>
                    <Tag name={tag.name} />
                  </div>
                );
              })}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureCard;
