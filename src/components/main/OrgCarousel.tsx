import { FC } from 'react';
import DummyCarousel from '../../assets/images/dummy-org-carousel.png';

const OrgCarousel: FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto mt-[139px] mb-[66px]">
      <div className=" text-center text-[36px] leading-[49px] font-semibold mb-[14px]">
        이미 다양한 기관들이 마포런과 함께하고 있어요.
      </div>
      <img src={DummyCarousel} />
    </div>
  );
};

export default OrgCarousel;
