import { FC } from 'react';
import Slider from 'react-slick';
import { useGetSWR } from '../../hooks/api';
import { IResourceContent } from '../../interfaces';

const NoticeCarousel: FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };
  const { data } = useGetSWR<IResourceContent[]>(
    `${process.env.REACT_APP_BACK_URL}/resource/notice_carousel`,
    null,
  );
  return (
    <div className="mx-auto text-center bg-gray-100">
      <Slider {...settings}>
        {data &&
          data.map((element) => {
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
