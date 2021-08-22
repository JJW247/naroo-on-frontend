import { FC } from 'react';
import Tags from '../common/Tags';
import DummyPlayCard from '../../assets/images/dummy-play-card.png';

const dummyLecture = {
  id: 0,
  url: 'https://player.vimeo.com/video/587581144?h=e542768ad0',
  title: '테스트 영상',
};

const PlayLectureComponent: FC = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full ml-[360px] mt-[72px]">
        <Tags />
      </div>
      <iframe
        className="mt-[10px] mb-[80px]"
        src={dummyLecture.url}
        width="1200"
        height="675"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={dummyLecture.title}
      ></iframe>
      <img className="mb-[72px]" src={DummyPlayCard} />
    </div>
  );
};

export default PlayLectureComponent;
