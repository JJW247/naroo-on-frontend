import { FC, FormEvent, FormEventHandler, useState } from 'react';
import 'moment/locale/ko';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ILectureDetail } from '../../interfaces';
import { MutatorCallback } from 'swr/dist/types';
import { useInput } from '../../hooks';

interface LectureNoticeProps {
  token: string | null;
  userType: string | null;
  mutate: (
    data?:
      | ILectureDetail
      | Promise<ILectureDetail>
      | MutatorCallback<ILectureDetail>
      | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<ILectureDetail | undefined>;
  lecture_id: string;
  array_index: number;
  id: string;
  created_at: string;
  title: string;
  description: string;
}

const LectureNotice: FC<LectureNoticeProps> = ({
  token,
  userType,
  mutate,
  lecture_id,
  array_index,
  id,
  created_at,
  title,
  description,
}) => {
  const [isShowDescription, setIsShowDescription] = useState<boolean>(false);
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
  const [updateTitle, onChangeUpdateTitle, setUpdateTitle] = useInput(title);
  const [updateDescription, onChangeUpdateDescription, setUpdateDescription] =
    useInput(description);
  const onClickDeleteNoticeHandler = async (noticeId: string) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/lecture/admin/notice/${lecture_id}?id=${noticeId}`,
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
  const onSubmitUpdateNoticeHandler: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    try {
      event.preventDefault();
      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/lecture/admin/notice/modify/${lecture_id}?notice_id=${id}`,
        {
          title: updateTitle,
          description: updateDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'OK') {
        setTimeout(() => {
          mutate();
          setIsShowEdit(false);
        }, 500);
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
    <form onSubmit={onSubmitUpdateNoticeHandler}>
      <div
        className="min-h-[41px] max-h-[41px] bg-white flex"
        onClick={(event) => {
          setIsShowEdit(false);
          setIsShowDescription(!isShowDescription);
        }}
      >
        <div className="w-full flex items-center min-h-[41px] max-h-[41px]">
          <div className="flex-none min-w-[60px] max-w-[60px] flex justify-center items-center">
            <div className="text-[14px] leading-[150%] text-[#DCDEE2]">
              {array_index}
            </div>
          </div>
          {isShowEdit ? (
            <input
              className="flex-none min-w-[792px] max-w-[792px] flex justify-start items-center border-[1px] rounded-[4px] my-[10px] p-[4px] text-[14px] leading-[150%] text-[#515A6E]"
              value={updateTitle}
              onChange={onChangeUpdateTitle}
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
          ) : (
            <div className="flex-none min-w-[792px] max-w-[792px] flex justify-start items-center">
              <div className="pl-[8.5px] text-[14px] leading-[150%] text-[#515A6E]">
                {title}
              </div>
            </div>
          )}
          <div className="flex-none min-w-[92px] max-w-[92px] flex justify-center items-center">
            <div
              className="text-[14px] leading-[150%] text-[#DCDEE2]"
              title={moment(created_at).format('YYYY년 MM월 DD일 HH시 mm분')}
            >
              {moment(created_at).format('YYYY.MM.DD')}
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
      {isShowDescription ? (
        <>
          {token && userType === 'admin' && (
            <>
              {isShowEdit ? (
                <div className="w-full min-h-[41px] max-h-[41px] bg-white flex justify-end items-center">
                  <div className="flex-1"></div>
                  <button
                    className="flex-none rounded-[4px] border-[1px] border-[#EBEEEF] max-w-max font-normal text-[12px] leading-[14px] text-[#808695] p-[4px]"
                    type="submit"
                  >
                    수정 완료
                  </button>
                  <button
                    className="flex-none rounded-[4px] border-[1px] border-[#EBEEEF] max-w-max font-normal text-[12px] leading-[14px] text-[#808695] mx-[8px] p-[4px]"
                    type="button"
                    onClick={() => {
                      setIsShowEdit(false);
                    }}
                  >
                    수정 취소
                  </button>
                </div>
              ) : (
                <div className="w-full min-h-[41px] max-h-[41px] bg-white flex justify-end items-center">
                  <div className="flex-1"></div>
                  <button
                    className="flex-none rounded-[4px] border-[1px] border-[#EBEEEF] max-w-max font-normal text-[12px] leading-[14px] text-[#808695] p-[4px]"
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      setIsShowEdit(true);
                    }}
                  >
                    수정
                  </button>
                  <button
                    className="flex-none rounded-[4px] border-[1px] border-[#EBEEEF] max-w-max font-normal text-[12px] leading-[14px] text-[#808695] mx-[8px] p-[4px]"
                    type="button"
                    onClick={() => {
                      onClickDeleteNoticeHandler(id);
                    }}
                  >
                    삭제
                  </button>
                </div>
              )}
            </>
          )}
          <div className="w-full min-h-[41px] bg-white flex justify-center items-center">
            {isShowEdit ? (
              <textarea
                className="w-full border-[1px] rounded-[4px] mx-[10px] mb-[10px] p-[4px] text-[14px] leading-[150%] text-[#515A6E]"
                value={updateDescription}
                onChange={onChangeUpdateDescription}
              />
            ) : (
              <div className="text-[14px] leading-[150%] text-[#515A6E]">
                {description}
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </form>
  );
};

export default LectureNotice;
