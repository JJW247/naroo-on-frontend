import { FC } from 'react';
import OrgCarousel from '../components/main/OrgCarousel';
import { useGetSWR } from '../hooks/api';
import LectureCarousel from '../components/main/LectureCarousel';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  requestToken: string | null;
}

const MainLayout: FC<MainLayoutProps> = ({ token, setToken, requestToken }) => {
  const history = useHistory();
  try {
    if (requestToken) {
      const { data, error } = useGetSWR<{ token: string | null }>(
        `${process.env.REACT_APP_BACK_URL}/user/verify?requestToken=${requestToken}`,
        null,
        false,
      );
      if (error) {
        console.log(error);
        const messages = error.response?.data?.message;
        if (Array.isArray(messages)) {
          messages.map((message) => {
            toast.error(message);
          });
        } else {
          toast.error(messages);
        }
        setToken('');
        history.replace('/');
      }
      if (data) {
        if (data.token) {
          toast.success('이메일 인증이 완료되었습니다!');
          setToken(data.token);
          history.replace('/');
        }
      }
    }
  } catch (error: any) {
  } finally {
    return (
      <div className="max-w-full min-h-screen mx-auto bg-white font-noto">
        <Link to="/info">
          <img
            className="w-full max-h-[320px] object-fit"
            src={`https://drive.google.com/uc?export=download&id=1a-kBV6dXhXFSc2FxpV29ow0hq3vbtlco`}
          />
        </Link>
        <LectureCarousel token={token} setToken={setToken} />
        <OrgCarousel />
      </div>
    );
  }
};

export default MainLayout;
