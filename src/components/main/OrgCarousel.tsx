import { FC } from 'react';
import Slider from 'react-slick';
import { SWRResponse } from 'swr';
import { IResourceContent } from '../../interfaces';

interface OrgCarouselProps {
  orgCarousel: SWRResponse<IResourceContent[], any>;
}

const OrgCarousel: FC<OrgCarouselProps> = ({ orgCarousel }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    pauseOnHover: true,
  };
  return (
    <div className="2xl:max-w-[1520px] xl:max-w-[1140px] lg:max-w-[752px] md:max-w-[607px] sm:max-w-[506px] xs:max-w-[375px] mx-auto mt-[139px] mb-[66px]">
      <div className="text-center text-[#515A6E] leading-[150%] 2xl:text-[36px] xl:text-[24px] md:text-[24px] lg:text-[24px] font-semibold mb-[28px]">
        이미 다양한 기관들이 마포런과 함께하고 있어요.
      </div>
      <Slider {...settings}>
        {orgCarousel &&
          orgCarousel.data &&
          orgCarousel.data.map((element) => {
            return (
              <img
                className="max-w-[1182px] max-h-[96px]"
                src={element.content}
              />
            );
          })}
      </Slider>
    </div>
  );
};

export default OrgCarousel;
