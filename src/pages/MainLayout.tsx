import { FC } from 'react';
import OrgCarousel from '../components/main/OrgCarousel';
import { useGetSWR } from '../hooks/api';
import LectureCarousel from '../components/main/LectureCarousel';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { IResourceContent } from '../interfaces';
import { isArray } from 'lodash';
import Skeleton from 'react-loading-skeleton';

interface MainLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  requestToken: string | null;
}

const MainLayout: FC<MainLayoutProps> = ({ token, setToken, requestToken }) => {
  const history = useHistory();
  const { data: infoBanner } = useGetSWR<IResourceContent[]>(
    `${process.env.REACT_APP_BACK_URL}/resource/info_banner`,
    null,
    false,
  );
  try {
    if (requestToken) {
      const { data, error } = useGetSWR<{ token: string | null }>(
        `${process.env.REACT_APP_BACK_URL}/user/verify?requestToken=${requestToken}`,
        null,
        false,
      );
      if (error) {
        const messages = error.response?.data?.message;
        if (Array.isArray(messages)) {
          messages.map((message) => {
            toast.error(message);
          });
        } else {
          toast.error(messages);
        }
        setToken('');
        localStorage.setItem('token', '');
        history.replace('/');
      }
      if (data) {
        if (data.token) {
          toast.success('이메일 인증이 완료되었습니다!');
          setToken(data.token);
          localStorage.setItem('token', data.token);
          history.replace('/');
        }
      }
    }
  } catch (error: any) {
  } finally {
    return (
      <div className="max-w-full min-h-screen mx-auto bg-white font-noto">
        {infoBanner && isArray(infoBanner) && infoBanner.length > 0 ? (
          <img
            className="w-full max-h-[380px] object-fit"
            src={infoBanner[0].content}
          />
        ) : (
          <Skeleton className="w-full h-[380px]" />
        )}
        <LectureCarousel token={token} setToken={setToken} />
        <OrgCarousel />
      </div>
    );
  }
};

export default MainLayout;
