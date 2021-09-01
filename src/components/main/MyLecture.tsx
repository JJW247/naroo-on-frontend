import { FC } from 'react';
import { SWRResponse } from 'swr';
import { ILectureInList } from '../../interfaces';
import LectureCard from '../lecture/LectureCard';

interface MyLectureProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  lectures: SWRResponse<ILectureInList[], any>;
  allLectures: SWRResponse<ILectureInList[], any>;
}

const MyLecture: FC<MyLectureProps> = ({
  token,
  setToken,
  lectures,
  allLectures,
}) => {
  console.log(lectures);
  return (
    <div className="2xl:max-w-[1520px] xl:max-w-[1140px] lg:max-w-[752px] md:max-w-[607px] sm:max-w-[506px] xs:max-w-[375px] mx-auto mt-[122px] pb-[96px]">
      {token && (
        <>
          <div className="text-2xl font-semibold text-gray-400">
            내가 신청한 강좌
          </div>
          <div className="mt-2 text-gray-300 mb-7">
            내가 신청한 강좌를 복습해보세요
          </div>
          {lectures && lectures.data && (
            <div className="grid grid-flow-row 2xl:grid-cols-4 2xl:gap-6 xl:grid-cols-3 xl:gap-6 lg:grid-cols-2 lg:gap-6 md:grid-cols-2 md:gap-3">
              {lectures.data.map((lecture) => {
                return (
                  <LectureCard
                    id={lecture.id}
                    title={lecture.title}
                    thumbnail={lecture.thumbnail}
                    nickname={lecture.nickname}
                    type={lecture.type}
                    status={lecture.status}
                    expired={lecture.expired}
                    tags={lecture.tags}
                    reviews={lecture.reviews}
                    average_rating={lecture.average_rating}
                  />
                );
              })}
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
        <div className="grid grid-flow-row 2xl:grid-cols-4 2xl:gap-6 xl:grid-cols-3 xl:gap-6 lg:grid-cols-2 lg:gap-6 md:grid-cols-2 md:gap-3">
          {allLectures.data.map((lecture) => {
            return (
              <LectureCard
                id={lecture.id}
                title={lecture.title}
                thumbnail={lecture.thumbnail}
                nickname={lecture.nickname}
                type={lecture.type}
                status={null}
                expired={lecture.expired}
                tags={lecture.tags}
                reviews={lecture.reviews}
                average_rating={lecture.average_rating}
              />
            );
          })}
        </div>
      )}
      {(!allLectures || !allLectures.data || allLectures.data.length === 0) && (
        <div className="text-center ">강좌가 존재하지 않습니다</div>
      )}
    </div>
  );
};

export default MyLecture;
