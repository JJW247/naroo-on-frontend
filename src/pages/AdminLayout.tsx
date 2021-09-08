import { FC } from 'react';
import AdminLecture from '../components/admin/AdminLecture';

import {
  getAllLectures,
  getAllResources,
  getAllStudents,
  getAllTags,
  getAllTeachers,
} from '../hooks/api';

interface AdminLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const AdminLayout: FC<AdminLayoutProps> = ({ token, setToken }) => {
  const resources = getAllResources(token);
  const allLectures = getAllLectures();
  const teachers = getAllTeachers(token);
  const students = getAllStudents(token);
  const tags = getAllTags(token);
  return (
    <div className="min-h-screen bg-white font-noto">
      <AdminLecture
        token={token}
        setToken={setToken}
        teachers={teachers}
        allLectures={allLectures}
        students={students}
        tags={tags}
        resources={resources}
      />
    </div>
  );
};

export default AdminLayout;
