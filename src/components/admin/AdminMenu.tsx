import { FC } from 'react';

const AdminMenu: FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="border-4 rounded mr-[8vw] p-[10px] text-xl min-w-max">
        강의 추가
      </div>
      <div className="border-4 rounded mr-[8vw] p-[10px] text-xl min-w-max">
        강의 관리
      </div>
      <div className="border-4 rounded mr-[8vw] p-[10px] text-xl min-w-max">
        강의 승인
      </div>
      <div className="border-4 rounded mr-[8vw] p-[10px] text-xl min-w-max">
        강사 관리
      </div>
      <div className="border-4 rounded mr-[8vw] p-[10px] text-xl min-w-max">
        학생 관리
      </div>
      <div className="border-4 rounded p-[10px] text-xl min-w-max">
        태그 관리
      </div>
    </div>
  );
};

export default AdminMenu;
