import Select from 'react-select';
import { FC, useCallback, useMemo, useState } from 'react';
import { getLectureStatuses } from '../../hooks/api';
import UpdateStatus from './lecture/UpdateStatus';
import { ILectureInList } from '../../interfaces';

interface LecturePermissionProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  students: { value: string; label: string }[] | [];
  lectures: (ILectureInList | undefined)[] | [];
}

const LecturePermission: FC<LecturePermissionProps> = ({
  token,
  setToken,
  students,
  lectures,
}) => {
  const lectureStatuses = getLectureStatuses(token);
  const [studentFilter, setStudentFilter] =
    useState<{ value: string; label: string }>();
  const onHandleFilterChange = useCallback(
    (changedOption) => {
      setStudentFilter(changedOption);
    },
    [students],
  );

  const filteredResults: {
    title: string;
    expired: string | null;
    type: string;
    thumbnail: string;
    nickname: string;
    studentId: string;
    lectureId: string;
    status: string | null;
  }[] = [];
  for (const student of students) {
    if (student) {
      for (const lecture of lectures) {
        if (lecture) {
          if (studentFilter) {
            if (student.value === studentFilter.value) {
              filteredResults.push({
                title: lecture.title,
                expired: lecture.expired,
                type: lecture.type,
                thumbnail: lecture.thumbnail,
                nickname: lecture.nickname,
                studentId: student.value,
                lectureId: lecture.id,
                status: null,
              });
            }
          }
        }
      }
    }
  }

  for (const filteredResult of filteredResults) {
    if (lectureStatuses.data) {
      for (const lectureStatus of lectureStatuses.data) {
        if (
          lectureStatus.student_id === filteredResult.studentId &&
          lectureStatus.lecture_id === filteredResult.lectureId
        ) {
          filteredResult.status = lectureStatus.status;
        }
      }
    }
  }

  return (
    <>
      <Select
        className="mt-[40px]"
        options={students}
        onChange={onHandleFilterChange}
        placeholder="유저를 선택하세요!"
      />
      {filteredResults.map((filteredResult) => {
        return (
          <>
            <div className="w-full mt-[40px]">{filteredResult.title}</div>
            <div className="w-full">
              {filteredResult.expired
                ? filteredResult.expired
                : '만료 기간 없음'}{' '}
              / {filteredResult.type}
            </div>
            <div className="w-full flex flex-wrap justify-evenly items-center">
              {filteredResult.thumbnail && (
                <img src={filteredResult.thumbnail} width="200" />
              )}
              <div>{filteredResult.nickname}</div>
              <UpdateStatus
                token={token}
                setToken={setToken}
                studentId={filteredResult.studentId}
                lectureId={filteredResult.lectureId}
                status={filteredResult.status}
                mutate={lectureStatuses.mutate}
              />
            </div>
          </>
        );
      })}
    </>
  );

  //   for (const student of students) {
  //     if (student) {
  //       if (lectureStatuses.data) {
  //         for (const lectureStatus of lectureStatuses.data) {
  //           if (studentFilter) {
  //             if (lectureStatus.student_id === studentFilter.value) {
  //               for (const lecture of lectures) {
  //                 if (lecture) {
  //                   if (
  //                     lectureStatus.student_id === student.value &&
  //                     lectureStatus.lecture_id === lecture.id
  //                   ) {
  //                     renderResult.push(
  //                       <>
  //                         <div className="w-full mt-[40px]">
  //                           {lecture.title}
  //                         </div>
  //                         <div className="w-full">
  //                           {lecture.expired
  //                             ? lecture.expired
  //                             : '만료 기간 없음'}{' '}
  //                           / {lecture.type}
  //                         </div>
  //                         <div className="w-full flex flex-wrap justify-evenly items-center">
  //                           {lecture.thumbnail && (
  //                             <img src={lecture.thumbnail} width="200" />
  //                           )}
  //                           <div>{lecture.nickname}</div>
  //                           <UpdateStatus
  //                             token={token}
  //                             setToken={setToken}
  //                             studentId={lectureStatus.student_id}
  //                             lectureId={lectureStatus.lecture_id}
  //                             status={lectureStatus.status}
  //                             mutate={lectureStatuses.mutate}
  //                           />
  //                         </div>
  //                       </>,
  //                     );
  //                   } else {
  //                     renderResult.push(
  //                       <>
  //                         <div className="w-full mt-[40px]">
  //                           {lecture.title}
  //                         </div>
  //                         <div className="w-full">
  //                           {lecture.expired
  //                             ? lecture.expired
  //                             : '만료 기간 없음'}{' '}
  //                           / {lecture.type}
  //                         </div>
  //                         <div className="w-full flex flex-wrap justify-evenly items-center">
  //                           {lecture.thumbnail && (
  //                             <img src={lecture.thumbnail} width="200" />
  //                           )}
  //                           <div>{lecture.nickname}</div>
  //                           <UpdateStatus
  //                             token={token}
  //                             setToken={setToken}
  //                             studentId={student.value}
  //                             lectureId={lecture.id}
  //                             status={null}
  //                             mutate={lectureStatuses.mutate}
  //                           />
  //                         </div>
  //                       </>,
  //                     );
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   console.log(renderResult);
  //   return renderResult;
  // };
};

export default LecturePermission;
