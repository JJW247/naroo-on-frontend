import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FC, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { MutatorCallback } from 'swr/dist/types';
import { useInput } from '../../../hooks';
import { ITags } from '../../../interfaces';
import Tag from '../../common/Tag';

interface UpdateTagProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  id: string;
  name: string;
  mutate: (
    data?: ITags[] | Promise<ITags[]> | MutatorCallback<ITags[]> | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<ITags[] | undefined>;
}

const UpdateTag: FC<UpdateTagProps> = ({
  token,
  setToken,
  id,
  name,
  mutate,
}) => {
  const [updateToggle, setUpdateToggle] = useState<boolean>(false);
  const [updateTagName, onChangeUpdateTagName, setUpdateTagName] = useInput('');
  const onClickUpdateToggle = () => {
    setUpdateToggle(!updateToggle);
    setUpdateTagName(name);
  };
  const onSubmitUpdateTag = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      if (!updateTagName || updateTagName === name) {
        setUpdateToggle(!updateToggle);
        setUpdateTagName(name);
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/lecture/admin/tag/${id}`,
        {
          tagName: updateTagName,
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
  const onClickDeleteTag = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/lecture/admin/tag/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'OK') {
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
          onSubmit={onSubmitUpdateTag}
        >
          <div className="w-full">
            <input
              className="rounded-full w-full pl-[14px] pr-[14px] py-1 text-xs text-gray-200 bg-harp mr-1"
              type="text"
              value={updateTagName}
              onChange={onChangeUpdateTagName}
            />
          </div>
          <input
            className="rounded-[4px] min-w-max mx-[10px]"
            type="submit"
            value="수정"
          />
          <button
            className="rounded-[4px] min-w-max"
            onClick={onClickUpdateToggle}
          >
            취소
          </button>
        </form>
      ) : (
        <div className="flex items-center py-[10px]">
          <div className="w-full">
            <Tag name={name} />
          </div>
          <FontAwesomeIcon
            className="mx-[10px]"
            icon={faEdit}
            onClick={onClickUpdateToggle}
          />
          <FontAwesomeIcon icon={faTrash} onClick={onClickDeleteTag} />
        </div>
      )}
    </>
  );
};

export default UpdateTag;
