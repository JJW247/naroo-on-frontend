import { FC } from 'react';

const dummyLecture = {
  id: 0,
  url: 'https://player.vimeo.com/video/587581144?h=e542768ad0',
};

const LetureDetailComponent: FC = () => {
  return (
    <>
      <div className="my-4 pt-4 pl-2 block w-full h-0 pb-56 relative">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={dummyLecture.url}
          title="Vimeo video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default LetureDetailComponent;
