import { FC } from 'react';
import { SWRResponse } from 'swr';
import { ITeacherEditInAdmin } from '../../interfaces';

interface TeacherEditProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  teachers: SWRResponse<ITeacherEditInAdmin[], any>;
}

const TeacherEdit: FC<TeacherEditProps> = ({ token, setToken, teachers }) => {
  return (
    <div className="mt-[30px]">
      {teachers.data &&
        teachers.data.map((teacher) => (
          <div className="border-2 rounded">
            <div>강사명 : {teacher.nickname}</div>
            <div>강사 소개 : {teacher.introduce}</div>
          </div>
        ))}
    </div>
  );
};

export default TeacherEdit;
