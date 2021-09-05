import { FC } from 'react';
import { getLectureStatuses } from '../../hooks/api';
import UpdateStatus from './lecture/UpdateStatus';

interface LecturePermissionProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const LecturePermission: FC<LecturePermissionProps> = ({ token, setToken }) => {
  const lectureStatuses = getLectureStatuses(token);
  return (
    <>
      {lectureStatuses && lectureStatuses.data && (
        <div>
          {lectureStatuses.data.map((lectureStatus) => {
            return (
              <>
                <div className="w-full mt-[40px]">{lectureStatus.title}</div>
                <div className="w-full">
                  {lectureStatus.expired
                    ? lectureStatus.expired
                    : '만료 기간 없음'}{' '}
                  / {lectureStatus.type}
                </div>
                <div className="w-full flex flex-wrap justify-evenly items-center">
                  {lectureStatus.thumbnail && (
                    <img src={lectureStatus.thumbnail} width="200" />
                  )}
                  <div>{lectureStatus.nickname}</div>
                  {lectureStatus.student_id && lectureStatus.lecture_id && (
                    <UpdateStatus
                      token={token}
                      setToken={setToken}
                      studentId={lectureStatus.student_id}
                      lectureId={lectureStatus.lecture_id}
                      status={lectureStatus.status}
                      mutate={lectureStatuses.mutate}
                    />
                  )}
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default LecturePermission;
