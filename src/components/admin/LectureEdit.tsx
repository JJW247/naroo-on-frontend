import { FC } from 'react';
import { SWRResponse } from 'swr';
import { ILectureInList } from '../../interfaces';
import Cards from '../common/Cards';

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
        <div className="text-3xl ">강의 관리</div>
        <Cards token={token} setToken={setToken} lectures={allLectures} />
      </div>
    </div>
  );
};

export default LectureEdit;
