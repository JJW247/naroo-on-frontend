import { FC } from 'react';
import OrgCarousel from '../components/main/OrgCarousel';
import { useGetSWR } from '../hooks/api';
import NoticeCarousel from '../components/main/NoticeCarousel';
import LectureCarousel from '../components/main/LectureCarousel';
import { toast } from 'react-toastify';

interface MainLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  requestToken: string | null;
}

const MainLayout: FC<MainLayoutProps> = ({ token, setToken, requestToken }) => {
  try {
    if (requestToken) {
      const { data } = useGetSWR<{ token: string | null }>(
        `${process.env.REACT_APP_BACK_URL}/auth/verify?requestToken=${requestToken}`,
        null,
      );
      if (data) {
        if (data.token) {
          toast.success('이메일 인증이 완료되었습니다!');
          setToken(data.token);
        }
      }
    }
  } catch (error: any) {
    setToken(null);
  } finally {
    return (
      <div className="max-w-full min-h-screen mx-auto bg-white font-noto">
        <NoticeCarousel />
        <LectureCarousel token={token} setToken={setToken} />
        <OrgCarousel />
      </div>
    );
  }
};

export default MainLayout;
