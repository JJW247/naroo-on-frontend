import { FC } from 'react';
import { useParams } from 'react-router';
import Star from '../components/common/Star';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { getLecture, getLectureGuest } from '../hooks/api';
import Moment from 'react-moment';
import 'moment/locale/ko';
import axios from 'axios';
import LectureReviewCard from '../components/lecture/LectureReviewCard';

interface LetcureDetailLayoutProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
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
} as const;

export type REVIEW_FILTER =
  typeof CONST_REVIEW_FILTER[keyof typeof CONST_REVIEW_FILTER];

const LetcureDetailLayout: FC<LetcureDetailLayoutProps> = ({
  token,
  setToken,
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
                      {informationLecture.data.nickname
                        ? informationLecture.data.nickname
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
            <div className="w-[1554px] min-h-[300px] pt-[50px] pb-[60px] ml-[360px] mr-[360px]">
              강의 공지사항
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
                  className={`text-[14px] leading-[150%] ${
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
