import { FC } from 'react';
import { IStudentEditInAdmin } from '../../interfaces';

interface TeacherEditProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  students: IStudentEditInAdmin[] | undefined;
}

const TeacherEdit: FC<TeacherEditProps> = ({ token, setToken, students }) => {
  return (
    <div>
      <div className="flex w-full text-center flex-nowrap">학생 관리</div>
      {students &&
        students.map((student) => (
          <div className="flex-auto border-2 rounded">
            <div>강사명 : {student.email}</div>
            <div>강사 소개 : {student.nickname}</div>
          </div>
        ))}
    </div>
  );
};

export default TeacherEdit;
