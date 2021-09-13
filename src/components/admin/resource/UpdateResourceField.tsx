import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import { MutatorCallback } from 'swr/dist/types';
import { useInput } from '../../../hooks';
import { IResources } from '../../../interfaces';

interface UpdateResourceFieldProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  type: string;
  content_id: string;
  content: string | null;
  mutate: (
    data?:
      | IResources[]
      | Promise<IResources[]>
      | MutatorCallback<IResources[]>
      | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<IResources[] | undefined>;
  resourceIndex: number | null;
}

const UpdateResourceField: FC<UpdateResourceFieldProps> = ({
  token,
  setToken,
  type,
  content_id,
  content,
  mutate,
  resourceIndex,
}) => {
  const [updateToggle, setUpdateToggle] = useState<boolean>(false);
  const [updateFieldName, onChangeUpdateFieldName, setUpdateFieldName] =
    useInput('');
  const onClickUpdateToggle = () => {
    setUpdateToggle(!updateToggle);
    setUpdateFieldName(content);
  };
  const onSubmitUpdateResource = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      if (!updateFieldName || updateFieldName === content) {
        setUpdateToggle(!updateToggle);
        setUpdateFieldName(content);
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/resource`,
        {
          type,
          content_id,
          content: updateFieldName,
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
  const onClickDeleteResource = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/resource/${content_id}?type=${type}`,
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
  const [resourceUrl, onChangeResourceUrl, setResourceUrl] = useInput('');
  const onSubmitAddHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      if (!resourceUrl) {
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/resource`,
        {
          type,
          content: resourceUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.statusText === 'Created') {
        mutate();
        setResourceUrl('');
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
      {(type === 'notice_carousel' || type === 'org_carousel') &&
        +content_id === 0 && (
          <form className="w-full p-[10px]" onSubmit={onSubmitAddHandler}>
            <div className="flex items-center mb-[10px]">
              <label
                className="min-w-max text-[16px] leading-[22px] mb-[10px]"
                htmlFor="resource"
              >
                이미지 URL
              </label>
              <input
                className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
                type="text"
                value={resourceUrl}
                onChange={onChangeResourceUrl}
              />
            </div>
            <input
              type="submit"
              className="w-full h-[51px] text-[24px] font-semibold leading-[33px] bg-[#0D5B83] text-white mb-[12px]"
              value="리소스 추가"
            />
          </form>
        )}
      {updateToggle ? (
        <form
          className="flex items-center py-[10px]"
          onSubmit={onSubmitUpdateResource}
        >
          <div className="w-full">
            <input
              className="rounded-full w-full pl-[14px] pr-[14px] py-1 text-xs text-gray-200 bg-harp mr-1"
              type="text"
              value={updateFieldName}
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
            onClick={onClickUpdateToggle}
          >
            취소
          </button>
        </form>
      ) : (
        <div className="flex items-center p-[10px]">
          <div className="w-full">
            <div>
              {type === 'notice_carousel' || type === 'org_carousel' ? (
                <>{`#${
                  resourceIndex && resourceIndex >= 0 && resourceIndex
                } : `}</>
              ) : (
                ''
              )}
              {content && content}
            </div>
          </div>
          <FontAwesomeIcon
            className="mx-[10px]"
            icon={faEdit}
            onClick={onClickUpdateToggle}
          />
          {+content_id !== 0 && (
            <FontAwesomeIcon icon={faTrash} onClick={onClickDeleteResource} />
          )}
        </div>
      )}
    </>
  );
};

export default UpdateResourceField;
