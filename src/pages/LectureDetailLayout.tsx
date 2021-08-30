import { FC } from 'react';
import { useParams } from 'react-router';
import Dummy from '../assets/images/dummy-lecture.png';
import Star from '../components/common/Star';
import UserIcon from '../assets/images/User.svg';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { getLecture, getLectureGuest } from '../hooks/api';
import Moment from 'react-moment';
import 'moment/locale/ko';
import axios from 'axios';

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
        history.push(`/lecture-play/${id}`, {
          lecture: informationLecture.data,
        });
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
          <div className="w-full h-[380px] bg-[#696969] flex items-center justify-center">
            <img
              className="mr-[81px]"
              width="281px"
              height="281px"
              src={
                informationLecture.data.thumbnail
                  ? informationLecture.data.thumbnail
                  : Dummy
              }
            />
            <div>
              <div className="w-[754px] mb-[41px] text-white text-[52px] text-center font-semibold">
                {informationLecture.data.title && informationLecture.data.title}
              </div>
              <div className="flex">
                <div>
                  <button
                    onClick={onPlayLectureHandler}
                    className={`w-[336px] h-[66px] text-white text-[36px] font-semibold leading-[49px] bg-[#58BFDE] ${
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
                    {token &&
                      informationLecture.data.status === null &&
                      '지금 수강하러 가기'}
                    {informationLecture.data.status === 'apply' && '승인 대기'}
                    {informationLecture.data.status === 'reject' && '승인 거부'}
                    {!token &&
                      informationLecture.data.status === null &&
                      '로그인 필요'}
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
                <div className="ml-[132px]">
                  <div className="text-[18px] mb-[5px] text-white leading-[25px] font-semibold">
                    현재 100명이 수강하고 있어요!
                  </div>
                  <div className="mb-[6px] flex flex-row-reverse items-center text-white text-[14px] leading-[19px] font-extrabold">
                    <u>
                      {informationLecture.data.nickname
                        ? informationLecture.data.nickname
                        : ''}
                    </u>
                    <img className="mr-[4px]" src={UserIcon} />
                  </div>
                  <div className="mb-[9px] text-right text-white text-[14px] leading-[19px] font-extrabold">
                    {informationLecture.data.reviews
                      ? informationLecture.data.reviews.length
                      : 0}
                    개의 수강평
                  </div>
                  <div className="float-right text-white text-[14px] leading-[19px] font-extrabold">
                    <Star
                      width="16"
                      rating={
                        informationLecture.data.average_rating
                          ? +informationLecture.data.average_rating
                          : 0
                      }
                    />
                  </div>
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
            <div className="w-[1554px] min-h-[300px] pt-[50px] pb-[60px] ml-[360px] mr-[360px]">
              {informationLecture.data.description &&
                informationLecture.data.description}
            </div>
          )}
          {selectedMenu === CONST_LECTURE_DETAIL_MENU.LECTURE_NOTICE && (
            <div className="w-[1554px] min-h-[300px] pt-[50px] pb-[60px] ml-[360px] mr-[360px]">
              강의 공지사항
            </div>
          )}
          {selectedMenu === CONST_LECTURE_DETAIL_MENU.LECTURE_REVIEW && (
            <div className="w-[1554px] min-h-[300px] pt-[50px] pb-[60px] ml-[360px] mr-[360px]">
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
