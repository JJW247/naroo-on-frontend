import { FC } from 'react';
import axios from 'axios';
import { FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useInput } from '../hooks';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

interface SigninLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  rememberToken: string | null;
  setRememberToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const SigninLayout: FC<SigninLayoutProps> = ({
  token,
  setToken,
  rememberToken,
  setRememberToken,
}) => {
  const history = useHistory();
  useEffect(() => {
    setToken('');
    localStorage.setItem('token', '');
  }, []);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/user/signin`,
        {
          email,
          password,
        },
      );

      if (response.statusText === 'Created') {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
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
      className="mt-[177px] 2xl:max-w-[900px] xl:max-w-[750px] lg:max-w-[600px] md:max-w-[500px] sm:max-w-[400px] xs:max-w-[350px] mx-auto pb-[96px]"
      onSubmit={onSubmitHandler}
    >
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
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="mb-[19px]">
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
      <div>
        <div className="float-left text-[12px] leading-[16px] flex items-center">
          <input
            className="mr-[5px]"
            type="checkbox"
            checked={rememberToken === 'true' ? true : false}
            onChange={(event) =>
              setRememberToken(event.target.checked ? 'true' : 'false')
            }
          />
          자동 로그인
        </div>
        <div className="float-right text-[12px] leading-[16px]">
          비밀번호 재설정
        </div>
      </div>
      <input
        type="submit"
        className="w-full h-[51px] mt-[19px] mb-[54px] text-[24px] font-semibold leading-[33px] bg-[#0D5B83] text-white"
        value="로그인"
      />
      <div className="text-center text-[12px] leading-[16px] mb-[178px]">
        아직 계정이 없으신가요?{' '}
        <Link to="/signup">
          <b>회원가입</b>
        </Link>
      </div>
    </form>
  );
};

export default SigninLayout;
