import { FC } from 'react';
import RecentReviewCard from '../components/review/RecentReviewCard';
import { getRecentReviews } from '../hooks/api';

const LectureReviewLayout: FC = () => {
  const recentReviews = getRecentReviews();
  return (
    <div className="flex flex-wrap justify-center">
      <div className="mt-[51px] mb-[12px] w-[1143px] text-[48px] leading-[65px] font-semibold">
        뭘 들어야 하지? 강의 리뷰 살펴보기
      </div>
      <div className="w-[1143px] mb-[51px]">
        마포런에서만 수강할 수 있는 특별한 프로그램을 만나보세요.
      </div>
      <ul>
        {recentReviews &&
          recentReviews.data &&
          recentReviews.data.map((review) => (
            <div className="first:mt-0 mt-[52px] last:mb-[75px]">
              <RecentReviewCard
                key={review.lecture_id + '/' + review.student_id}
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
    </div>
  );
};

export default LectureReviewLayout;
