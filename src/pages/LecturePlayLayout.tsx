import { useState } from 'react';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import Tag from '../components/common/Tag';
import { useGetSWR } from '../hooks/api';
import { ILectureVideoDetail } from '../interfaces';

interface LecturePlayLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const LecturePlayLayout: FC<LecturePlayLayoutProps> = ({ token, setToken }) => {
  const { id } = useParams<{ id: string }>();
  const [positionVideo, setPositionVideo] = useState<number>(1);
  const { data: lectureVideoData } = useGetSWR<ILectureVideoDetail>(
    `${process.env.REACT_APP_BACK_URL}/lecture/video/${id}`,
    token,
    true,
  );
  return (
    <>
      {token &&
        lectureVideoData &&
        lectureVideoData.videos &&
        lectureVideoData.videos.length > 0 && (
          <div className="bg-gray-500">
            {lectureVideoData.status === 'accept' && (
              <>
                {lectureVideoData.tags && lectureVideoData.tags.length > 0 && (
                  <div className="flex p-[10px]">
                    {lectureVideoData.tags.map((tag) => {
                      return <Tag key={tag.id} name={tag.name} />;
                    })}
                  </div>
                )}
                <div className="w-[100vw] flex">
                  {lectureVideoData.videos.map((video) => {
                    if (+video.id === positionVideo) {
                      return (
                        <div
                          key={video.id + video.url}
                          className="flex-grow w-full"
                        >
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
                      {lectureVideoData.videos.map((video) => {
                        return (
                          <button
                            key={video.id + video.url}
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
              </>
            )}
            {lectureVideoData.status !== 'accept' && (
              <>
                <div className="flex p-[10px] items-center">
                  <div className="text-white text-xs py-1">
                    잘못된 접근입니다!
                  </div>
                </div>
                <div className="w-[100vw] flex">
                  <div className="flex-grow w-full min-h-[69.1vh] max-h-[69.1vh]">
                    <Skeleton className="w-[80%] p-0 m-0 h-full" />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
    </>
  );
};

export default LecturePlayLayout;
