import { useState } from 'react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import Tag from '../components/common/Tag';
import { getLectureVideo } from '../hooks/api';

interface LecturePlayLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const LecturePlayLayout: FC<LecturePlayLayoutProps> = ({ token, setToken }) => {
  const { id } = useParams<{ id: string }>();
  const [positionVideo, setPositionVideo] = useState<number>(1);
  const informationVideo = token ? getLectureVideo(token, id) : null;
  if (
    !token ||
    !id ||
    (informationVideo &&
      informationVideo.data &&
      informationVideo?.data.status !== 'accept')
  ) {
    return (
      <div className="flex items-center justify-center w-full h-[70vh]">
        잘못된 접근입니다!
      </div>
    );
  }
  return (
    <>
      {token &&
        informationVideo &&
        informationVideo.data &&
        informationVideo.data.videos &&
        informationVideo.data.videos.length > 0 && (
          <div className="bg-gray-500">
            {informationVideo.data.tags &&
              informationVideo.data.tags.length > 0 && (
                <div className="flex p-[10px]">
                  {informationVideo.data.tags.map((tag) => {
                    return <Tag name={tag.name} />;
                  })}
                </div>
              )}
            <div className="w-[100vw] flex">
              {informationVideo.data.videos &&
                informationVideo.data.videos.map((video) => {
                  if (+video.id === positionVideo) {
                    return (
                      <div className="flex-grow w-full">
                        <iframe
                          className="w-full min-h-[69.1vh] max-h-[69.1vh]"
                          src={video.url}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    );
                  }
                })}
              <div className="flex-grow-0 flex items-start w-[15%] min-h-[69.1vh] max-h-[69.1vh]">
                <div className="flex flex-col w-full">
                  {token &&
                    informationVideo.data.videos.length > 0 &&
                    informationVideo.data.videos.map((video) => {
                      return (
                        <button
                          className="px-[20px] py-[20px] mb-[20px] flex items-center"
                          onClick={() => setPositionVideo(+video.id)}
                        >
                          <div className="rounded-full w-[60px] h-[60px] mr-[20px] flex items-center justify-center bg-white leading-[150%] font-semibold">
                            {video.id}강
                          </div>
                          <div className="leading-[150%] font-semibold text-white">
                            {video.title}
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default LecturePlayLayout;
