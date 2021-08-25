import { FC } from 'react';
import ReviewCard from '../components/review/ReviewCard';

const DUMMY_CONTENTS: {
  id: number;
  nickname: string;
  type: string;
  title: string;
  description: string;
}[] = [
  {
    id: 1,
    nickname: '송설아',
    type: '수강생',
    title: '안드로이드 앱 개발을 위한 실전 React Native 배우기',
    description: '좋은 강의 감사합니다. 앞으로도 좋은 프로그램 기대하겠습니다!',
  },
  {
    id: 2,
    nickname: '조정우',
    type: '수강생',
    title:
      '[C++과 언리얼로 만드는 MMORPG 게임 개발 시리즈] Part2: 게임 수학과 DirectX 12',
    description: '좋은 강의 감사합니다. 앞으로도 좋은 프로그램 기대하겠습니다!',
  },
  {
    id: 3,
    nickname: '홍성현',
    type: '수강생',
    title: '빅데이터 분석 솔루션 TEXTOM으로 쉽고 빠르게 배우는 텍스트마이닝',
    description: '좋은 강의 감사합니다. 앞으로도 좋은 프로그램 기대하겠습니다!',
  },
];

const LectureReviewLayout: FC = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className="mt-[51px] mb-[12px] w-[1143px] text-[48px] leading-[65px] font-semibold">
        뭘 들어야 하지? 강의 리뷰 살펴보기
      </div>
      <div className="w-[1143px] mb-[51px]">
        마포런에서만 수강할 수 있는 특별한 프로그램을 만나보세요.
      </div>
      <ul>
        {DUMMY_CONTENTS.map((dummyContent) => (
          <div className="first:mt-0 mt-[52px] last:mb-[75px]">
            <ReviewCard
              key={dummyContent.id}
              id={dummyContent.id}
              nickname={dummyContent.nickname}
              type={dummyContent.type}
              title={dummyContent.title}
              description={dummyContent.description}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default LectureReviewLayout;
