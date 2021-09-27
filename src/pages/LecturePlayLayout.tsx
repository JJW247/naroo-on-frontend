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
  const { data: lectureVideoData } = useGetSWR<ILectureVideoDetail>(
    `${process.env.REACT_APP_BACK_URL}/lecture/video/${id}`,
    token,
    true,
  );
  return (
    <>
      {token &&
        lectureVideoData &&
        lectureVideoData.video_url &&
        lectureVideoData.video_title && (
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
                  {lectureVideoData.video_title}
                </div>
                <div className="w-[100vw] flex">
                  <div className="flex-grow w-full">
                    <iframe
                      className="w-full min-h-[69.1vh] max-h-[69.1vh]"
                      src={lectureVideoData.video_url}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  )
                </div>
              </>
            )}
            {lectureVideoData.status !== 'accept' && (
              <>
                <div className="flex p-[10px] items-center">
                  <div className="py-1 text-xs text-white">
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
