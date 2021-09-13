import { FC } from 'react';
import AdminLecture from '../components/admin/AdminLecture';
import { useGetSWR } from '../hooks/api';
import { IStudentEditInAdmin, ITags, ITeacherEditInAdmin } from '../interfaces';

interface AdminLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const AdminLayout: FC<AdminLayoutProps> = ({ token, setToken }) => {
  const teachers = useGetSWR<ITeacherEditInAdmin[]>(
    `${process.env.REACT_APP_BACK_URL}/auth/admin/teacher`,
    token,
  );
  const students = useGetSWR<IStudentEditInAdmin[]>(
    `${process.env.REACT_APP_BACK_URL}/auth/admin/student`,
    token,
  );
  const tags = useGetSWR<ITags[]>(
    `${process.env.REACT_APP_BACK_URL}/lecture/admin/tag`,
    token,
  );
  return (
    <div className="min-h-screen bg-white font-noto">
      <AdminLecture
        token={token}
        setToken={setToken}
        teachers={teachers}
        students={students}
        tags={tags}
      />
    </div>
  );
};

export default AdminLayout;
