import { FC } from 'react';
import Cards from '../common/Cards';

interface MyLectureProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const MyLecture: FC<MyLectureProps> = ({ token, setToken }) => {
  return (
    // 임시 MB
    <div className="max-w-[1200px] mx-auto mt-[122px] pb-[96px]">
      <div className="text-2xl font-semibold text-gray-400">
        내가 신청한 강좌
      </div>
      <div className="mt-2 text-gray-300 mb-7">
        내가 신청한 강좌를 복습해보세요
      </div>
      <Cards token={token} setToken={setToken} />
    </div>
  );
};

export default MyLecture;
