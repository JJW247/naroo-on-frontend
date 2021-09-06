import { useRef } from 'react';
import { useState } from 'react';
import { FC } from 'react';
import { SWRResponse } from 'swr';
import {
  ILectureInList,
  IStudentEditInAdmin,
  ITags,
  ITeacherEditInAdmin,
} from '../../interfaces';
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
  teachers: SWRResponse<ITeacherEditInAdmin[], any>;
  allLectures: SWRResponse<ILectureInList[], any>;
  students: SWRResponse<IStudentEditInAdmin[], any>;
  tags: SWRResponse<ITags[], any>;
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

const AdminLecture: FC<AdminLectureProps> = ({
  token,
  setToken,
  teachers,
  allLectures,
  students,
  tags,
}) => {
  const [selectedMenu, setSelectedMenu] = useState<ADMIN_MENU>(
    CONST_ADMIN_MENU.LECTURE_ADD,
  );
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);
  const menuElementRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="mx-auto mt-[2vh] pb-[96px]">
      <div className="text-4xl font-semibold text-center text-gray-400 mb-[4vh] 2xl:max-w-[900px] xl:max-w-[750px] lg:max-w-[600px] md:max-w-[500px] sm:max-w-[400px] xs:max-w-[350px] mx-auto">
        관리자 페이지
      </div>
      <div className="flex items-center justify-evenly sm:hidden xs:hidden">
        <button
          className={`border-[1px] border-[#515A6E] rounded p-[10px] text-xl min-w-max ${
            selectedMenu === CONST_ADMIN_MENU.LECTURE_ADD
              ? 'text-[#8DC556] border-[#8DC556]'
              : 'text-[#515A6E]'
          }`}
          onClick={() => setSelectedMenu(CONST_ADMIN_MENU.LECTURE_ADD)}
        >
          강의 추가
        </button>
        <button
          className={`border-[1px] border-[#515A6E] rounded p-[10px] text-xl min-w-max ${
            selectedMenu === CONST_ADMIN_MENU.LECTURE_EDIT
              ? 'text-[#8DC556] border-[#8DC556]'
              : 'text-[#515A6E]'
          }`}
          onClick={() => setSelectedMenu(CONST_ADMIN_MENU.LECTURE_EDIT)}
        >
          강의 관리
        </button>
        <button
          className={`border-[1px] border-[#515A6E] rounded p-[10px] text-xl min-w-max ${
            selectedMenu === CONST_ADMIN_MENU.LECTURE_PERMISSION
              ? 'text-[#8DC556] border-[#8DC556]'
              : 'text-[#515A6E]'
          }`}
          onClick={() => setSelectedMenu(CONST_ADMIN_MENU.LECTURE_PERMISSION)}
        >
          강의 승인
        </button>
        <button
          className={`border-[1px] border-[#515A6E] rounded p-[10px] text-xl min-w-max ${
            selectedMenu === CONST_ADMIN_MENU.TEACHER_ADD
              ? 'text-[#8DC556] border-[#8DC556]'
              : 'text-[#515A6E]'
          }`}
          onClick={() => setSelectedMenu(CONST_ADMIN_MENU.TEACHER_ADD)}
        >
          강사 추가
        </button>
        <button
          className={`border-[1px] border-[#515A6E] rounded p-[10px] text-xl min-w-max ${
            selectedMenu === CONST_ADMIN_MENU.TEACHER_EDIT
              ? 'text-[#8DC556] border-[#8DC556]'
              : 'text-[#515A6E]'
          }`}
          onClick={() => setSelectedMenu(CONST_ADMIN_MENU.TEACHER_EDIT)}
        >
          강사 관리
        </button>
        <button
          className={`border-[1px] border-[#515A6E] rounded p-[10px] text-xl min-w-max ${
            selectedMenu === CONST_ADMIN_MENU.STUDENT_EDIT
              ? 'text-[#8DC556] border-[#8DC556]'
              : 'text-[#515A6E]'
          }`}
          onClick={() => setSelectedMenu(CONST_ADMIN_MENU.STUDENT_EDIT)}
        >
          학생 관리
        </button>
        <button
          className={`border-[1px] border-[#515A6E] rounded p-[10px] text-xl min-w-max ${
            selectedMenu === CONST_ADMIN_MENU.TAG_EDIT
              ? 'text-[#8DC556] border-[#8DC556]'
              : 'text-[#515A6E]'
          }`}
          onClick={() => setSelectedMenu(CONST_ADMIN_MENU.TAG_EDIT)}
        >
          태그 관리
        </button>
      </div>
      <div className="h-full text-center 2xl:hidden xl:hidden lg:hidden md:hidden sm:block xs:block">
        <>
          <button
            className="border-[#8DC556] border-[1px] rounded-[4px] text-[#8DC556] font-semibold text-[20px] leading-[20px] w-full px-[10px] py-[5px]"
            onClick={() => setIsVisibleMenu(!isVisibleMenu)}
          >
            메뉴
          </button>
          {isVisibleMenu && (
            <div
              ref={menuElementRef}
              className="flex-none border-[1px] border-[#DCDEE2] box-border rounded-[10px] bg-white min-w-full absolute top-[220px] z-[999]"
            >
              <button
                className={`block w-full px-[10px] py-[10px] ${
                  selectedMenu === CONST_ADMIN_MENU.LECTURE_ADD
                    ? 'text-[#8DC556]'
                    : 'text-[#515A6E]'
                }`}
                onClick={() => {
                  setSelectedMenu(CONST_ADMIN_MENU.LECTURE_ADD);
                  setIsVisibleMenu(false);
                }}
              >
                강의 추가
              </button>

              <button
                className={`block w-full px-[10px] py-[10px]  ${
                  selectedMenu === CONST_ADMIN_MENU.LECTURE_EDIT
                    ? 'text-[#8DC556]'
                    : 'text-[#515A6E]'
                }`}
                onClick={() => {
                  setSelectedMenu(CONST_ADMIN_MENU.LECTURE_EDIT);
                  setIsVisibleMenu(false);
                }}
              >
                강의 관리
              </button>

              <button
                className={`block w-full px-[10px] py-[10px]  ${
                  selectedMenu === CONST_ADMIN_MENU.LECTURE_PERMISSION
                    ? 'text-[#8DC556]'
                    : 'text-[#515A6E]'
                }`}
                onClick={() => {
                  setSelectedMenu(CONST_ADMIN_MENU.LECTURE_PERMISSION);
                  setIsVisibleMenu(false);
                }}
              >
                강의 승인
              </button>

              <button
                className={`block w-full px-[10px] py-[10px]  ${
                  selectedMenu === CONST_ADMIN_MENU.TEACHER_ADD
                    ? 'text-[#8DC556]'
                    : 'text-[#515A6E]'
                }`}
                onClick={() => {
                  setSelectedMenu(CONST_ADMIN_MENU.TEACHER_ADD);
                  setIsVisibleMenu(false);
                }}
              >
                강사 추가
              </button>

              <button
                className={`block w-full px-[10px] py-[10px]  ${
                  selectedMenu === CONST_ADMIN_MENU.TEACHER_EDIT
                    ? 'text-[#8DC556]'
                    : 'text-[#515A6E]'
                }`}
                onClick={() => {
                  setSelectedMenu(CONST_ADMIN_MENU.TEACHER_EDIT);
                  setIsVisibleMenu(false);
                }}
              >
                강사 관리
              </button>

              <button
                className={`block w-full px-[10px] py-[10px]  ${
                  selectedMenu === CONST_ADMIN_MENU.STUDENT_EDIT
                    ? 'text-[#8DC556]'
                    : 'text-[#515A6E]'
                }`}
                onClick={() => {
                  setSelectedMenu(CONST_ADMIN_MENU.STUDENT_EDIT);
                  setIsVisibleMenu(false);
                }}
              >
                학생 관리
              </button>

              <button
                className={`block w-full px-[10px] py-[10px]  ${
                  selectedMenu === CONST_ADMIN_MENU.TAG_EDIT
                    ? 'text-[#8DC556]'
                    : 'text-[#515A6E]'
                }`}
                onClick={() => {
                  setSelectedMenu(CONST_ADMIN_MENU.TAG_EDIT);
                  setIsVisibleMenu(false);
                }}
              >
                태그 관리
              </button>
            </div>
          )}
        </>
      </div>
      {selectedMenu === CONST_ADMIN_MENU.LECTURE_ADD && (
        <div className="2xl:max-w-[900px] xl:max-w-[750px] lg:max-w-[600px] md:max-w-[500px] sm:max-w-[400px] xs:max-w-[350px] mx-auto">
          <LectureAdd
            token={token}
            setToken={setToken}
            setSelectedMenu={setSelectedMenu}
            allLectures={allLectures}
            teachers={teachers.data}
          />
        </div>
      )}
      {selectedMenu === CONST_ADMIN_MENU.LECTURE_EDIT && (
        <div className="2xl:max-w-[1520px] xl:max-w-[1140px] lg:max-w-[752px] md:max-w-[607px] sm:max-w-[506px] xs:max-w-[375px] mx-auto">
          <LectureEdit
            token={token}
            setToken={setToken}
            allLectures={allLectures}
            allTags={tags.data ? (tags.data.length > 0 ? tags.data : []) : []}
            teachers={teachers.data}
          />
        </div>
      )}
      {selectedMenu === CONST_ADMIN_MENU.LECTURE_PERMISSION && (
        <div className="2xl:max-w-[900px] xl:max-w-[750px] lg:max-w-[600px] md:max-w-[500px] sm:max-w-[400px] xs:max-w-[350px] mx-auto">
          <LecturePermission
            token={token}
            setToken={setToken}
            students={
              students.data
                ? students.data.length > 0
                  ? students.data.map((student) => {
                      return {
                        value: student.id,
                        label: student.nickname,
                      };
                    })
                  : []
                : []
            }
            lectures={
              allLectures.data
                ? allLectures.data.length > 0
                  ? allLectures.data.map((lecture) => {
                      if (lecture.status !== 'invisible') {
                        return lecture;
                      }
                    })
                  : []
                : []
            }
          />
        </div>
      )}
      {selectedMenu === CONST_ADMIN_MENU.TEACHER_ADD && (
        <div className="2xl:max-w-[900px] xl:max-w-[750px] lg:max-w-[600px] md:max-w-[500px] sm:max-w-[400px] xs:max-w-[350px] mx-auto">
          <TeacherAdd
            token={token}
            setToken={setToken}
            setSelectedMenu={setSelectedMenu}
            teachers={teachers}
          />
        </div>
      )}
      {selectedMenu === CONST_ADMIN_MENU.TEACHER_EDIT && (
        <div className="2xl:max-w-[900px] xl:max-w-[750px] lg:max-w-[600px] md:max-w-[500px] sm:max-w-[400px] xs:max-w-[350px] mx-auto">
          <TeacherEdit token={token} setToken={setToken} teachers={teachers} />
        </div>
      )}
      {selectedMenu === CONST_ADMIN_MENU.STUDENT_EDIT && (
        <div className="2xl:max-w-[900px] xl:max-w-[750px] lg:max-w-[600px] md:max-w-[500px] sm:max-w-[400px] xs:max-w-[350px] mx-auto">
          <StudentEdit token={token} setToken={setToken} students={students} />
        </div>
      )}
      {selectedMenu === CONST_ADMIN_MENU.TAG_EDIT && (
        <div className="2xl:max-w-[900px] xl:max-w-[750px] lg:max-w-[600px] md:max-w-[500px] sm:max-w-[400px] xs:max-w-[350px] mx-auto">
          <TagEdit token={token} setToken={setToken} tags={tags} />
        </div>
      )}
    </div>
  );
};

export default AdminLecture;
