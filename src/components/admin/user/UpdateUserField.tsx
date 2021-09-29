import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FC, FormEvent, FormEventHandler, useState } from 'react';
import { toast } from 'react-toastify';
import { MutatorCallback } from 'swr/dist/types';
import { useInput } from '../../../hooks';
import { IStudentEdit } from '../../../interfaces';

interface UpdateUserFieldProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  fieldType: string;
  id: string;
  userField: string | null;
  mutate:
    | ((
        data?:
          | IStudentEdit[]
          | Promise<IStudentEdit[]>
          | MutatorCallback<IStudentEdit[]>
          | undefined,
        shouldRevalidate?: boolean | undefined,
      ) => Promise<IStudentEdit[] | undefined>)
    | ((
        data?:
          | IStudentEdit
          | Promise<IStudentEdit>
          | MutatorCallback<IStudentEdit>
          | undefined,
        shouldRevalidate?: boolean | undefined,
      ) => Promise<IStudentEdit | undefined>);
}

const UpdateUserField: FC<UpdateUserFieldProps> = ({
  token,
  setToken,
  fieldType,
  id,
  userField,
  mutate,
}) => {
  const [updateToggle, setUpdateToggle] = useState<boolean>(false);
  const [updateFieldName, onChangeUpdateFieldName, setUpdateFieldName] =
    useInput('');
  const onClickUpdateToggle = () => {
    setUpdateToggle(!updateToggle);
    setUpdateFieldName(userField);
  };
  const onSubmitUpdateField: FormEventHandler<HTMLFormElement> | undefined =
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();

        if (!updateFieldName || updateFieldName === userField) {
          setUpdateToggle(!updateToggle);
          setUpdateFieldName(userField);
          return;
        }

        const response = await axios.put(
          `${process.env.REACT_APP_BACK_URL}/user/admin/${id}`,
          {
            [fieldType]: updateFieldName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.statusText === 'OK') {
          setUpdateToggle(!updateToggle);
          mutate();
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
    <>
      {updateToggle ? (
        <form
          className="flex items-center py-[10px]"
          onSubmit={onSubmitUpdateField}
        >
          <div className="w-full">
            <input
              className="rounded-full w-full pl-[14px] pr-[14px] py-1 text-xs text-gray-200 bg-harp mr-1"
              type="text"
              value={updateFieldName ? updateFieldName : ''}
              onChange={onChangeUpdateFieldName}
            />
          </div>
          <input
            className="rounded-[4px] min-w-max mx-[10px]"
            type="submit"
            value="수정"
          />
          <button
            className="rounded-[4px] min-w-max"
            type="button"
            onClick={onClickUpdateToggle}
          >
            취소
          </button>
        </form>
      ) : (
        <div className="flex items-center py-[10px]">
          <div className="w-full">
            <div>
              {fieldType === 'email'
                ? '이메일 : '
                : fieldType === 'nickname'
                ? '닉네임 : '
                : fieldType === 'phone'
                ? '휴대폰 번호 : '
                : ''}
              {userField && userField}
              {!userField &&
                fieldType === 'password' &&
                '보안을 위해 기존 비밀번호 확인은 불가능하며, 새로운 비밀번호를 설정하는 것은 가능합니다!'}
            </div>
          </div>
          <FontAwesomeIcon
            className="mx-[10px]"
            icon={faEdit}
            onClick={onClickUpdateToggle}
          />
        </div>
      )}
    </>
  );
};

export default UpdateUserField;
