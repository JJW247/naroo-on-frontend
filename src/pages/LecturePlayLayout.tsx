import { FC } from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import DummyPlayCard from '../assets/images/dummy-play-card.png';
import Tag from '../components/common/Tag';
import { ILectureDetail } from '../interfaces';

// https://player.vimeo.com/video/587581144?h=e542768ad0

interface LecturePlayLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const LecturePlayLayout: FC<LecturePlayLayoutProps> = ({ token, setToken }) => {
  const location = useLocation<{ lecture: ILectureDetail }>();
  const { id } = useParams<{ id: string }>();
  if (!token || !location.state) {
    return <div>잘못된 접근입니다!</div>;
  }
  return (
    <>
      {location.state.lecture &&
        location.state.lecture &&
        location.state.lecture.videos && (
          <div className="flex flex-wrap justify-center">
            <div className="w-full ml-[360px] mt-[72px]">
              {location.state.lecture.tags &&
                location.state.lecture.tags.length > 0 && (
                  <div className="mt-5 flex">
                    {location.state.lecture.tags.map((tagName) => {
                      return <Tag name={tagName} />;
                    })}
                  </div>
                )}
            </div>
            {token &&
              location.state.lecture.videos.length > 0 &&
              location.state.lecture.videos.map((videoUrl) => {
                return (
                  <iframe
                    className="mt-[10px] mb-[80px]"
                    src={videoUrl}
                    width="1200"
                    height="675"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                );
              })}
            <img className="mb-[72px]" src={DummyPlayCard} />
          </div>
        )}
    </>
  );
};

export default LecturePlayLayout;
