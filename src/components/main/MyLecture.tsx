import { FC } from 'react';
import { SWRResponse } from 'swr';
import { ILectureInList } from '../../interfaces';
import LectureCard from '../common/LectureCard';

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
  return (
    // 임시 MB
    <div className="max-w-[1200px] mx-auto mt-[122px] pb-[96px]">
      <div className="text-2xl font-semibold text-gray-400">
        내가 신청한 강좌
      </div>
      <div className="mt-2 text-gray-300 mb-7">
        내가 신청한 강좌를 복습해보세요
      </div>
      {lectures && lectures.data && (
        <div className="grid grid-flow-row grid-cols-4 gap-6">
          {lectures.data.map((lecture) => {
            return (
              <LectureCard
                title={lecture.title}
                thumbnail={lecture.thumbnail}
                nickname={lecture.nickname}
                type={lecture.type}
                status={lecture.status}
                expired={lecture.expired}
              />
            );
          })}
        </div>
      )}
      {(!lectures || !lectures.data) && (
        <div className="text-center ">강좌가 존재하지 않습니다</div>
      )}
      <div className=" mt-[122px] text-2xl font-semibold text-gray-400">
        모든 강좌
      </div>
      <div className="mt-2 text-gray-300 mb-7">
        완료 혹은 진행중인 전체 강좌를 살펴보세요
      </div>
      {allLectures && allLectures.data && (
        <div className="grid grid-flow-row grid-cols-4 gap-6">
          {allLectures.data.map((lecture) => {
            return (
              <LectureCard
                title={lecture.title}
                thumbnail={lecture.thumbnail}
                nickname={lecture.nickname}
                type={lecture.type}
                status={null}
                expired={lecture.expired}
              />
            );
          })}
        </div>
      )}
      {(!allLectures || !allLectures.data) && (
        <div className="text-center ">강좌가 존재하지 않습니다</div>
      )}
    </div>
  );
};

export default MyLecture;
