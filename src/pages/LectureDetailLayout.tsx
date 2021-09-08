import { FC, FormEvent, useCallback, useMemo } from 'react';
import { useParams } from 'react-router';
import Select from 'react-select';
import Star from '../components/common/Star';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { getLecture, getLectureGuest } from '../hooks/api';
import Moment from 'react-moment';
import 'moment/locale/ko';
import moment from 'moment';
import axios from 'axios';
import LectureReviewCard from '../components/lecture/LectureReviewCard';
import { useInput } from '../hooks';

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
  LECTURE_REVIEW: 'lecture_review',
  LECTURE_QNA: 'lecture_qna',
} as const;

export type LECTURE_DETAIL_MENU =
  typeof CONST_LECTURE_DETAIL_MENU[keyof typeof CONST_LECTURE_DETAIL_MENU];

export const CONST_REVIEW_FILTER = {
  REVIEW_RECENT: 'review_recent',
  REVIEW_DESC: 'review_desc',
  REVIEW_ASC: 'review_asc',
  REVIEW_ADD: 'review_add',
} as const;

export type REVIEW_FILTER =
  typeof CONST_REVIEW_FILTER[keyof typeof CONST_REVIEW_FILTER];

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
  const [selectedReviewFilter, setSelectedReviewFilter] =
    useState<REVIEW_FILTER>(CONST_REVIEW_FILTER.REVIEW_RECENT);
  const informationLecture = token
    ? getLecture(token, id)
    : getLectureGuest(id);
  const onPlayLectureHandler = async () => {
    if (informationLecture && informationLecture.data) {
      if (informationLecture.data.status === 'accept') {
        history.push(`/lecture-play/${id}`);
      } else if (informationLecture.data.status === null) {
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
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  const [review, onChangeReview, setReview] = useInput('');
  const [rating, setRating] = useState(null);
  const ratingOptions = useMemo(() => {
    return [
      { value: 1, label: 1 },
      { value: 2, label: 2 },
      { value: 3, label: 3 },
      { value: 4, label: 4 },
      { value: 5, label: 5 },
    ];
  }, []);
  const onHandleRatingChange = useCallback(
    (changedOption) => {
      setRating(changedOption.value);
    },
    [ratingOptions],
  );
  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/lecture/review/${id}`,
        {
          review,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'OK') {
        setReview('');
        setRating(null);
        setSelectedReviewFilter(CONST_REVIEW_FILTER.REVIEW_RECENT);
        informationLecture?.mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [noticeTitle, onChangeNoticeTitle, setNoticeTitle] = useInput('');
  const [noticeDescription, onChangeNoticeDescription, setNoticeDescription] =
    useInput('');
  const onSubmitNoticeHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/lecture/notice/${id}`,
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
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {informationLecture && informationLecture.data && (
        <>
          <div className="w-full h-[506px] bg-gradient-to-br from-[#8DC556] to-[#00A0E9] flex items-center justify-center">
            <img
              className="mr-[32px] rounded-[8px]"
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
                  <div className="flex items-center mb-[12px]">
                    <div className="text-[12px] leading-[14px] font-normal text-white">
                      <Star
                        width="16"
                        rating={
                          informationLecture.data.average_rating
                            ? +informationLecture.data.average_rating
                            : 0
                        }
                      />
                    </div>
                    <div className="ml-[8px] text-white text-[14px] leading-[150%] font-medium">
                      {informationLecture.data.reviews
                        ? informationLecture.data.reviews.length
                        : 0}
                      개의 수강평
                    </div>
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
                      informationLecture.data.status === 'reject' ||
                      (!token && informationLecture.data.status === null)
                        ? 'disabled:opacity-50'
                        : ''
                    }`}
                    disabled={
                      informationLecture.data.status === 'apply' ||
                      informationLecture.data.status === 'reject' ||
                      (!token && informationLecture.data.status === null)
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
                <div className="mt-[13px] text-[14px] leading-[19px] text-white font-semibold">
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
                selectedMenu === CONST_LECTURE_DETAIL_MENU.LECTURE_REVIEW
                  ? 'text-[#8DC556]'
                  : 'text-[#808695]'
              }`}
              onClick={() =>
                setSelectedMenu(CONST_LECTURE_DETAIL_MENU.LECTURE_REVIEW)
              }
            >
              수강 후기
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
              {token &&
                informationLecture.data &&
                (userType === 'admin' ||
                  (userType === 'teacher' &&
                    informationLecture.data.teacher_nickname ===
                      userNickname)) && (
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
                        <label htmlFor="notice_description">
                          공지사항 내용
                        </label>
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
                          </div>
                          <div>작성자 : {notice.creator_nickname}</div>
                          <div>제목 : {notice.title}</div>
                          <div>내용 : {notice.description}</div>
                        </div>
                      );
                    })}
              </div>
            </div>
          )}
          {selectedMenu === CONST_LECTURE_DETAIL_MENU.LECTURE_REVIEW && (
            <div className="max-w-[70%] min-h-[300px] pt-[50px] pb-[60px] ml-[360px] mr-[360px]">
              <div>
                <span className="text-[20px] leading-[150%] font-semibold mr-[10px]">
                  수강후기
                </span>
                <span className="text-[20px] leading-[150%] font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#8DC556] to-[#00A0E9]">
                  {informationLecture.data
                    ? informationLecture.data.average_rating
                    : 0}
                </span>
              </div>
              <div className="flex items-center justify-start pt-[10px] pb-[20px]">
                <button
                  className={`text-[14px] leading-[150%] mr-[20px] ${
                    selectedReviewFilter === CONST_REVIEW_FILTER.REVIEW_RECENT
                      ? 'font-semibold text-[#17233d]'
                      : 'font-medium text-[#808695]'
                  }`}
                  onClick={() =>
                    setSelectedReviewFilter(CONST_REVIEW_FILTER.REVIEW_RECENT)
                  }
                >
                  최신 순
                </button>
                <button
                  className={`text-[14px] leading-[150%] mr-[20px] ${
                    selectedReviewFilter === CONST_REVIEW_FILTER.REVIEW_DESC
                      ? 'font-semibold text-[#17233d]'
                      : 'font-medium text-[#808695]'
                  }`}
                  onClick={() =>
                    setSelectedReviewFilter(CONST_REVIEW_FILTER.REVIEW_DESC)
                  }
                >
                  높은 별점 순
                </button>
                <button
                  className={`text-[14px] leading-[150%] mr-[20px] ${
                    selectedReviewFilter === CONST_REVIEW_FILTER.REVIEW_ASC
                      ? 'font-semibold text-[#17233d]'
                      : 'font-medium text-[#808695]'
                  }`}
                  onClick={() =>
                    setSelectedReviewFilter(CONST_REVIEW_FILTER.REVIEW_ASC)
                  }
                >
                  낮은 별점 순
                </button>
                {token &&
                  userType === 'student' &&
                  informationLecture.data &&
                  informationLecture.data.status === 'accept' && (
                    <button
                      className={`text-[14px] leading-[150%] ${
                        selectedReviewFilter === CONST_REVIEW_FILTER.REVIEW_ADD
                          ? 'font-semibold text-[#17233d]'
                          : 'font-medium text-[#808695]'
                      }`}
                      onClick={() =>
                        setSelectedReviewFilter(CONST_REVIEW_FILTER.REVIEW_ADD)
                      }
                    >
                      후기 작성
                    </button>
                  )}
              </div>
              {selectedReviewFilter === CONST_REVIEW_FILTER.REVIEW_RECENT && (
                <div className="">
                  {informationLecture.data.reviews &&
                    informationLecture.data.reviews
                      .sort((a: any, b: any) => {
                        return (
                          new Date(b.created_at).getTime() -
                          new Date(a.created_at).getTime()
                        );
                      })
                      .map((review) => {
                        return (
                          <LectureReviewCard
                            created_at={review.created_at}
                            id={+review.id}
                            nickname={review.nickname}
                            review={review.review}
                            rating={review.rating}
                          />
                        );
                      })}
                </div>
              )}
              {selectedReviewFilter === CONST_REVIEW_FILTER.REVIEW_DESC && (
                <div className="">
                  {informationLecture.data.reviews &&
                    informationLecture.data.reviews
                      .sort((a: any, b: any) => {
                        return +b.rating - +a.rating;
                      })
                      .map((review) => {
                        return (
                          <LectureReviewCard
                            key={review.id}
                            created_at={review.created_at}
                            id={+review.id}
                            nickname={review.nickname}
                            review={review.review}
                            rating={review.rating}
                          />
                        );
                      })}
                </div>
              )}
              {selectedReviewFilter === CONST_REVIEW_FILTER.REVIEW_ASC && (
                <div className="">
                  {informationLecture.data.reviews &&
                    informationLecture.data.reviews
                      .sort((a: any, b: any) => {
                        return +a.rating - +b.rating;
                      })
                      .map((review) => {
                        return (
                          <LectureReviewCard
                            created_at={review.created_at}
                            id={+review.id}
                            nickname={review.nickname}
                            review={review.review}
                            rating={review.rating}
                          />
                        );
                      })}
                </div>
              )}
              {token &&
                userType === 'student' &&
                informationLecture.data &&
                informationLecture.data.status === 'accept' &&
                selectedReviewFilter === CONST_REVIEW_FILTER.REVIEW_ADD && (
                  <form className="mt-[47px] w-full" onSubmit={onSubmitHandler}>
                    <div className="mt-[67px] mb-[29px]">
                      <div>
                        <label htmlFor="review">수강 후기</label>
                      </div>
                      <textarea
                        className="w-full h-[200px] border-[1px] border-[#C4C4C4]"
                        value={review}
                        onChange={onChangeReview}
                      />
                    </div>
                    <div className="mb-[29px]">
                      <div>
                        <label htmlFor="type">별점</label>
                      </div>
                      <Select
                        options={ratingOptions}
                        onChange={onHandleRatingChange}
                        placeholder="강의 유형을 선택하세요!"
                      />
                    </div>
                    <input
                      type="submit"
                      className="w-full h-[51px] text-[24px] font-semibold leading-[33px] bg-[#0D5B83] text-white mb-[12px]"
                      value="후기 작성"
                    />
                  </form>
                )}
            </div>
          )}
          {selectedMenu === CONST_LECTURE_DETAIL_MENU.LECTURE_QNA && (
            <div className="w-[1554px] min-h-[300px] pt-[50px] pb-[60px] ml-[360px] mr-[360px]">
              강의 문의 사항
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
