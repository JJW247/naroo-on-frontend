import { FC } from 'react';
import Slider from 'react-slick';
import { SWRResponse } from 'swr';
import { useGetSWR } from '../../hooks/api';
import { ILectureInList, IResourceContent } from '../../interfaces';
import LectureCard from '../lecture/LectureCard';

interface LectureCarouselProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const LectureCarousel: FC<LectureCarouselProps> = ({ token, setToken }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const allLectures = useGetSWR<ILectureInList[]>(
    `${process.env.REACT_APP_BACK_URL}/lecture/all`,
    null,
  );
  const lectures = useGetSWR<ILectureInList[]>(
    `${process.env.REACT_APP_BACK_URL}/lecture`,
    token,
  );
  return (
    <div className="2xl:max-w-[1520px] xl:max-w-[1140px] lg:max-w-[952px] md:max-w-[707px] sm:max-w-[556px] xs:max-w-[445px] mx-auto mt-[122px] pb-[96px]">
      {token && (
        <>
          <div className="text-2xl font-semibold text-gray-400">
            내가 신청한 강좌
          </div>
          <div className="mt-2 text-gray-300 mb-7">
            내가 신청한 강좌를 복습해보세요
          </div>
          {lectures && lectures.data && (
            <div className="lecture-carousel">
              <Slider {...settings}>
                {lectures.data.map((lecture) => {
                  return (
                    <LectureCard
                      id={lecture.id}
                      title={lecture.title}
                      thumbnail={lecture.thumbnail}
                      teacherId={lecture.teacher_id}
                      teacherNickname={lecture.teacher_nickname}
                      type={lecture.type}
                      status={lecture.status}
                      expired={lecture.expired}
                      tags={lecture.tags}
                      reviews={lecture.reviews}
                      average_rating={lecture.average_rating}
                    />
                  );
                })}
              </Slider>
            </div>
          )}
          {(!lectures || !lectures.data || lectures.data.length === 0) && (
            <div className="text-center ">강좌가 존재하지 않습니다</div>
          )}
        </>
      )}
      <div className=" mt-[122px] text-2xl font-semibold text-gray-400">
        모든 강좌
      </div>
      <div className="mt-2 text-gray-300 mb-7">
        완료 혹은 진행중인 전체 강좌를 살펴보세요
      </div>
      {allLectures && allLectures.data && (
        <div className="lecture-carousel">
          <Slider {...settings}>
            {allLectures.data.map((lecture) => {
              return (
                <LectureCard
                  id={lecture.id}
                  title={lecture.title}
                  thumbnail={lecture.thumbnail}
                  teacherId={lecture.teacher_id}
                  teacherNickname={lecture.teacher_nickname}
                  type={lecture.type}
                  status={null}
                  expired={lecture.expired}
                  tags={lecture.tags}
                  reviews={lecture.reviews}
                  average_rating={lecture.average_rating}
                />
              );
            })}
          </Slider>
        </div>
      )}
      {(!allLectures || !allLectures.data || allLectures.data.length === 0) && (
        <div className="text-center ">강좌가 존재하지 않습니다</div>
      )}
    </div>
  );
};

export default LectureCarousel;
