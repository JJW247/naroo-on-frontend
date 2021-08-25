import { FC } from 'react';
import { getAllLectures } from '../../hooks/api';
import Card from './Card';

interface CardsProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
}

const Cards: FC<CardsProps> = ({ token, setToken }) => {
  const lectures = getAllLectures();
  console.log(lectures);
  return (
    <div className="grid grid-flow-row grid-cols-4 gap-6">
      <Card
        title="[C++과 언리얼로 만드는 MMORPG 게임 개발 시리즈] Part1: C++ 프로그래밍 입문"
        thumbnail="https://cdn.inflearn.com/public/courses/326162/cover/fe5368b1-e25b-4f7c-a670-b775f9e429c6"
        teacherName="Rookiss"
      />
      <Card
        title="UIKit - iOS14 실무 가이드 <iOS앱 진짜 개발자 되기>"
        thumbnail="https://cdn.inflearn.com/public/courses/327148/cover/f14566b3-1845-48ee-af5f-86555dd273a4/327148-eng.png"
        teacherName="iOS Developer"
      />
      <Card
        title="엑셀 시작하기 : EXCEL 입문(Inflearn Original)"
        thumbnail="https://cdn.inflearn.com/public/courses/326489/cover/6bc2da6b-d7a9-46f9-932c-46cf8deba0af"
        teacherName="마포런"
      />
      <Card
        title="비전공자를 위한 개발자 취업 올인원 가이드 [통합편]"
        thumbnail="https://cdn.inflearn.com/public/courses/326354/cover/1d6f78c0-86a5-4585-b7f5-49d57582e964"
        teacherName="한정수"
      />
    </div>
  );
};

export default Cards;
