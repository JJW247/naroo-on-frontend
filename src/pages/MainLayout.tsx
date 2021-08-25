import { FC } from 'react';
import AdminLecture from '../components/admin/AdminLecture';
import Carousel from '../components/main/Carousel';
import MyLecture from '../components/main/MyLecture';
import OrgCarousel from '../components/main/OrgCarousel';

interface MainLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  userType: string | null;
}

const MainLayout: FC<MainLayoutProps> = ({ token, setToken, userType }) => {
  let mainContents = <MyLecture token={token} setToken={setToken} />;
  if (userType === 'admin') {
    mainContents = <AdminLecture token={token} setToken={setToken} />;
  } else {
    mainContents = (
      <>
        <Carousel />
        <MyLecture token={token} setToken={setToken} />
        <OrgCarousel />
      </>
    );
  }
  return <div className="min-h-screen bg-white font-noto">{mainContents}</div>;
};

export default MainLayout;
