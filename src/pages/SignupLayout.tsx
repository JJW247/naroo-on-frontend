import { FC, FormEvent } from 'react';
import axios from 'axios';
import { useInput } from '../hooks';
import { useEffect } from 'react';

interface SignupLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const SignupLayout: FC<SignupLayoutProps> = ({ token, setToken }) => {
  useEffect(() => {
    setToken(null);
  }, []);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [phone, onChangePhone] = useInput('');
  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      if (password !== passwordCheck) {
        throw new Error('패스워드가 일치하지 않습니다!');
      }

      event.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/auth/signup`,
        {
          email,
          password,
          nickname,
          phone,
        },
      );

      if (response.statusText === 'Created') {
        setToken(response.data.token);
        window.location.replace('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="mt-[47px] 2xl:max-w-[900px] xl:max-w-[750px] lg:max-w-[600px] md:max-w-[500px] sm:max-w-[400px] xs:max-w-[350px] mx-auto pb-[96px]"
      onSubmit={onSubmitHandler}
    >
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
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="password">비밀번호</label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="password-valid">비밀번호 확인</label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="password"
          value={passwordCheck}
          onChange={onChangePasswordCheck}
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="nickname">이름</label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="text"
          value={nickname}
          onChange={onChangeNickname}
        />
      </div>
      <div className="mb-[19px]">
        <div>
          <label htmlFor="phone">휴대폰 번호</label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="text"
          value={phone}
          onChange={onChangePhone}
        />
      </div>
      <input
        type="submit"
        className="w-full h-[51px] text-[24px] font-semibold leading-[33px] bg-[#0D5B83] text-white mb-[12px]"
        value="가입하기"
      />
      <div className="mb-[4px] text-[12px] leading-[16px] text-center">
        가입 시, 마포런의 이용약관, 개인정보취급방침에 동의합니다.
      </div>
      <div className="mb-[47px] text-[12px] leading-[16px] flex justify-center items-center">
        <input className="mr-[5px]" type="checkbox" />
        마포런의 다양한 소식을 받아보시겠어요?
      </div>
    </form>
  );
};

export default SignupLayout;
