import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FC } from 'react';
import { SWRResponse } from 'swr';
import { IStudentEditInAdmin } from '../../interfaces';
import UpdateUserField from './user/UpdateUserField';

interface StudentEditProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  students: SWRResponse<IStudentEditInAdmin[], any>;
}

const StudentEdit: FC<StudentEditProps> = ({ token, setToken, students }) => {
  const onClickDeleteUser = async (id: string | null) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/auth/admin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'OK') {
        students.mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="mt-[30px]">
      {students.data &&
        students.data
          .sort((a, b) => +a.id - +b.id)
          .map((student) => (
            <>
              {student.id && (
                <div className="border-2 rounded">
                  <div>
                    {student.email && (
                      <UpdateUserField
                        token={token}
                        setToken={setToken}
                        fieldType="email"
                        id={student.id}
                        userField={student.email}
                        mutate={students.mutate}
                      />
                    )}
                    {student.nickname && (
                      <UpdateUserField
                        token={token}
                        setToken={setToken}
                        fieldType="nickname"
                        id={student.id}
                        userField={student.nickname}
                        mutate={students.mutate}
                      />
                    )}
                    <UpdateUserField
                      token={token}
                      setToken={setToken}
                      fieldType="password"
                      id={student.id}
                      userField={null}
                      mutate={students.mutate}
                    />
                    {student.phone && (
                      <UpdateUserField
                        token={token}
                        setToken={setToken}
                        fieldType="phone"
                        id={student.id}
                        userField={student.phone}
                        mutate={students.mutate}
                      />
                    )}
                  </div>
                  <button className="block w-full">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => {
                        student.id ? onClickDeleteUser(student.id) : null;
                      }}
                    />
                  </button>
                </div>
              )}
            </>
          ))}
    </div>
  );
};

export default StudentEdit;
