import React, { FC } from 'react';
import Cards from '../common/Cards';

const MyLecture: FC = () => {
  return (
    // 임시 MB
    <div className="max-w-[1200px] mx-auto mt-[122px] pb-[96px]">
      <div className="font-semibold text-gray-400 text-2xl">
        내가 신청한 강좌
      </div>
      <div className="mt-2 mb-7 text-gray-300">
        내가 신청한 강좌를 복습해보세요
      </div>
      <Cards />
    </div>
  );
};

export default MyLecture;
