import { FC } from 'react';
import { SWRResponse } from 'swr';
import { ILectureInList } from '../../interfaces';
import LectureCard from '../lecture/LectureCard';

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
    <div className="flex items-center justify-center mt-[30px]">
      <div>
        {allLectures && allLectures.data && (
          <div className="grid grid-flow-row 2xl:grid-cols-4 2xl:gap-6 xl:grid-cols-3 xl:gap-6 lg:grid-cols-2 lg:gap-6 md:grid-cols-2 md:gap-3">
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
                  average_rating={lecture.average_rating}
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
