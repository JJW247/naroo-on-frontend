import { FC, useState } from 'react';
import { MutatorCallback } from 'swr/dist/types';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import { ILectureInList, ITags } from '../../../interfaces';
import RegisterTag from '../tag/RegisterTag';
import UpdateLectureField from './UpdateLectureField';
import { Link } from 'react-router-dom';

interface LectureEditCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  nickname: string;
  type: string;
  status: string | null;
  expired: string | null;
  tags: ITags[] | [] | null;
  average_rating: string;
  reviews:
    | {
        created_at: string;
        id: string;
        nickname: string;
        review: string;
        rating: number;
      }[]
    | [];
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  allTags: ITags[] | [];
  mutate: (
    data?:
      | ILectureInList[]
      | Promise<ILectureInList[]>
      | MutatorCallback<ILectureInList[]>
      | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<ILectureInList[] | undefined>;
}

const LectureEditCard: FC<LectureEditCardProps> = ({
  id,
  title,
  description,
  thumbnail,
  nickname,
  type,
  status,
  expired,
  tags,
  average_rating,
  reviews,
  token,
  setToken,
  allTags,
  mutate,
}) => {
  const [expiredAt, setExpiredAt] = useState<Date | null>(
    expired ? new Date(expired) : new Date(),
  );
  const onHandleExpiredAt = (date: Date | null) => {
    setExpiredAt(date);
  };
  return (
    <div className="w-[560px] xs:w-[380px] justify-self-center">
      <Link to={`/lecture/${id}`}>
        <img className="rounded-xl" src={thumbnail} alt="lecture" />
      </Link>
      <UpdateLectureField
        token={token}
        setToken={setToken}
        fieldType="thumbnail"
        lectureId={id}
        userField={thumbnail}
        mutate={mutate}
      />
      <div className="mt-3 text-xs bg-white text-shuttle-gray">
        {!expired && <div>강의 만료 일시가 설정되어 있지 않습니다!</div>}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            format="yyyy년 MM월 dd일 hh시 mm분 ss초"
            value={expiredAt}
            margin="normal"
            onChange={onHandleExpiredAt}
            className="w-full"
          />
        </MuiPickersUtilsProvider>
        <div>{type}</div>
      </div>
      <div className="mt-[10px] font-medium text-gray-400 bg-white h-11">
        <UpdateLectureField
          token={token}
          setToken={setToken}
          fieldType="title"
          lectureId={id}
          userField={title}
          mutate={mutate}
        />
      </div>
      <div className="mb-1 text-xs bg-white text-shuttle-gray mt-[10px]">
        {nickname}
        <UpdateLectureField
          token={token}
          setToken={setToken}
          fieldType="title"
          lectureId={id}
          userField={description}
          mutate={mutate}
        />
      </div>
      <RegisterTag
        token={token}
        setToken={setToken}
        lectureId={id}
        allTags={allTags}
        tags={
          tags
            ? tags.length > 0
              ? tags.map((tag) => {
                  return { value: tag.id, label: tag.name };
                })
              : []
            : []
        }
        mutate={mutate}
      />
    </div>
  );
};

export default LectureEditCard;
