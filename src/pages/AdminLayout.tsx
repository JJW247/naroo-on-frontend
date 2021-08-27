import { FC } from 'react';
import AdminLecture from '../components/admin/AdminLecture';

import { getAllLectures, getAllStudents, getAllTeachers } from '../hooks/api';

interface AdminLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const AdminLayout: FC<AdminLayoutProps> = ({ token, setToken }) => {
  const allLectures = getAllLectures();
  const teachers = getAllTeachers(token);
  const students = getAllStudents(token);
  return (
    <div className="min-h-screen bg-white font-noto">
      <AdminLecture
        token={token}
        setToken={setToken}
        teachers={teachers}
        allLectures={allLectures}
        students={students}
      />
    </div>
  );
};

export default AdminLayout;
