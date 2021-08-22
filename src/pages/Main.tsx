import { FC } from 'react';
import Carousel from '../components/main/Carousel';
import MyLecture from '../components/main/MyLecture';
import OrgCarousel from '../components/main/OrgCarousel';

const Main: FC = () => {
  return (
    <div className="min-h-screen bg-white font-noto">
      <Carousel />
      <MyLecture />
      <OrgCarousel />
    </div>
  );
};

export default Main;
