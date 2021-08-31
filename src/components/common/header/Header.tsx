import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SWRResponse } from 'swr';
import Search from '../../../assets/images/Search.svg';
import { IResourceContent } from '../../../interfaces';
import Ellipsis from './Ellipsis';

interface HeaderProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  nickname: string | null;
  userType: string | null;
  headerLogo: SWRResponse<IResourceContent[], any>;
}

const Header: FC<HeaderProps> = ({
  token,
  setToken,
  nickname,
  userType,
  headerLogo,
}) => {
  const location = useLocation();
  console.log(location.pathname);
  const logoutHandler = () => {
    setToken(null);
    window.location.reload();
  };
  const [isVisibleEllipsis, setIsVisibleEllipsis] = useState<boolean>(false);
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);
  const menuElementRef = useRef<HTMLDivElement | null>(null);
  const menuPositionHandler = (event: any) => {
    if (
      isVisibleMenu &&
      (!menuElementRef.current || !menuElementRef.current !== event.target)
    ) {
      setIsVisibleMenu(false);
    }
  };
  const ellipsisElementRef = useRef<HTMLDivElement | null>(null);
  const ellipsisPositionHandler = (event: any) => {
    if (
      isVisibleEllipsis &&
      (!ellipsisElementRef.current ||
        !ellipsisElementRef.current !== event.target)
    ) {
      setIsVisibleEllipsis(false);
    }
  };
  useEffect(() => {
    window.addEventListener('click', menuPositionHandler);
    return () => window.removeEventListener('click', menuPositionHandler);
  }, [isVisibleMenu]);
  useEffect(() => {
    window.addEventListener('click', ellipsisPositionHandler);
    return () => window.removeEventListener('click', ellipsisPositionHandler);
  }, [isVisibleEllipsis]);
  return (
    <div className="h-[100px] font-semibold text-gray-300 font-noto">
      <div className="2xl:max-w-full xl:max-w-[1200px] lg:max-w-[949px] md:max-w-[767px] sm:hidden xs:hidden h-full flex mx-auto justify-center items-center">
        <div className="flex items-center">
          <Link to="/">
            <img
              className="2xl:mr-[63px] xl:mr-[47px] lg:mr-[47px] md:mr-[40px] mr-[20px]"
              src={
                headerLogo && headerLogo.data ? headerLogo.data[0].content : ''
              }
              width="132"
              alt="Logo"
            />
          </Link>
          <div className="flex flex-nowrap">
            <Link to="/">
              <button
                className={`mr-[40px] text-[18px] leading-[27px] font-semibold ${
                  location.pathname === '/'
                    ? 'text-[#8DC556]'
                    : 'text-[#515A6E]'
                }`}
              >
                강의
              </button>
            </Link>
            <Link to="/review">
              <button
                className={`mr-[46px] text-[18px] leading-[27px] font-semibold ${
                  location.pathname === '/review'
                    ? 'text-[#8DC556]'
                    : 'text-[#515A6E]'
                }`}
              >
                강의 리뷰
              </button>
            </Link>
            <Link to="/info">
              <button
                className={`mr-[40px] text-[18px] leading-[27px] font-semibold ${
                  location.pathname === '/info'
                    ? 'text-[#8DC556]'
                    : 'text-[#515A6E]'
                }`}
              >
                소개
              </button>
            </Link>
            <button className="mr-[42px] text-[18px] leading-[27px] font-semibold">
              문의하기
            </button>
            <button>
              <img src={Search} alt="Search" />
            </button>
          </div>
        </div>
        <div>
          {token && nickname && userType !== 'admin' && (
            <div
              className="2xl:ml-[701px] xl:ml-[526px] lg:ml-[280px] md:ml-[130px]"
              onMouseEnter={() => setIsVisibleEllipsis(true)}
              onMouseLeave={() => setIsVisibleEllipsis(false)}
            >
              <button className="rounded-full w-[40px] h-[40px] flex items-center justify-center bg-[#8dc556] leading-[150%] text-white font-semibold">
                {nickname.charAt(0)}
              </button>
              {isVisibleEllipsis && (
                <div className="fixed z-[999] min-w-max">
                  <Ellipsis
                    token={token}
                    setToken={setToken}
                    logoutHandler={logoutHandler}
                  />
                </div>
              )}
            </div>
          )}
          {!token && (
            <div className="2xl:ml-[457px] xl:ml-[343px] lg:ml-[180px] md:ml-[30px]">
              <Link to="/signin">
                <button className="bg-white font-[14px] leading-[21px] font-semibold text-[#808695] border-[1px] border-[#DCDEE2] box-border rounded-[40px] h-[41px] 2xl:w-[99px] xl:w-[99px] lg:w-[80px] md:w-[60px]">
                  로그인
                </button>
              </Link>
              <Link to="/signup">
                <button className="ml-[12px] font-[14px] leading-[21px] font-semibold text-white bg-[#8DC556] rounded-[40px] h-[41px] 2xl:w-[112px] xl:w-[112px] lg:w-[90px] md:w-[70px]">
                  회원가입
                </button>
              </Link>
            </div>
          )}
          {token && nickname && userType === 'admin' && (
            <button
              className="flex items-center justify-center"
              onClick={logoutHandler}
            >
              로그아웃
            </button>
          )}
        </div>
      </div>
      <div className="items-center justify-between h-full mx-auto 2xl:hidden xl:hidden lg:hidden md:hidden sm:flex xs:flex">
        <div className="flex items-center w-full justify-evenly">
          <Link to="/">
            <img
              src={
                headerLogo && headerLogo.data ? headerLogo.data[0].content : ''
              }
              width="132"
              alt="Logo"
            />
          </Link>
          <button
            className="rounded-[1px] w-[200px]"
            onClick={() => setIsVisibleMenu(!isVisibleMenu)}
          >
            메뉴
          </button>
          {isVisibleMenu && (
            <div
              ref={menuElementRef}
              className="flex-none border-[1px] border-[#DCDEE2] box-border rounded-[10px] bg-white min-w-max absolute top-[8%] left-[49%] z-[999]"
            >
              <Link to="/">
                <button
                  className={`block px-[10px] py-[10px]  ${
                    location.pathname === '/'
                      ? 'text-[#8DC556]'
                      : 'text-[#515A6E]'
                  }`}
                >
                  강의
                </button>
              </Link>
              <Link to="/review">
                <button
                  className={`block px-[10px] py-[10px]  ${
                    location.pathname === '/review'
                      ? 'text-[#8DC556]'
                      : 'text-[#515A6E]'
                  }`}
                >
                  강의 리뷰
                </button>
              </Link>
              <Link to="/info">
                <button
                  className={`block px-[10px] py-[10px]  ${
                    location.pathname === '/info'
                      ? 'text-[#8DC556]'
                      : 'text-[#515A6E]'
                  }`}
                >
                  소개
                </button>
              </Link>
              <Link to="/">
                <button className="block px-[10px] py-[10px]">문의하기</button>
              </Link>
            </div>
          )}
          {token && nickname && userType !== 'admin' && (
            <div>
              <button
                className="rounded-full w-[40px] h-[40px] flex items-center justify-center bg-[#8dc556] leading-[150%] text-white font-semibold"
                onClick={() => setIsVisibleEllipsis(!isVisibleEllipsis)}
              >
                {nickname.charAt(0)}
              </button>
              {isVisibleEllipsis && (
                <div
                  ref={ellipsisElementRef}
                  className="fixed z-[999] min-w-max"
                >
                  <Ellipsis
                    token={token}
                    setToken={setToken}
                    logoutHandler={logoutHandler}
                  />
                </div>
              )}
            </div>
          )}
          {!token && (
            <div>
              <Link to="/signin">
                <button className="bg-white font-[10px] leading-[10px] font-semibold text-[#808695] border-[1px] border-[#DCDEE2] box-border rounded-[40px] w-[60px] h-[41px]">
                  로그인
                </button>
              </Link>
              <Link to="/signup">
                <button className="ml-[12px] font-[10px] leading-[10px] font-semibold text-white bg-[#8DC556] rounded-[40px] w-[70px] h-[41px]">
                  회원가입
                </button>
              </Link>
            </div>
          )}
          {token && nickname && userType === 'admin' && (
            <button
              className="flex items-center justify-center"
              onClick={logoutHandler}
            >
              로그아웃
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
