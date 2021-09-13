import Select from 'react-select';
import { FC, useCallback, useState } from 'react';
import { useGetSWR } from '../../hooks/api';
import UpdateStatus from './lecture/UpdateStatus';
import { ILectureInList, ILectureInListAdmin } from '../../interfaces';

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
  const { data: lectureStatusesData, mutate: lectureStatusesMutate } =
    useGetSWR<ILectureInListAdmin[]>(
      `${process.env.REACT_APP_BACK_URL}/lecture/admin/status`,
      token,
    );
  const [studentFilter, setStudentFilter] =
    useState<{ value: string; label: string }>();
  const onHandleFilterChange = useCallback(
    (changedOption) => {
      setStudentFilter(changedOption);
    },
    [students],
  );

  return (
    <>
      <Select
        className="mt-[40px]"
        options={students}
        onChange={onHandleFilterChange}
        placeholder="유저를 선택하세요!"
      />
      {lectureStatusesData &&
        lectureStatusesData.map((lectureStatus) => {
          if (studentFilter) {
            if (studentFilter.value === lectureStatus.student_id) {
              return (
                <>
                  <div className="w-full mt-[40px]">{lectureStatus.title}</div>
                  <div className="w-full">
                    {lectureStatus.expired
                      ? lectureStatus.expired
                      : '만료 기간 없음'}{' '}
                    / {lectureStatus.type}
                  </div>
                  <div className="flex flex-wrap items-center w-full justify-evenly">
                    {lectureStatus.thumbnail && (
                      <img src={lectureStatus.thumbnail} width="200" />
                    )}
                    <div>{lectureStatus.teacher_nickname}</div>
                    <UpdateStatus
                      token={token}
                      setToken={setToken}
                      studentId={lectureStatus.student_id}
                      lectureId={lectureStatus.lecture_id}
                      status={lectureStatus.status}
                      mutate={lectureStatusesMutate}
                    />
                  </div>
                </>
              );
            }
          }
        })}
    </>
  );
};

export default LecturePermission;
