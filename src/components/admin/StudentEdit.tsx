import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FC } from 'react';
import { toast } from 'react-toastify';
import { DataResponse } from '../../hooks/api';
import { IStudentEdit } from '../../interfaces';
import UpdateUserField from './user/UpdateUserField';

interface StudentEditProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  students: DataResponse<IStudentEdit[]>;
}

const StudentEdit: FC<StudentEditProps> = ({ token, setToken, students }) => {
  const onClickDeleteUser = async (id: string | null) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/user/admin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'OK') {
        students.mutate();
      }
    } catch (error: any) {
      console.error(error);
      const messages = error.response.data.message;
      if (Array.isArray(messages)) {
        messages.map((message) => {
          toast.error(message);
        });
      } else {
        toast.error(messages);
      }
    }
  };
  return (
    <div className="mt-[30px]">
      {students.data &&
        students.data
          .sort((a, b) => +a.id - +b.id)
          .map((student) => (
            <div key={student.id ? student.id : null}>
              {student.id && (
                <div className="border-2 rounded p-[20px]">
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
                  <button className="block border-[1px] mx-auto mt-[10px] rounded-[4px] w-[10vw]">
                    삭제
                    <FontAwesomeIcon
                      className="ml-[1vw]"
                      icon={faTrash}
                      onClick={() => {
                        student.id ? onClickDeleteUser(student.id) : null;
                      }}
                    />
                  </button>
                </div>
              )}
            </div>
          ))}
    </div>
  );
};

export default StudentEdit;
