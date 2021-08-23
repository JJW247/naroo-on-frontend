import { FC } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo.svg';
import Search from '../../assets/images/Search.svg';
import User from '../../assets/images/User.svg';
import { useGetMe } from '../../hooks';

const Header: FC = () => {
  const { me } = useGetMe();
  const logoutHandler = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  return (
    <div className="h-20 font-semibold text-gray-300 font-noto">
      <div className="max-w-[1200px] h-full mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
          <div className="flex items-center ml-12">
            <Link to="/">
              <button>강의</button>
            </Link>
            <Link to="/review">
              <button className="ml-10">강의 리뷰</button>
            </Link>
            <Link to="/info">
              <button className="ml-10">소개</button>
            </Link>
            <button className="ml-10">문의하기</button>
            <button className="ml-[42px]">
              <img className="w-[20px] h-[20px]" src={Search} alt="Search" />
            </button>
          </div>
        </div>
        <div>
          {me && (
            <button
              className="flex items-center justify-center"
              onClick={logoutHandler}
            >
              <img className="mr-[4px]" src={User} alt="User" />
              로그아웃
            </button>
          )}
          {!me && (
            <>
              <Link to="/signin">
                <button className="bg-white font-[14px] font-semibold text-[#808695] border-[1px] border-[#DCDEE2] box-border rounded-[40px] w-[99px] h-[41px]">
                  로그인
                </button>
              </Link>
              <Link to="/signup">
                <button className="ml-[12px] font-[14px] font-semibold text-white bg-[#8DC556] rounded-[40px] w-[112px] h-[41px]">
                  회원가입
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
