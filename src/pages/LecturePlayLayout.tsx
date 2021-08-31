import { useState } from 'react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import Tag from '../components/common/Tag';
import { getLectureVideo, getLectureVideoGuest } from '../hooks/api';

interface LecturePlayLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const LecturePlayLayout: FC<LecturePlayLayoutProps> = ({ token, setToken }) => {
  const { id } = useParams<{ id: string }>();
  const [positionVideo, setPositionVideo] = useState<number>(0);
  const informationVideo = token
    ? getLectureVideo(token, id)
    : getLectureVideoGuest(id);
  if (
    !token ||
    !id ||
    (informationVideo &&
      informationVideo.data &&
      informationVideo?.data.status !== 'accept')
  ) {
    return <div>잘못된 접근입니다!</div>;
  }
  console.log(informationVideo);
  return (
    <div className="2xl:max-w-[1520px] xl:max-w-[1140px] lg:max-w-[752px] md:max-w-[607px] sm:max-w-[506px] xs:max-w-[375px] mx-auto">
      {informationVideo &&
        informationVideo.data &&
        informationVideo.data.videos && (
          <div>
            <div className="flex flex-wrap justify-start mt-[72px]">
              {informationVideo.data.tags &&
                informationVideo.data.tags.length > 0 && (
                  <div className="mt-5 flex">
                    {informationVideo.data.tags.map((tagName) => {
                      return <Tag name={tagName} />;
                    })}
                  </div>
                )}
            </div>
            <div className="flex flex-nowrap justify-center">
              {token &&
                informationVideo.data.videos.length > 0 &&
                informationVideo.data.videos.map((video) => {
                  return (
                    <button
                      className="mx-[20px]"
                      onClick={() => setPositionVideo(+video.id)}
                    >
                      {video.id}강 : {video.title}
                    </button>
                  );
                })}
            </div>
            {token && informationVideo.data.videos.length > 0 && (
              <div className="flex flex-wrap justify-center">
                <iframe
                  className="mt-[10px] mb-[80px]"
                  src={informationVideo.data.videos[positionVideo].url}
                  width="1200"
                  height="675"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default LecturePlayLayout;
