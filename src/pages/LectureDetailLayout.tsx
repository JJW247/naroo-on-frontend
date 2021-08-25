import { FC } from 'react';
import { useParams } from 'react-router';
import Dummy from '../assets/images/dummy-lecture.png';
import Star from '../components/common/Star';
import UserIcon from '../assets/images/User.svg';
import { Link } from 'react-router-dom';
import { CONST_RATING_TYPE } from '../interfaces';

const LetcureDetailLayout: FC = () => {
  const params = useParams();

  return (
    <div>
      <div className="w-full h-[380px] bg-[#696969] flex items-center justify-center">
        <img className="mr-[81px]" src={Dummy} />
        <div>
          <div className="w-[754px] mb-[41px] text-white text-[52px] text-center font-semibold">
            안드로이드 앱 개발을 위한 실전 React Native 배우기
          </div>
          <div className="flex">
            <div>
              <Link to="/lecture-play/0">
                <button className="w-[336px] h-[66px] text-white text-[36px] font-semibold leading-[49px] bg-[#58BFDE]">
                  지금 수강하러 가기
                </button>
              </Link>
              <div className="mt-[13px] text-[14px] leading-[19px] text-white font-semibold">
                마감까지 4일 8시간 55분 남았어요!
              </div>
            </div>
            <div className="ml-[132px]">
              <div className="text-[18px] mb-[5px] text-white leading-[25px] font-semibold">
                현재 100명이 수강하고 있어요!
              </div>
              <div className="mb-[6px] flex flex-row-reverse items-center text-white text-[14px] leading-[19px] font-extrabold">
                <u>강사명</u>
                <img className="mr-[4px]" src={UserIcon} />
              </div>
              <div className="mb-[9px] text-right text-white text-[14px] leading-[19px] font-extrabold">
                100개의 수강평
              </div>
              <div className="float-right text-white text-[14px] leading-[19px] font-extrabold">
                <Star width="3vw" rating={CONST_RATING_TYPE.FIVE} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1200px] h-[64px] ml-[360px] mr-[360px] flex items-center">
        <div className="w-[120px] text-[16px] leading-[22px] font-semibold">
          강의 소개
        </div>
        <div className="w-[120px] text-[16px] leading-[22px] font-semibold">
          공지사항
        </div>
        <div className="w-[120px] text-[16px] leading-[22px] font-semibold">
          수강 후기
        </div>
        <div className="w-[120px] text-[16px] leading-[22px] font-semibold">
          문의하기
        </div>
      </div>
      <div className="w-[1200px] pt-[50px] pb-[60px] ml-[360px] mr-[360px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aliquam
        expedita iste laborum pariatur quisquam soluta eligendi et a ipsam at,
        officia vero enim eius velit, nesciunt voluptatem nostrum fugiat
        delectus iure. Modi magnam ipsa assumenda cum velit pariatur recusandae
        perspiciatis eaque repudiandae doloribus quo, nemo beatae in sunt
        inventore nisi ipsam nobis vitae voluptates nam voluptatem perferendis
        deleniti. Neque, iusto soluta rem sapiente earum voluptatem beatae.
        Architecto repellendus quasi minima voluptates facere esse autem
        eligendi quas nemo, enim libero mollitia saepe, placeat veritatis
        officia aut sed, neque harum illum reiciendis. Ex quod nemo nihil nobis
        quibusdam. Impedit reprehenderit beatae totam nihil, dolor nemo debitis
        soluta quidem perferendis officia non, doloribus minus, corporis quasi
        repudiandae porro recusandae reiciendis ea maiores eius qui ut labore
        in? Debitis culpa ut commodi molestias, beatae, quo animi atque nihil
        quam rerum distinctio laborum dignissimos laudantium architecto
        exercitationem reprehenderit ab laboriosam nobis! Voluptatem aliquid
        perspiciatis nisi exercitationem odit sequi voluptates molestiae
        eligendi, est laudantium beatae inventore assumenda iste quibusdam
        quidem magni harum? Aut aliquid repellat architecto nam iste sit nemo
        ipsum eos accusamus ullam, possimus eligendi iure odit veritatis eaque,
        sed quas, ea nihil explicabo hic numquam quasi sequi? Quam dolore nemo
        inventore exercitationem esse?
      </div>
    </div>
  );
};

export default LetcureDetailLayout;
