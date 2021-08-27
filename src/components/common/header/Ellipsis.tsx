import { FC } from 'react';
import { useHistory } from 'react-router-dom';

interface EllipsisProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  logoutHandler: () => void;
}

const Ellipsis: FC<EllipsisProps> = ({ token, setToken, logoutHandler }) => {
  return (
    <div className="shadow-inner dropdown">
      <div className="dropdown-arrow" />
      <button className="block px-[10px] py-[10px]">개인 정보 수정</button>
      <button className="block px-[10px] py-[10px]">신청 중인 강좌</button>
      <button className="block px-[10px] py-[10px]" onClick={logoutHandler}>
        로그아웃
      </button>
    </div>
  );
};

export default Ellipsis;
