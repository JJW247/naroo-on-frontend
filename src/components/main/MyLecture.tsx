import { FC } from 'react';
import { SWRResponse } from 'swr';
import { ILectureInList } from '../../interfaces';
import Cards from '../common/Cards';

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
      <Cards token={token} setToken={setToken} lectures={lectures} />
      <div className=" mt-[122px] text-2xl font-semibold text-gray-400">
        모든 강좌
      </div>
      <div className="mt-2 text-gray-300 mb-7">
        완료 혹은 진행중인 전체 강좌를 살펴보세요
      </div>
      <Cards token={token} setToken={setToken} lectures={allLectures} />
    </div>
  );
};

export default MyLecture;
