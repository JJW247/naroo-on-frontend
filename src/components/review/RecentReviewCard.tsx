import { FC } from 'react';
import { IRecentReviews } from '../../interfaces';
import Star from '../common/Star';

const RecentReviewCard: FC<IRecentReviews> = ({
  created_at,
  student_id,
  student_nickname,
  lecture_id,
  lecture_title,
  review,
  rating,
}) => {
  return (
    <li className="w-[1089px] h-[155px] pt-[18px] pb-[18px] pl-[21px] pr-[21px] bg-[#F9F9F9] border-[1px] border-[#DCDDDF] rounded-[4px]">
      <div className="flex items-center mb-[8px] text-[16px] leading-[22px] text-[#242424]">
        <div className="mr-[8px]">{student_nickname} 님</div>
        <div>{rating && <Star width="16" rating={+rating} />}</div>
      </div>
      <div className="mb-[12px] text-[24px] leading-[33px] font-semibold">
        {lecture_title}
      </div>
      <div className="mb-[8px] text-[16px] leading-[22px]">{review}</div>
    </li>
  );
};

export default RecentReviewCard;
