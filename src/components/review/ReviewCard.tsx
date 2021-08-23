import { FC } from 'react';

interface ReviewCardProps {
  id: number;
  nickname: string;
  type: string;
  title: string;
  description: string;
}

const ReviewCard: FC<ReviewCardProps> = ({
  id,
  nickname,
  type,
  title,
  description,
}) => {
  return (
    <li className="w-[1089px] h-[155px] pt-[18px] pb-[18px] pl-[21px] pr-[21px] bg-[#F9F9F9] border-[1px] border-[#DCDDDF] rounded-[4px]">
      <div className="mb-[8px] text-[16px] leading-[22px] text-[#242424]">
        {nickname} 님 ({type})
      </div>
      <div className="mb-[12px] text-[24px] leading-[33px] font-semibold">
        {title}
      </div>
      <div className="mb-[8px] text-[16px] leading-[22px]">{description}</div>
    </li>
  );
};

export default ReviewCard;
