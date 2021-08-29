import { FC } from 'react';
import { SWRResponse } from 'swr';
import { ILectureInList } from '../../interfaces';
import LectureCard from '../common/LectureCard';

interface LecturesEditProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  allLectures: SWRResponse<ILectureInList[], any>;
}

const LectureEdit: FC<LecturesEditProps> = ({
  token,
  setToken,
  allLectures,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div>
        <div className="w-full text-center text-3xl">강의 관리</div>
        {allLectures && allLectures.data && (
          <div className="grid grid-flow-row grid-cols-4 gap-6">
            {allLectures.data.map((lecture) => {
              return (
                <LectureCard
                  id={lecture.id}
                  title={lecture.title}
                  thumbnail={lecture.thumbnail}
                  nickname={lecture.nickname}
                  type={lecture.type}
                  status={null}
                  expired={lecture.expired}
                  tags={lecture.tags}
                  reviews={lecture.reviews}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureEdit;
