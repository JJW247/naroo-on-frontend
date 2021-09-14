import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import RecentReviewCard from '../components/review/RecentReviewCard';
import { useGetSWR } from '../hooks/api';
import { IRecentReviews } from '../interfaces';

const LectureReviewLayout: FC = () => {
  const { data: recentReviewsData } = useGetSWR<IRecentReviews[]>(
    `${process.env.REACT_APP_BACK_URL}/lecture/review/recent`,
    null,
    true,
  );
  return (
    <div className="flex flex-wrap justify-center">
      <div className="mt-[51px] mb-[12px] w-[1143px] text-[48px] leading-[65px] font-semibold">
        뭘 들어야 하지? 강의 리뷰 살펴보기
      </div>
      <div className="w-[1143px] mb-[51px]">
        마포런에서만 수강할 수 있는 특별한 프로그램을 만나보세요.
      </div>

      {recentReviewsData && recentReviewsData.length > 0 ? (
        <ul>
          {recentReviewsData.map((review) => (
            <div
              key={review.lecture_id + '/' + review.student_id}
              className="first:mt-0 mt-[52px] last:mb-[75px]"
            >
              <RecentReviewCard
                created_at={review.created_at}
                student_id={review.student_id}
                student_nickname={review.student_nickname}
                lecture_id={review.lecture_id}
                lecture_title={review.lecture_title}
                review={review.review}
                rating={review.rating}
              />
            </div>
          ))}
        </ul>
      ) : (
        <div className="w-[1089px]">
          <Skeleton
            className="w-full h-[155px] first:mt-0 mt-[52px] last:mb-[75px] ml-[21px] mr-[21px] bg-[#F9F9F9] border-[1px] border-[#DCDDDF] rounded-[4px]"
            count={3}
          />
        </div>
      )}
    </div>
  );
};

export default LectureReviewLayout;
