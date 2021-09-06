import { FC } from 'react';
import { SWRResponse } from 'swr';
import { ILectureInList, ITags, ITeacherEditInAdmin } from '../../interfaces';
import LectureEditCard from './lecture/LectureEditCard';

interface LecturesEditProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  allLectures: SWRResponse<ILectureInList[], any>;
  allTags: ITags[] | [];
  teachers: ITeacherEditInAdmin[] | undefined;
}

const LectureEdit: FC<LecturesEditProps> = ({
  token,
  setToken,
  allLectures,
  allTags,
  teachers,
}) => {
  return (
    <div className="flex items-center justify-center mt-[30px]">
      <div>
        {allLectures && allLectures.data && (
          <div className="grid grid-flow-row 2xl:grid-cols-2 2xl:gap-6 xl:grid-cols-2 xl:gap-6 lg:grid-cols-1 lg:gap-6 md:grid-cols-1 md:gap-3">
            {allLectures.data.map((lecture) => {
              return (
                <LectureEditCard
                  id={lecture.id}
                  title={lecture.title}
                  description={lecture.description}
                  thumbnail={lecture.thumbnail}
                  nickname={lecture.nickname}
                  type={lecture.type}
                  status={null}
                  expired={lecture.expired}
                  tags={lecture.tags}
                  reviews={lecture.reviews}
                  teachers={teachers}
                  average_rating={lecture.average_rating}
                  token={token}
                  setToken={setToken}
                  allTags={allTags}
                  mutate={allLectures.mutate}
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
