import { FC } from 'react';
import UpdateUserField from '../components/admin/user/UpdateUserField';
import { useGetSWR } from '../hooks/api';
import { IStudentEdit } from '../interfaces';

interface MyInfoLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const MyInfoLayout: FC<MyInfoLayoutProps> = ({ token, setToken }) => {
  const { data: myInfoData, mutate: myInfoMutate } = useGetSWR<IStudentEdit>(
    `${process.env.REACT_APP_BACK_URL}/user/myinfo`,
    token,
    true,
  );
  return (
    <>
      <div className="2xl:max-w-[900px] xl:max-w-[750px] lg:max-w-[600px] md:max-w-[500px] sm:max-w-[400px] xs:max-w-[350px] mx-auto py-[4vh]">
        <div className="text-4xl font-semibold text-center text-gray-400 mb-[4vh]">
          개인 정보 수정
        </div>
        <div className="border-2 rounded">
          {myInfoData && (
            <>
              <div>
                {myInfoData.email && (
                  <UpdateUserField
                    token={token}
                    setToken={setToken}
                    fieldType="email"
                    id={myInfoData.id}
                    userField={myInfoData.email}
                    mutate={myInfoMutate}
                  />
                )}
                {myInfoData.nickname && (
                  <UpdateUserField
                    token={token}
                    setToken={setToken}
                    fieldType="nickname"
                    id={myInfoData.id}
                    userField={myInfoData.nickname}
                    mutate={myInfoMutate}
                  />
                )}
                <UpdateUserField
                  token={token}
                  setToken={setToken}
                  fieldType="password"
                  id={myInfoData.id}
                  userField={null}
                  mutate={myInfoMutate}
                />
                {myInfoData.phone && (
                  <UpdateUserField
                    token={token}
                    setToken={setToken}
                    fieldType="phone"
                    id={myInfoData.id}
                    userField={myInfoData.phone}
                    mutate={myInfoMutate}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MyInfoLayout;
