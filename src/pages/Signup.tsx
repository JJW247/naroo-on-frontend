import { FC } from 'react';

const Signup: FC = () => {
  return (
    <div className="mt-[47px] ml-[657px] mr-[656px] w-[607px]">
      <div className="text-[48px] font-semibold">회원가입</div>
      <div className="mt-[67px] mb-[29px]">
        <div>
          <label className="text-[16px] leading-[22px]" htmlFor="email">
            이메일
          </label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="text"
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="email-valid">이메일 확인</label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="text"
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="password">비밀번호</label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="text"
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="password-valid">비밀번호 확인</label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="text"
        />
      </div>
      <div className="mb-[19px]">
        <div>
          <label htmlFor="phone">휴대폰 번호</label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="text"
        />
      </div>
      <button className="w-full h-[51px] text-[24px] font-semibold leading-[33px] bg-[#0D5B83] text-white mb-[12px]">
        가입하기
      </button>
      <div className="mb-[4px] text-[12px] leading-[16px] text-center">
        가입 시, 마포런의 이용약관, 개인정보취급방침에 동의합니다.
      </div>
      <div className="mb-[47px] text-[12px] leading-[16px] flex justify-center items-center">
        <input className="mr-[5px]" type="checkbox" />
        마포런의 다양한 소식을 받아보시겠어요?
      </div>
    </div>
  );
};

export default Signup;
