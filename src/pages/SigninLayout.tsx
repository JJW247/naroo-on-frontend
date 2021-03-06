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
    <div className="min-h-[73vh] w-full flex justify-center items-center">
      <div className="xl:min-w-[554px] xl:max-w-[554px] lg:min-w-[472.75px] lg:max-w-[472.75px] md:min-w-[354.56px] md:max-w-[354.56px] sm:min-w-[295.47px] sm:max-w-[295.47px] xs:min-w-[295.47px] xs:max-w-[295.47px] box-border rounded-[8px] border-[1px] border-[#DCDEE2] mx-auto my-[120px] py-[30px] xl:px-[98px] lg:px-[83.63px] md:px-[62.72px] sm:px-[52.27px] xs:px-[52.27px]">
        <form onSubmit={onSubmitHandler}>
          <div className="text-[24px] leading-[150%] text-[#17233D] font-semibold">
            ?????????
          </div>
          <div className="mt-[32px] mb-[20px]">
            <input
              className="w-full h-[41px] border-[1px] box-border rounded-[4px] border-[#DCDEE2] bg-[#F3FBFE] placeholder-[#DCDEE2] font-medium text-[14px] leading-[150%] pl-[20px] py-[10px] focus:border-[#00A0E9] focus:outline-none focus:bg-white"
              type="text"
              placeholder="?????????"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
          <div className="mb-[20px]">
            <input
              className="w-full h-[41px] border-[1px] box-border rounded-[4px] border-[#DCDEE2] bg-[#F3FBFE] placeholder-[#DCDEE2] font-medium text-[14px] leading-[150%] pl-[20px] py-[10px] focus:border-[#00A0E9] focus:outline-none focus:bg-white"
              type="password"
              placeholder="????????????"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          <div className="text-[12px] leading-[16px] flex items-center">
            <input
              className="mr-[5px]"
              type="checkbox"
              checked={rememberToken === 'true' ? true : false}
              onChange={(event) =>
                setRememberToken(event.target.checked ? 'true' : 'false')
              }
            />
            ?????? ?????????
          </div>
          <button
            type="submit"
            className="w-full box-border rounded-[4px] border-[1px] border-[#4DBFF0] h-[41px] my-[20px] text-[14px] font-semibold leading-[150%] bg-[#4DBFF0] text-white"
          >
            ?????????
          </button>
          <div className="flex justify-between w-full">
            <div className="text-[14px] leading-[150%] text-[#515A6E] font-normal underline">
              <Link to="/signup">????????????</Link>
            </div>
            <div className="text-[14px] leading-[150%] text-[#515A6E] font-normal underline">
              <Link to="/forgot">???????????? ?????????</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninLayout;
