import { FC } from 'react';
import Cards from '../common/Cards';

const AdminLecture: FC = () => {
  return (
    // 임시 MB
    <div className="max-w-[1200px] mx-auto mt-[122px] pb-[96px]">
      <div className="text-2xl font-semibold text-gray-400">관리자 페이지</div>
      <div className="mt-2 text-gray-300 mb-7">편집 및 삭제</div>
      <Cards />
    </div>
  );
};

export default AdminLecture;
