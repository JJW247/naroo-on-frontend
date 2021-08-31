import { FC } from 'react';
import Slider from 'react-slick';
import { SWRResponse } from 'swr';
import { IResourceContent } from '../../interfaces';

interface NoticeCarouselProps {
  noticeCarousel: SWRResponse<IResourceContent[], any>;
}

const NoticeCarousel: FC<NoticeCarouselProps> = ({ noticeCarousel }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };
  return (
    <div className="mx-auto text-center bg-gray-100">
      <Slider {...settings}>
        {noticeCarousel &&
          noticeCarousel.data &&
          noticeCarousel.data.map((element) => {
            return (
              <img
                className="max-w-[100vw] max-h-[320px]"
                src={element.content}
              />
            );
          })}
      </Slider>
    </div>
  );
};

export default NoticeCarousel;
