import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FC } from 'react';
import { toast } from 'react-toastify';
import { DataResponse } from '../../hooks/api';
import { IUserEdit } from '../../interfaces';
import UpdateUserField from './user/UpdateUserField';

interface UserEditProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  users: DataResponse<IUserEdit[]>;
}

const UserEdit: FC<UserEditProps> = ({ token, setToken, users }) => {
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
        users.mutate();
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
      {users.data &&
        users.data
          .sort((a, b) => +a.id - +b.id)
          .map((user) => (
            <div key={user.id ? user.id : null}>
              {user.id && (
                <div
                  className={`border-[1px] rounded-[4px] p-[20px] my-[20px] ${
                    user.role === 'admin'
                      ? 'border-[3px] border-red-700'
                      : 'border-black'
                  }`}
                >
                  <div>
                    {user.email && (
                      <UpdateUserField
                        token={token}
                        setToken={setToken}
                        fieldType="email"
                        id={user.id}
                        userField={user.email}
                        mutate={users.mutate}
                      />
                    )}
                    {user.nickname && (
                      <UpdateUserField
                        token={token}
                        setToken={setToken}
                        fieldType="nickname"
                        id={user.id}
                        userField={user.nickname}
                        mutate={users.mutate}
                      />
                    )}
                    <UpdateUserField
                      token={token}
                      setToken={setToken}
                      fieldType="password"
                      id={user.id}
                      userField={null}
                      mutate={users.mutate}
                    />
                    {user.phone && (
                      <UpdateUserField
                        token={token}
                        setToken={setToken}
                        fieldType="phone"
                        id={user.id}
                        userField={user.phone}
                        mutate={users.mutate}
                      />
                    )}
                  </div>
                  <button
                    className={`${
                      user.role === 'admin' ? 'hidden' : 'block'
                    } border-[1px] mx-auto mt-[10px] rounded-[4px] w-[10vw]`}
                  >
                    삭제
                    <FontAwesomeIcon
                      className="ml-[1vw]"
                      icon={faTrash}
                      onClick={() => {
                        user.id ? onClickDeleteUser(user.id) : null;
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

export default UserEdit;
