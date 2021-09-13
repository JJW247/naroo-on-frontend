import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FC, FormEvent, useCallback, useMemo, useState } from 'react';
import { MutatorCallback } from 'swr/dist/types';
import { useInput } from '../../../hooks';
import { ILectureInListAdmin } from '../../../interfaces';
import Select from 'react-select';
import { toast } from 'react-toastify';

interface UpdateStatusProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  studentId: string;
  lectureId: string;
  status: string | null;
  mutate: (
    data?:
      | ILectureInListAdmin[]
      | Promise<ILectureInListAdmin[]>
      | MutatorCallback<ILectureInListAdmin[]>
      | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<ILectureInListAdmin[] | undefined>;
}

const UpdateStatus: FC<UpdateStatusProps> = ({
  token,
  setToken,
  studentId,
  lectureId,
  status,
  mutate,
}) => {
  const [updateToggle, setUpdateToggle] = useState<boolean>(false);
  const [updateStatus, setUpdateStatus] = useState(status);
  const statusOptions = useMemo(() => {
    return [
      { value: null, label: '공개' },
      { value: 'apply', label: '승인 대기' },
      { value: 'accept', label: '승인 완료' },
      { value: 'reject', label: '승인 거부' },
      { value: 'invisible', label: '비공개' },
    ];
  }, []);
  const onClickUpdateToggle = () => {
    setUpdateToggle(!updateToggle);
    setUpdateStatus(status);
  };
  const onHandleChange = useCallback(
    (changedOption) => {
      setUpdateStatus(changedOption.value);
    },
    [statusOptions],
  );
  const onSubmitUpdateTag = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      if (updateStatus === status) {
        setUpdateToggle(!updateToggle);
        setUpdateStatus(status);
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/lecture/admin/status/${lectureId}?userId=${studentId}`,
        {
          status: updateStatus,
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
          onSubmit={onSubmitUpdateTag}
        >
          <Select
            className="min-w-full"
            options={statusOptions}
            onChange={onHandleChange}
          />
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
            상태 :{' '}
            {status === null
              ? '공개'
              : status === 'apply'
              ? '승인 대기'
              : status === 'accept'
              ? '승인 완료'
              : status === 'reject'
              ? '승인 거부'
              : status === 'invisible'
              ? '비공개'
              : '오류'}
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

export default UpdateStatus;
