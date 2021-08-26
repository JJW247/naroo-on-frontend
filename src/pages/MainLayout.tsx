import { FC } from 'react';
import AdminLecture from '../components/admin/AdminLecture';
import Carousel from '../components/main/Carousel';
import MyLecture from '../components/main/MyLecture';
import OrgCarousel from '../components/main/OrgCarousel';
import {
  getAllLectures,
  getAllStudents,
  getAllTeachers,
  getApprovedLectures,
} from '../hooks/api';

interface MainLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  userType: string | null;
}

const MainLayout: FC<MainLayoutProps> = ({ token, setToken, userType }) => {
  const allLectures = getAllLectures();
  let mainContents = <></>;
  if (userType === 'admin') {
    const teachers = getAllTeachers(token);
    const students = getAllStudents(token);
    mainContents = (
      <AdminLecture
        token={token}
        setToken={setToken}
        teachers={teachers}
        allLectures={allLectures}
        students={students}
      />
    );
  } else {
    const lectures = getApprovedLectures(token);
    mainContents = (
      <>
        <Carousel />
        <MyLecture
          token={token}
          setToken={setToken}
          lectures={lectures}
          allLectures={allLectures}
        />
        <OrgCarousel />
      </>
    );
  }
  return <div className="min-h-screen bg-white font-noto">{mainContents}</div>;
};

export default MainLayout;
