import { FC } from 'react';
import AdminLecture from '../components/admin/AdminLecture';
import Carousel from '../components/main/Carousel';
import MyLecture from '../components/main/MyLecture';
import OrgCarousel from '../components/main/OrgCarousel';

interface MainProps {
  userType: string | null;
}

const Main: FC<MainProps> = ({ userType }) => {
  let mainContents = <MyLecture />;
  if (userType === 'admin') {
    mainContents = <AdminLecture />;
  } else {
    mainContents = <MyLecture />;
  }
  return (
    <div className="min-h-screen bg-white font-noto">
      <Carousel />
      {mainContents}
      <OrgCarousel />
    </div>
  );
};

export default Main;
