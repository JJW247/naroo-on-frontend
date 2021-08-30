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
    <div className="max-w-[1200px] mx-auto mt-[139px] mb-[66px]">
      <div className=" text-center text-[36px] leading-[49px] font-semibold mb-[14px]">
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
