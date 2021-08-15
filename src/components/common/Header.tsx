import React, { FC } from 'react';
import Logo from '../../assets/images/Logo.svg';
import User from '../../assets/images/User.svg';
import Search from '../../assets/images/Search.svg';

const Header: FC = () => {
  return (
    <div className="h-20 font-noto font-semibold text-gray-300">
      <div className="max-w-1200px h-full mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="-mt-1">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="ml-12">
            <button>강의</button>
            <button className="ml-10">멘토링</button>
            <button className="ml-10">소개</button>
            <button className="ml-10">문의하기</button>
          </div>
        </div>
        <div>
          <button>
            <img src={User} alt="User" />
          </button>
          <button>
            <img className="ml-5" src={Search} alt="Search" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
