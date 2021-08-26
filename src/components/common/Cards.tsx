import { FC } from 'react';
import { SWRResponse } from 'swr';
import { ILectureInList } from '../../interfaces';
import MainLectureCard from './MainLectureCard';

interface CardsProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  lectures: SWRResponse<ILectureInList[], any>;
}

const Cards: FC<CardsProps> = ({ token, setToken, lectures }) => {
  return (
    <>
      {lectures && lectures.data && (
        <div className="grid grid-flow-row grid-cols-4 gap-6">
          {lectures.data.map((lecture) => {
            return (
              <MainLectureCard
                title={lecture.title}
                thumbnail={lecture.thumbnail}
                teacher={lecture.teacher}
              />
            );
          })}
        </div>
      )}
      {(!lectures || !lectures.data) && (
        <div className="text-center ">강좌가 존재하지 않습니다</div>
      )}
    </>
  );
};

export default Cards;
