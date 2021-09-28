import { FC, FormEvent } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useGetSWR } from '../hooks/api';
import Moment from 'react-moment';
import 'moment/locale/ko';
import moment from 'moment';
import axios from 'axios';
import { useInput } from '../hooks';
import { toast } from 'react-toastify';
import { ILectureDetail } from '../interfaces';

interface LetcureDetailLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  userType: string | null;
  userNickname: string | null;
}

export const CONST_LECTURE_DETAIL_MENU = {
  LECTURE_INTRODUCE: 'lecture_introduce',
  LECTURE_NOTICE: 'lecture_notice',
  LECTURE_QNA: 'lecture_qna',
} as const;

export type LECTURE_DETAIL_MENU =
  typeof CONST_LECTURE_DETAIL_MENU[keyof typeof CONST_LECTURE_DETAIL_MENU];

const LetcureDetailLayout: FC<LetcureDetailLayoutProps> = ({
  token,
  setToken,
  userType,
  userNickname,
}) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [selectedMenu, setSelectedMenu] = useState<LECTURE_DETAIL_MENU>(
    CONST_LECTURE_DETAIL_MENU.LECTURE_INTRODUCE,
  );
  const informationLecture = token
    ? useGetSWR<ILectureDetail>(
        `${process.env.REACT_APP_BACK_URL}/lecture/${id}`,
        token,
        true,
      )
    : useGetSWR<ILectureDetail>(
        `${process.env.REACT_APP_BACK_URL}/lecture/guest/${id}`,
        null,
        true,
      );
  const onPlayLectureHandler = async () => {
    if (informationLecture && informationLecture.data) {
      if (informationLecture.data.status === 'accept') {
        history.push(`/lecture-play/${id}`);
      } else if (!informationLecture.data.status) {
        if (token !== '' && userType === 'student') {
          try {
            const response = await axios.put(
              `${process.env.REACT_APP_BACK_URL}/lecture/${id}`,
              null,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            if (response.statusText === 'OK') {
              await informationLecture.mutate();
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
        } else {
          history.push('/signin');
        }
      }
    }
  };
  const [noticeTitle, onChangeNoticeTitle, setNoticeTitle] = useInput('');
  const [noticeDescription, onChangeNoticeDescription, setNoticeDescription] =
    useInput('');
  const onSubmitNoticeHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/lecture/admin/notice/${id}`,
        {
          title: noticeTitle,
          description: noticeDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'OK') {
        setNoticeTitle('');
        setNoticeDescription('');
        informationLecture?.mutate();
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
  const onClickDeleteNoticeHandler = async (noticeId: string) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/lecture/admin/notice/${informationLecture.data?.id}?id=${noticeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'OK') {
        informationLecture.mutate();
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
  const [questionTitle, onChangeQuestionTitle, setQuestionTitle] = useInput('');
  const [
    questionDescription,
    onChangeQuestionDescription,
    setQuestionDescription,
  ] = useInput('');
  const onSubmitQuestionHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/lecture/question/${id}`,
        {
          title: questionTitle,
          description: questionDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'Created') {
        setQuestionTitle('');
        setQuestionDescription('');
        informationLecture?.mutate();
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
  const onClickDeleteQuestionHandler = async (questionId: string) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/lecture/admin/question/${informationLecture.data?.id}?id=${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'OK') {
        informationLecture.mutate();
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
  const [answerTitle, onChangeAnswerTitle, setAnswerTitle] = useInput('');
  const [answerDescription, onChangeAnswerDescription, setAnswerDescription] =
    useInput('');
  const onSubmitAnswerHandler = async (
    event: FormEvent<HTMLFormElement>,
    questionId: string,
  ) => {
    try {
      event.preventDefault();
      console.log(questionId);
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/lecture/admin/answer`,
        {
          question_id: questionId.toString(),
          title: answerTitle,
          description: answerDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'Created') {
        setAnswerTitle('');
        setAnswerDescription('');
        informationLecture?.mutate();
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
  const onClickDeleteAnswerHandler = async (answerId: string) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/lecture/admin/answer/${answerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'OK') {
        informationLecture.mutate();
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
      {informationLecture && informationLecture.data && (
        <>
          <div className="w-full h-[506px] bg-gradient-to-br from-[#8DC556] to-[#00A0E9] flex items-center justify-center">
            <img
              className="mr-[32px] rounded-[8px] min-w-[555px] max-w-[555px] min-h-[361px] max-h-[361px] object-fill"
              width="555px"
              height="361px"
              src={
                informationLecture.data.thumbnail
                  ? informationLecture.data.thumbnail
                  : ''
              }
            />
            <div>
              <div className="w-[737px] min-h-[96px] mb-[32px] text-white text-[32px] leading-[150%] font-semibold">
                {informationLecture.data.title && informationLecture.data.title}
              </div>
              <div className="text-right text-[18px] mb-[12px] text-white leading-[25px] font-semibold">
                현재{' '}
                {informationLecture.data.users
                  ? informationLecture.data.users
                  : 0}
                명이 수강하고 있어요!
              </div>
              <div className="flex wrap">
                <div className="block w-full">
                  <div className="mb-[6px] flex items-center text-white text-[16px] leading-[150%] font-semibold">
                    <u>
                      {informationLecture.data.teacher_nickname
                        ? informationLecture.data.teacher_nickname
                        : ''}
                    </u>
                  </div>
                  <div className="max-w-[739px] text-[18px] text-white leading-[25px] font-semibold">
                    {informationLecture.data.description
                      ? informationLecture.data.description
                      : ''}
                  </div>
                </div>
              </div>
              <div className="mt-[32px]">
                {(userType === 'student' || !token) && (
                  <button
                    onClick={onPlayLectureHandler}
                    className={`rounded-[4px] w-[176px] h-[54px] text-[#4DBFF0] text-[14px] font-semibold leading-[150%] bg-white ${
                      informationLecture.data.status === 'apply' ||
                      informationLecture.data.status === 'reject'
                        ? 'disabled:opacity-50'
                        : ''
                    }`}
                    disabled={
                      informationLecture.data.status === 'apply' ||
                      informationLecture.data.status === 'reject'
                        ? true
                        : false
                    }
                  >
                    {token && !informationLecture.data.status && '수강 신청'}
                    {informationLecture.data.status === 'apply' && '승인 대기'}
                    {informationLecture.data.status === 'reject' && '승인 거부'}
                    {!token && !informationLecture.data.status && '로그인 필요'}
                    {informationLecture.data.status === 'accept' && '학습 하기'}
                  </button>
                )}
                <div className="mt-[13px] text-[21px] leading-[28.5px] text-white font-semibold">
                  {informationLecture.data.expired && (
                    <Moment
                      date={new Date(informationLecture.data.expired)}
                      durationFromNow
                      filter={(date) => {
                        return date.replace('-', '');
                      }}
                      format="마감까지 DD일 HH시간 mm분 남았어요!"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[64px] flex justify-center items-center">
            <button
              className={`w-[120px] text-[16px] leading-[22px] font-medium ${
                selectedMenu === CONST_LECTURE_DETAIL_MENU.LECTURE_INTRODUCE
                  ? 'text-[#8DC556]'
                  : 'text-[#808695]'
              }`}
              onClick={() =>
                setSelectedMenu(CONST_LECTURE_DETAIL_MENU.LECTURE_INTRODUCE)
              }
            >
              강의 소개
            </button>
            <button
              className={`w-[120px] text-[16px] leading-[22px] font-medium ${
                selectedMenu === CONST_LECTURE_DETAIL_MENU.LECTURE_NOTICE
                  ? 'text-[#8DC556]'
                  : 'text-[#808695]'
              }`}
              onClick={() =>
                setSelectedMenu(CONST_LECTURE_DETAIL_MENU.LECTURE_NOTICE)
              }
            >
              공지사항
            </button>
            <button
              className={`w-[120px] text-[16px] leading-[22px] font-medium ${
                selectedMenu === CONST_LECTURE_DETAIL_MENU.LECTURE_QNA
                  ? 'text-[#8DC556]'
                  : 'text-[#808695]'
              }`}
              onClick={() =>
                setSelectedMenu(CONST_LECTURE_DETAIL_MENU.LECTURE_QNA)
              }
            >
              문의하기
            </button>
          </div>
          {selectedMenu === CONST_LECTURE_DETAIL_MENU.LECTURE_INTRODUCE && (
            <div className="max-w-[1554px] min-h-[300px] pt-[50px] pb-[60px] ml-[360px] mr-[360px] flex flex-wrap justify-center">
              {informationLecture.data.images &&
                Array.isArray(informationLecture.data.images) &&
                informationLecture.data.images.length > 0 &&
                informationLecture.data.images.map((url) => {
                  return (
                    <img
                      key={url}
                      className="mb-[20px] last:mb-0"
                      width="80%"
                      src={url}
                    />
                  );
                })}
            </div>
          )}
          {selectedMenu === CONST_LECTURE_DETAIL_MENU.LECTURE_NOTICE && (
            <div className="max-w-[70%] min-h-[300px] pt-[50px] pb-[60px] ml-[360px] mr-[360px]">
              {token && informationLecture.data && userType === 'admin' && (
                <form
                  className="mt-[47px] w-full"
                  onSubmit={onSubmitNoticeHandler}
                >
                  <div className="mt-[67px] mb-[29px]">
                    <div>
                      <label htmlFor="notice_title">공지사항 제목</label>
                    </div>
                    <input
                      className="w-full border-[1px] border-[#C4C4C4]"
                      type="text"
                      value={noticeTitle}
                      onChange={onChangeNoticeTitle}
                    />
                  </div>
                  <div className="mb-[29px]">
                    <div>
                      <label htmlFor="notice_description">공지사항 내용</label>
                    </div>
                    <textarea
                      className="w-full h-[200px] border-[1px] border-[#C4C4C4]"
                      value={noticeDescription}
                      onChange={onChangeNoticeDescription}
                    />
                  </div>
                  <input
                    type="submit"
                    className="w-full h-[51px] text-[24px] font-semibold leading-[33px] bg-[#0D5B83] text-white mb-[12px]"
                    value="공지사항 등록"
                  />
                </form>
              )}
              <div>
                {informationLecture.data.notices &&
                  informationLecture.data.notices.length > 0 &&
                  informationLecture.data.notices
                    .sort((a: any, b: any) => {
                      return (
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                      );
                    })
                    .map((notice) => {
                      return (
                        <div className="my-[20px] border-2" key={notice.id}>
                          <div className="flex items-center">
                            <div className="font-medium text-[14px] leading-[150%] text-[#808695] mb-[8px] mr-[8px]">
                              {moment(notice.created_at).format(
                                'YYYY년 MM월 DD일 ',
                              )}
                            </div>
                            <div className="font-normal text-[12px] leading-[14px] text-[#808695] mb-[8px]">
                              {moment(notice.created_at).format('HH시 mm분')}
                            </div>
                            <div className="flex-1"></div>
                            {token && userType === 'admin' && (
                              <button
                                className="flex-none max-w-max font-normal text-[12px] leading-[14px] text-[#808695] mr-[8px] mb-[8px]"
                                onClick={() => {
                                  onClickDeleteNoticeHandler(notice.id);
                                }}
                              >
                                삭제
                              </button>
                            )}
                          </div>
                          <div>작성자 : {notice.creator_nickname}</div>
                          <div>제목 : {notice.title}</div>
                          <div>내용 : {notice.description}</div>
                        </div>
                      );
                    })}
                {(!informationLecture.data.notices ||
                  informationLecture.data.notices.length === 0) && (
                  <div className="my-[20px] border-2">
                    <div className="flex items-center justify-center">
                      공지사항이 존재하지 않습니다!
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {selectedMenu === CONST_LECTURE_DETAIL_MENU.LECTURE_QNA && (
            <div className="max-w-[70%] min-h-[300px] pt-[50px] pb-[60px] ml-[360px] mr-[360px]">
              {token && informationLecture.data && userType === 'student' && (
                <form
                  className="mt-[47px] w-full"
                  onSubmit={onSubmitQuestionHandler}
                >
                  <div className="mt-[67px] mb-[29px]">
                    <div>
                      <label htmlFor="question_title">문의 제목</label>
                    </div>
                    <input
                      className="w-full border-[1px] border-[#C4C4C4]"
                      type="text"
                      value={questionTitle}
                      onChange={onChangeQuestionTitle}
                    />
                  </div>
                  <div className="mb-[29px]">
                    <div>
                      <label htmlFor="question_description">문의 내용</label>
                    </div>
                    <textarea
                      className="w-full h-[200px] border-[1px] border-[#C4C4C4]"
                      value={questionDescription}
                      onChange={onChangeQuestionDescription}
                    />
                  </div>
                  <input
                    type="submit"
                    className="w-full h-[51px] text-[24px] font-semibold leading-[33px] bg-[#0D5B83] text-white mb-[12px]"
                    value="문의사항 등록"
                  />
                </form>
              )}
              <div>
                {informationLecture.data.qnas &&
                  informationLecture.data.qnas.length > 0 &&
                  informationLecture.data.qnas
                    .sort((a: any, b: any) => {
                      return (
                        new Date(b.question_created_at).getTime() -
                        new Date(a.question_created_at).getTime()
                      );
                    })
                    .map((qna) => {
                      console.log(qna);
                      return (
                        <>
                          <div
                            className="mt-[20px] border-2"
                            key={qna.question_id}
                          >
                            <div className="flex items-center">
                              <div className="font-medium text-[14px] leading-[150%] text-[#808695] mb-[8px] mr-[8px]">
                                {moment(qna.question_created_at).format(
                                  'YYYY년 MM월 DD일 ',
                                )}
                              </div>
                              <div className="font-normal text-[12px] leading-[14px] text-[#808695] mb-[8px]">
                                {moment(qna.question_created_at).format(
                                  'HH시 mm분',
                                )}
                              </div>
                              <div className="flex-1"></div>
                              {token &&
                                userType === 'student' &&
                                userNickname === qna.creator_nickname && (
                                  <button
                                    className="flex-none max-w-max font-normal text-[12px] leading-[14px] text-[#808695] mr-[8px] mb-[8px]"
                                    onClick={() => {
                                      onClickDeleteQuestionHandler(
                                        qna.question_id,
                                      );
                                    }}
                                  >
                                    삭제
                                  </button>
                                )}
                            </div>
                            <div>작성자 : {qna.creator_nickname}</div>
                            <div>문의 제목 : {qna.question_title}</div>
                            <div>문의 내용 : {qna.question_description}</div>
                          </div>
                          {token &&
                            informationLecture.data &&
                            userType === 'admin' && (
                              <form
                                className="mt-[47px] w-full"
                                onSubmit={(event) => {
                                  onSubmitAnswerHandler(event, qna.question_id);
                                }}
                              >
                                <div className="mt-[67px] mb-[29px]">
                                  <div>
                                    <label htmlFor="answer_title">
                                      응답 제목
                                    </label>
                                  </div>
                                  <input
                                    className="w-full border-[1px] border-[#C4C4C4]"
                                    type="text"
                                    value={answerTitle}
                                    onChange={onChangeAnswerTitle}
                                  />
                                </div>
                                <div className="mb-[29px]">
                                  <div>
                                    <label htmlFor="answer_description">
                                      응답 내용
                                    </label>
                                  </div>
                                  <textarea
                                    className="w-full h-[200px] border-[1px] border-[#C4C4C4]"
                                    value={answerDescription}
                                    onChange={onChangeAnswerDescription}
                                  />
                                </div>
                                <input
                                  type="submit"
                                  className="w-full h-[51px] text-[24px] font-semibold leading-[33px] bg-[#0D5B83] text-white mb-[12px]"
                                  value="응답사항 등록"
                                />
                              </form>
                            )}
                          {qna.answer_id &&
                            qna.answer_title &&
                            qna.answer_description && (
                              <div
                                className="mb-[20px] border-2"
                                key={qna.answer_id}
                              >
                                <div className="flex items-center">
                                  <div className="font-medium text-[14px] leading-[150%] text-[#808695] mb-[8px] mr-[8px]">
                                    {moment(qna.answer_created_at).format(
                                      'YYYY년 MM월 DD일 ',
                                    )}
                                  </div>
                                  <div className="font-normal text-[12px] leading-[14px] text-[#808695] mb-[8px]">
                                    {moment(qna.answer_created_at).format(
                                      'HH시 mm분',
                                    )}
                                  </div>
                                  <div className="flex-1"></div>
                                  {token && userType === 'admin' && (
                                    <button
                                      className="flex-none max-w-max font-normal text-[12px] leading-[14px] text-[#808695] mr-[8px] mb-[8px]"
                                      onClick={() => {
                                        onClickDeleteAnswerHandler(
                                          qna.answer_id,
                                        );
                                      }}
                                    >
                                      삭제
                                    </button>
                                  )}
                                </div>
                                <div>응답 제목 : {qna.answer_title}</div>
                                <div>응답 내용 : {qna.answer_description}</div>
                              </div>
                            )}
                        </>
                      );
                    })}
                {(!informationLecture.data.qnas ||
                  informationLecture.data.qnas.length === 0) && (
                  <div className="my-[20px] border-2">
                    <div className="flex items-center justify-center">
                      문의사항이 존재하지 않습니다!
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
      {(!informationLecture || !informationLecture.data) && (
        <div className="w-[1554px] h-[500px] ml-[360px] mr-[360px] flex justify-center items-center">
          해당 강의는 존재하지 않습니다!
        </div>
      )}
    </>
  );
};

export default LetcureDetailLayout;
