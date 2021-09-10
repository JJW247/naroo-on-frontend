import { FC } from 'react';
import OrgCarousel from '../components/main/OrgCarousel';
import {
  getAllLectures,
  getApprovedLectures,
  getResourceContent,
} from '../hooks/api';
import NoticeCarousel from '../components/main/NoticeCarousel';
import LectureCarousel from '../components/main/LectureCarousel';

interface MainLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const MainLayout: FC<MainLayoutProps> = ({ token, setToken }) => {
  const allLectures = getAllLectures();
  const lectures = getApprovedLectures(token);
  const noticeCarousel = getResourceContent('notice_carousel');
  const orgCarousel = getResourceContent('org_carousel');
  return (
    <div className="max-w-full min-h-screen mx-auto bg-white font-noto">
      <NoticeCarousel noticeCarousel={noticeCarousel} />
      <LectureCarousel
        token={token}
        setToken={setToken}
        lectures={lectures}
        allLectures={allLectures}
      />
      <OrgCarousel orgCarousel={orgCarousel} />
    </div>
  );
};

export default MainLayout;
