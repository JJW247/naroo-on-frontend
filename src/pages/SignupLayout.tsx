import { FC, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useInput } from '../hooks';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

interface SignupLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const SignupLayout: FC<SignupLayoutProps> = ({ token, setToken }) => {
  const history = useHistory();
  useEffect(() => {
    setToken('');
  }, []);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [phone, onChangePhone] = useInput('');
  const [isAgreeEmail, setIsAgreeEmail] = useState<boolean>(false);
  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      if (password !== passwordCheck) {
        toast.error('패스워드가 일치하지 않습니다!');
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/auth/signup`,
        {
          email,
          password,
          nickname,
          phone,
          isAgreeEmail: isAgreeEmail ? 'true' : 'false',
        },
      );

      if (response.statusText === 'Created') {
        toast.success('발송된 메일을 통해 이메일 인증을 완료해주세요!');
        history.replace('/');
      }
    } catch (error: any) {
      console.error(error);
      const messages = error.response?.data?.message;
      if (Array.isArray(messages)) {
        messages.map((message) => {
          toast.error(message);
        });
      } else {
        toast.error(messages);
      }
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
          <label htmlFor="email">이메일</label>
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
        <input
          className="mr-[5px]"
          type="checkbox"
          checked={isAgreeEmail}
          onChange={(event) => setIsAgreeEmail(event.target.checked)}
        />
        마포런의 다양한 소식을 받아보시겠어요?
      </div>
    </form>
  );
};

export default SignupLayout;
