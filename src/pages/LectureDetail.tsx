import { FC } from 'react';
import { useParams } from 'react-router';
import LetureDetailComponent from '../components/lecture/LectureDetailComponent';

const LetcureDetail: FC = () => {
  const params = useParams();

  return <LetureDetailComponent />;
};

export default LetcureDetail;
