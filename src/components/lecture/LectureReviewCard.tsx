import moment from 'moment';
import { FC } from 'react';
import Star from '../common/Star';

interface LectureReviewCardProps {
  created_at: string;
  id: number;
  nickname: string;
  review: string;
  rating: number;
}

const LectureReviewCard: FC<LectureReviewCardProps> = ({
  created_at,
  id,
  nickname,
  review,
  rating,
}) => {
  return (
    <div className="2xl:px-[130px] xl:px-[98px] 2xl:mb-[26px] xl:mb-[20px] last:mb-0 justify-self-center box-border border-[1px] border-[#DCDEE2] py-[22px]">
      <div className="flex mb-[8px] items-center">
        <div className="font-normal text-[12px] leading-[14px] text-[#808695]">
          <Star width="16" rating={rating} />
        </div>
        <div className="font-medium text-[14px] leading-[150%] text-[#808695] ml-[8px]">
          {nickname}
        </div>
      </div>
      <div className="flex items-center">
        <div className="font-medium text-[14px] leading-[150%] text-[#808695] mb-[8px] mr-[8px]">
          {moment(created_at).format('YYYY년 MM월 DD일 ')}
        </div>
        <div className="font-normal text-[12px] leading-[14px] text-[#808695] mb-[8px]">
          {moment(created_at).format('HH시 mm분')}
        </div>
      </div>
      <div className="font-medium text-[14px] leading-[150%] text-[#515A6E]">
        {review && review}
      </div>
    </div>
  );
};

export default LectureReviewCard;
