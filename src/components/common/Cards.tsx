import { FC } from 'react';
import { getAllLectures } from '../../hooks/api';
import MainLectureCard from './MainLectureCard';

interface CardsProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const Cards: FC<CardsProps> = ({ token, setToken }) => {
  const lectures = getAllLectures();
  const { data } = lectures;
  return (
    <>
      {data && (
        <div className="grid grid-flow-row grid-cols-4 gap-6">
          {data.map((lecture) => {
            return (
              <MainLectureCard
                title={lecture.title}
                thumbnail={lecture.thumbnail}
                teacherName={lecture.teacherName}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Cards;
