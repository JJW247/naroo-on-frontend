import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FC } from 'react';
import { SWRResponse } from 'swr';
import { ITeacherEditInAdmin } from '../../interfaces';
import UpdateUserField from './user/UpdateUserField';

interface TeacherEditProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  teachers: SWRResponse<ITeacherEditInAdmin[], any>;
}

const TeacherEdit: FC<TeacherEditProps> = ({ token, setToken, teachers }) => {
  const onClickDeleteUser = async (id: string) => {
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
        teachers.mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="mt-[30px]">
      {teachers.data &&
        teachers.data.map((teacher) => (
          <>
            {teacher.id && (
              <div className="border-2 rounded">
                <div>
                  {teacher.email && (
                    <UpdateUserField
                      token={token}
                      setToken={setToken}
                      fieldType="email"
                      id={teacher.id}
                      userField={teacher.email}
                      mutate={teachers.mutate}
                    />
                  )}
                  {teacher.nickname && (
                    <UpdateUserField
                      token={token}
                      setToken={setToken}
                      fieldType="nickname"
                      id={teacher.id}
                      userField={teacher.nickname}
                      mutate={teachers.mutate}
                    />
                  )}
                  <UpdateUserField
                    token={token}
                    setToken={setToken}
                    fieldType="password"
                    id={teacher.id}
                    userField={null}
                    mutate={teachers.mutate}
                  />
                  {teacher.phone && (
                    <UpdateUserField
                      token={token}
                      setToken={setToken}
                      fieldType="phone"
                      id={teacher.id}
                      userField={teacher.phone}
                      mutate={teachers.mutate}
                    />
                  )}
                  <UpdateUserField
                    token={token}
                    setToken={setToken}
                    fieldType="introduce"
                    id={teacher.id}
                    userField={teacher.introduce ? teacher.introduce : ''}
                    mutate={teachers.mutate}
                  />
                </div>
                <button className="block w-full">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => {
                      teacher.id ? onClickDeleteUser(teacher.id) : null;
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

export default TeacherEdit;
