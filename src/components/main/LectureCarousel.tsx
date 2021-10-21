import { isArray } from 'lodash';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import Slider from 'react-slick';
import { useGetSWR } from '../../hooks/api';
import { ILectureInList } from '../../interfaces';
import LectureCard from '../lecture/LectureCard';

interface LectureCarouselProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const LectureCarousel: FC<LectureCarouselProps> = ({ token, setToken }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
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
  const { data: allLecturesData } = useGetSWR<ILectureInList[]>(
    `${process.env.REACT_APP_BACK_URL}/lecture/all`,
    null,
    false,
  );
  const { data: userLecturesData } = useGetSWR<ILectureInList[]>(
    `${process.env.REACT_APP_BACK_URL}/lecture`,
    token,
    false,
  );
  return (
    <div className="xl:max-w-[1152px] lg:max-w-[864px] md:max-w-[680px] sm:max-w-[500px] xs:max-w-[400px] mx-auto mt-[122px] pb-[96px]">
      {token && (
        <>
          <div className="text-2xl font-semibold text-gray-400">
            내가 신청한 강좌
            {userLecturesData && userLecturesData.length >= 0
              ? ` (${userLecturesData.length})`
              : ''}
          </div>
          <div className="mt-2 text-gray-300 mb-7">
            내가 신청한 강좌를 복습해보세요
          </div>
          {userLecturesData &&
          isArray(userLecturesData) &&
          userLecturesData.length > 0 ? (
            <div className="mx-[24px]">
              <Slider {...settings}>
                {userLecturesData.map((lecture) => {
                  return (
                    <LectureCard
                      key={lecture.id}
                      id={lecture.id}
                      title={lecture.title}
                      thumbnail={lecture.thumbnail}
                      teacherNickname={lecture.teacher_nickname}
                      status={lecture.status}
                      expired={lecture.expired}
                      tags={lecture.tags}
                    />
                  );
                })}
              </Slider>
            </div>
          ) : isArray(userLecturesData) && userLecturesData.length === 0 ? (
            <div className="flex w-full h-[300px] justify-center items-center">
              신청한 강좌가 존재하지 않습니다!
            </div>
          ) : (
            <Skeleton className="w-full h-[300px]" />
          )}
        </>
      )}
      <div className="mt-[122px] text-2xl font-semibold text-gray-400">
        모든 강좌
        {allLecturesData && allLecturesData.length >= 0
          ? ` (${allLecturesData.length})`
          : ''}
      </div>
      <div className="mt-2 text-gray-300 mb-7">
        완료 혹은 진행중인 전체 강좌를 살펴보세요
      </div>
      {allLecturesData &&
      isArray(allLecturesData) &&
      allLecturesData.length > 0 ? (
        <div className="mx-[24px]">
          <Slider {...settings}>
            {allLecturesData.map((lecture) => {
              return (
                <LectureCard
                  key={lecture.id}
                  id={lecture.id}
                  title={lecture.title}
                  thumbnail={lecture.thumbnail}
                  teacherNickname={lecture.teacher_nickname}
                  status={null}
                  expired={lecture.expired}
                  tags={lecture.tags}
                />
              );
            })}
          </Slider>
        </div>
      ) : allLecturesData &&
        isArray(allLecturesData) &&
        allLecturesData.length === 0 ? (
        <div className="flex w-full h-[300px] justify-center items-center">
          강좌가 존재하지 않습니다!
        </div>
      ) : (
        <Skeleton className="w-full h-[300px]" />
      )}
    </div>
  );
};

export default LectureCarousel;
