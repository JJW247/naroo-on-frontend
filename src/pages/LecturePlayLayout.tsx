import { FC } from 'react';
import { useParams } from 'react-router';
import PlayLectureComponent from '../components/lecture/PlayLectureComponent';

const LecturePlayLayout: FC = () => {
  const params = useParams();

  return <PlayLectureComponent />;
};

export default LecturePlayLayout;
