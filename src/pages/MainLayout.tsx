import { FC } from 'react';
import Carousel from '../components/main/Carousel';
import MyLecture from '../components/main/MyLecture';
import OrgCarousel from '../components/main/OrgCarousel';
import { getAllLectures, getApprovedLectures } from '../hooks/api';

interface MainLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const MainLayout: FC<MainLayoutProps> = ({ token, setToken }) => {
  const allLectures = getAllLectures();
  const lectures = getApprovedLectures(token);
  console.log(lectures);
  return (
    <div className="min-h-screen bg-white font-noto">
      <Carousel />
      <MyLecture
        token={token}
        setToken={setToken}
        lectures={lectures}
        allLectures={allLectures}
      />
      <OrgCarousel />
    </div>
  );
};

export default MainLayout;
