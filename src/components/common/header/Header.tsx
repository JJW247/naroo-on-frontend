import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { FC } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Search from '../../../assets/images/Search.svg';
import { useGetSWR } from '../../../hooks/api';
import { IResourceContent } from '../../../interfaces';
import Ellipsis from './Ellipsis';

interface HeaderProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  setRememberToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  nickname: string | null;
  userType: string | null;
}

const Header: FC<HeaderProps> = ({
  token,
  setToken,
  setRememberToken,
  nickname,
  userType,
}) => {
  const history = useHistory();
  const location = useLocation();
  const { data: headerLogo } = useGetSWR<IResourceContent[]>(
    `${process.env.REACT_APP_BACK_URL}/resource/header_logo`,
    null,
    false,
  );
  const logoutHandler = () => {
    setToken('');
    history.replace(history.location.pathname);
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
      <div className="2xl:max-w-full xl:max-w-[1200px] lg:max-w-[949px] md:max-w-[767px] md:flex hidden h-full mx-auto justify-center items-center">
        <div className="flex items-center">
          <Link to="/">
            {headerLogo && headerLogo.length > 0 ? (
              <img
                className="2xl:mr-[63px] xl:mr-[47px] lg:mr-[47px] md:mr-[40px] mr-[20px]"
                src={headerLogo[0].content}
                width="132"
                alt="Logo"
              />
            ) : (
              ''
            )}
          </Link>
          <div className="flex flex-nowrap">
            {((token && nickname && userType !== 'admin') || !token) && (
              <>
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
                {/* <Link to="/review">
                  <button
                    className={`mr-[46px] text-[18px] leading-[27px] font-semibold ${
                      location.pathname === '/review'
                        ? 'text-[#8DC556]'
                        : 'text-[#515A6E]'
                    }`}
                  >
                    강의 리뷰
                  </button>
                </Link> */}
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
              </>
            )}
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
              className="flex items-center justify-center 2xl:ml-[1100px] xl:ml-[800px] lg:ml-[550px] md:ml-[400px]"
              onClick={logoutHandler}
            >
              로그아웃
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between h-full mx-auto md:hidden">
        <div className="flex items-center w-full justify-evenly">
          <Link to="/">
            {headerLogo && headerLogo.length > 0 ? (
              <img src={headerLogo[0].content} width="132" alt="Logo" />
            ) : (
              ''
            )}
          </Link>
          {((token && nickname && userType !== 'admin') || !token) && (
            <>
              <button
                className="rounded-[1px] w-[200px]"
                onClick={() => setIsVisibleMenu(!isVisibleMenu)}
              >
                메뉴
              </button>
              {isVisibleMenu && (
                <div
                  ref={menuElementRef}
                  className="flex-none border-[1px] border-[#DCDEE2] box-border rounded-[10px] bg-white min-w-full absolute top-[100px] z-[999]"
                >
                  <Link to="/">
                    <button
                      className={`block w-full px-[10px] py-[10px] ${
                        location.pathname === '/'
                          ? 'text-[#8DC556]'
                          : 'text-[#515A6E]'
                      }`}
                    >
                      강의
                    </button>
                  </Link>
                  {/* <Link to="/review">
                    <button
                      className={`block w-full px-[10px] py-[10px]  ${
                        location.pathname === '/review'
                          ? 'text-[#8DC556]'
                          : 'text-[#515A6E]'
                      }`}
                    >
                      강의 리뷰
                    </button>
                  </Link> */}
                  <Link to="/info">
                    <button
                      className={`block w-full px-[10px] py-[10px]  ${
                        location.pathname === '/info'
                          ? 'text-[#8DC556]'
                          : 'text-[#515A6E]'
                      }`}
                    >
                      소개
                    </button>
                  </Link>
                  <button className="block w-full px-[10px] py-[10px]">
                    문의하기
                  </button>
                </div>
              )}
            </>
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
