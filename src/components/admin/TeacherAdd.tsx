import { FC, FormEvent } from 'react';
import axios from 'axios';
import { useInput } from '../../hooks';
import { ADMIN_MENU, CONST_ADMIN_MENU } from './AdminLecture';
import { ITeacherEditInAdmin } from '../../interfaces';
import { MutatorCallback, SWRResponse } from 'swr/dist/types';

interface TeacherAddProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  setSelectedMenu: React.Dispatch<React.SetStateAction<ADMIN_MENU>>;
  teachers: SWRResponse<ITeacherEditInAdmin[], any>;
}

const TeacherAdd: FC<TeacherAddProps> = ({
  token,
  setToken,
  setSelectedMenu,
  teachers,
}) => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [phone, onChangePhone] = useInput('');
  const [introduce, onChangeIntroduce] = useInput('');
  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      if (password !== passwordCheck) {
        throw new Error('패스워드가 일치하지 않습니다!');
      }

      event.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/auth/admin/teacher`,
        {
          email,
          password,
          nickname,
          phone,
          introduce,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.statusText === 'Created') {
        setSelectedMenu(CONST_ADMIN_MENU.TEACHER_EDIT);
        teachers.mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="mt-[47px] w-full" onSubmit={onSubmitHandler}>
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
          <label htmlFor="nickname">강사 이름</label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="text"
          value={nickname}
          onChange={onChangeNickname}
        />
      </div>
      <div className="mb-[29px]">
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
      <div className="mb-[19px]">
        <div>
          <label htmlFor="introduce">강사 소개</label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="text"
          value={introduce}
          onChange={onChangeIntroduce}
        />
      </div>
      <input
        type="submit"
        className="w-full h-[51px] text-[24px] font-semibold leading-[33px] bg-[#0D5B83] text-white mb-[12px]"
        value="강사 추가"
      />
    </form>
  );
};

export default TeacherAdd;
