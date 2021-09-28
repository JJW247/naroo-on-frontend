import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import Slider from 'react-slick';
import { useGetSWR } from '../../hooks/api';
import { IResourceContent } from '../../interfaces';

const OrgCarousel: FC = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const { data } = useGetSWR<IResourceContent[]>(
    `${process.env.REACT_APP_BACK_URL}/resource/org_carousel`,
    null,
    false,
  );
  return (
    <div className="2xl:max-w-[1520px] xl:max-w-[1140px] lg:max-w-[752px] md:max-w-[607px] sm:max-w-[506px] xs:max-w-[375px] mx-auto mt-[139px] mb-[66px]">
      <div className="text-center text-[#515A6E] leading-[150%] 2xl:text-[36px] xl:text-[24px] md:text-[24px] lg:text-[24px] font-semibold mb-[28px]">
        이미 다양한 기관들이 나루온과 함께하고 있어요.
      </div>
      <Slider {...settings}>
        {data &&
          data.map((element) => {
            return (
              <img
                key={element.content}
                className="max-h-[96px]"
                src={element.content}
              />
            );
          })}
      </Slider>
      {!data && <Skeleton className="w-full h-[96px]" />}
    </div>
  );
};

export default OrgCarousel;
