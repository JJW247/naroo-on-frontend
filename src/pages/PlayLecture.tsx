import { FC } from 'react';
import { useParams } from 'react-router';
import PlayLectureComponent from '../components/lecture/PlayLectureComponent';

const PlayLecture: FC = () => {
  const params = useParams();

  return <PlayLectureComponent />;
};

export default PlayLecture;
