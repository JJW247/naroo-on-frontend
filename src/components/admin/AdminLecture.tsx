import { useState } from 'react';
import { FC } from 'react';
import useSWR from 'swr';
import {
  getAllLectures,
  getAllStudents,
  getAllTeachers,
} from '../../hooks/api';
import { ITeacherEditInAdmin } from '../../interfaces';
import LectureAdd from './LectureAdd';
import LectureEdit from './LectureEdit';
import LecturePermission from './LecturePermission';
import StudentEdit from './StudentEdit';
import TagEdit from './TagEdit';
import TeacherAdd from './TeacherAdd';
import TeacherEdit from './TeacherEdit';

interface AdminLectureProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

export const CONST_ADMIN_MENU = {
  LECTURE_ADD: 'lecture_add',
  LECTURE_EDIT: 'lecture_edit',
  LECTURE_PERMISSION: 'lecture_permission',
  TEACHER_ADD: 'teacher_add',
  TEACHER_EDIT: 'teacher_edit',
  STUDENT_EDIT: 'student_edit',
  TAG_EDIT: 'tag_edit',
} as const;

export type ADMIN_MENU = typeof CONST_ADMIN_MENU[keyof typeof CONST_ADMIN_MENU];

const AdminLecture: FC<AdminLectureProps> = ({ token, setToken }) => {
  const [selectedMenu, setSelectedMenu] = useState<ADMIN_MENU>(
    CONST_ADMIN_MENU.LECTURE_ADD,
  );

  const teachers = getAllTeachers(token);
  const lectures = getAllLectures();
  const students = getAllStudents(token);

  return (
    // 임시 MB
    <div className="max-w-[1200px] mx-auto mt-[2vh] pb-[96px]">
      <div className="text-4xl font-semibold text-center text-gray-400 mb-[4vh]">
        관리자 페이지
      </div>
      <div className="flex justify-center items-center w-[1200px]">
        <div
          className={`border-4 rounded mr-[8vw] p-[10px] text-xl min-w-max ${
            selectedMenu === CONST_ADMIN_MENU.LECTURE_ADD
              ? 'bg-black text-white'
              : ''
          }`}
          onClick={() => setSelectedMenu(CONST_ADMIN_MENU.LECTURE_ADD)}
        >
          강의 추가
        </div>
        <div
          className={`border-4 rounded mr-[8vw] p-[10px] text-xl min-w-max ${
            selectedMenu === CONST_ADMIN_MENU.LECTURE_EDIT
              ? 'bg-black text-white'
              : ''
          }`}
          onClick={() => setSelectedMenu(CONST_ADMIN_MENU.LECTURE_EDIT)}
        >
          강의 관리
        </div>
        <div
          className={`border-4 rounded mr-[8vw] p-[10px] text-xl min-w-max ${
            selectedMenu === CONST_ADMIN_MENU.LECTURE_PERMISSION
              ? 'bg-black text-white'
              : ''
          }`}
          onClick={() => setSelectedMenu(CONST_ADMIN_MENU.LECTURE_PERMISSION)}
        >
          강의 승인
        </div>
        <div
          className={`border-4 rounded mr-[8vw] p-[10px] text-xl min-w-max ${
            selectedMenu === CONST_ADMIN_MENU.TEACHER_ADD
              ? 'bg-black text-white'
              : ''
          }`}
          onClick={() => setSelectedMenu(CONST_ADMIN_MENU.TEACHER_ADD)}
        >
          강사 추가
        </div>
        <div
          className={`border-4 rounded mr-[8vw] p-[10px] text-xl min-w-max ${
            selectedMenu === CONST_ADMIN_MENU.TEACHER_EDIT
              ? 'bg-black text-white'
              : ''
          }`}
          onClick={() => setSelectedMenu(CONST_ADMIN_MENU.TEACHER_EDIT)}
        >
          강사 관리
        </div>
        <div
          className={`border-4 rounded mr-[8vw] p-[10px] text-xl min-w-max ${
            selectedMenu === CONST_ADMIN_MENU.STUDENT_EDIT
              ? 'bg-black text-white'
              : ''
          }`}
          onClick={() => setSelectedMenu(CONST_ADMIN_MENU.STUDENT_EDIT)}
        >
          학생 관리
        </div>
        <div
          className={`border-4 rounded p-[10px] text-xl min-w-max ${
            selectedMenu === CONST_ADMIN_MENU.TAG_EDIT
              ? 'bg-black text-white'
              : ''
          }`}
          onClick={() => setSelectedMenu(CONST_ADMIN_MENU.TAG_EDIT)}
        >
          태그 관리
        </div>
      </div>
      {selectedMenu === CONST_ADMIN_MENU.LECTURE_ADD && <LectureAdd />}
      {selectedMenu === CONST_ADMIN_MENU.LECTURE_EDIT && <LectureEdit />}
      {selectedMenu === CONST_ADMIN_MENU.LECTURE_PERMISSION && (
        <LecturePermission />
      )}
      {selectedMenu === CONST_ADMIN_MENU.TEACHER_ADD && (
        <TeacherAdd
          token={token}
          setToken={setToken}
          setSelectedMenu={setSelectedMenu}
          teacherMutate={teachers.mutate}
        />
      )}
      {selectedMenu === CONST_ADMIN_MENU.TEACHER_EDIT && (
        <TeacherEdit
          token={token}
          setToken={setToken}
          teachers={teachers.data}
        />
      )}
      {selectedMenu === CONST_ADMIN_MENU.STUDENT_EDIT && (
        <StudentEdit
          token={token}
          setToken={setToken}
          students={students.data}
        />
      )}
      {selectedMenu === CONST_ADMIN_MENU.TAG_EDIT && <TagEdit />}
    </div>
  );
};

export default AdminLecture;
