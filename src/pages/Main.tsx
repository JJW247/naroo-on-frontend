import React, { FC } from 'react';
import Carousel from '../components/main/Carousel';
import MyLecture from '../components/main/MyLecture';

const Main: FC = () => {
  return (
    <div className="min-h-screen bg-white font-noto">
      <Carousel />
      <MyLecture />
    </div>
  );
};

export default Main;
