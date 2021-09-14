import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
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
    true,
  );
  return (
    <>
      <Slider {...settings}>
        {data &&
          data.map((element) => {
            return (
              <img
                key={element.content}
                className="max-w-[100vw] max-h-[320px]"
                src={element.content}
              />
            );
          })}
      </Slider>
      {!data && <Skeleton className="w-full h-[320px]" />}
    </>
  );
};

export default NoticeCarousel;
