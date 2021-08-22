import { FC } from 'react';
import { Link } from 'react-router-dom';

const Signin: FC = () => {
  return (
    <div className="mt-[177px] ml-[657px] mr-[656px] w-[607px]">
      <div className="text-[48px] font-semibold">로그인</div>
      <div className="mt-[67px] mb-[29px]">
        <div>
          <label className="text-[16px] leading-[22px]" htmlFor="email">
            이메일 또는 아이디 입력
          </label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="text"
        />
      </div>
      <div className="mb-[19px]">
        <div>
          <label htmlFor="password">비밀번호</label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="text"
        />
      </div>
      <div>
        <div className="float-left text-[12px] leading-[16px] flex items-center">
          <input className="mr-[5px]" type="checkbox" />
          자동 로그인
        </div>
        <div className="float-right text-[12px] leading-[16px]">
          비밀번호 찾기
        </div>
      </div>
      <button className="w-full h-[51px] mt-[19px] mb-[54px] text-[24px] font-semibold leading-[33px] bg-[#0D5B83] text-white">
        로그인
      </button>
      <div className="text-center text-[12px] leading-[16px] mb-[178px]">
        아직 계정이 없으신가요?{' '}
        <Link to="/signup">
          <b>회원가입</b>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
