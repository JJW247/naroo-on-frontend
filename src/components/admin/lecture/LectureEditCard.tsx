import { FC, FormEvent, useCallback, useMemo, useState } from 'react';
import { MutatorCallback } from 'swr/dist/types';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import Select from 'react-select';
import {
  ILectureInList,
  ITags,
  ITeacherEditInAdmin,
} from '../../../interfaces';
import RegisterTag from '../tag/RegisterTag';
import UpdateLectureField from './UpdateLectureField';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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
  teachers: ITeacherEditInAdmin[] | undefined;
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
  teachers,
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
  const onClickDeleteLecture = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/lecture/admin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'OK') {
        mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [updateType, setUpdateType] = useState(type);
  const typesOptions = useMemo(() => {
    return [
      { value: 'online', label: '온라인 강의' },
      { value: 'offline', label: '오프라인 강의' },
    ];
  }, []);
  const onHandleTypesOptionsChange = useCallback(
    (changedOption) => {
      setUpdateType(changedOption.value);
    },
    [typesOptions],
  );
  const [updateTypeToggle, setUpdateTypeToggle] = useState<boolean>(false);
  const onClickUpdateTypeToggle = () => {
    setUpdateTypeToggle(!updateTypeToggle);
    setUpdateType(type);
  };
  const onSubmitUpdateType = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/lecture/admin/${id}`,
        {
          type: updateType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.statusText === 'OK') {
        setUpdateTypeToggle(!updateTypeToggle);
        mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [updateTeacherToggle, setUpdateTeacherToggle] =
    useState<boolean>(false);
  const onClickUpdateTeacherToggle = () => {
    setUpdateTeacherToggle(!updateTeacherToggle);
    setTeacher(null);
  };
  const [updateTeacher, setTeacher] = useState(null);
  const teachersOptions = useMemo(() => {
    const filteredTeachers = [];
    if (teachers) {
      for (const teacher of teachers) {
        filteredTeachers.push({ value: teacher.id, label: teacher.nickname });
      }
    }
    return filteredTeachers;
  }, [teachers]);
  const onHandleTeacherChange = useCallback(
    (changedOption) => {
      setTeacher(changedOption.value);
    },
    [teachersOptions],
  );
  const onSubmitUpdateTeacher = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/lecture/admin/${id}`,
        {
          teacherId: updateTeacher,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.statusText === 'OK') {
        setUpdateTeacherToggle(!updateTeacherToggle);
        mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-[560px] xs:w-[380px] justify-self-center">
      <button
        className="my-[5px] w-full flex justify-center items-center"
        onClick={onClickDeleteLecture}
      >
        <div>강의 삭제하기</div>
        <FontAwesomeIcon className="ml-[20px]" icon={faTrash} />
      </button>
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
      </div>
      {updateTypeToggle ? (
        <form
          className="flex items-center py-[10px]"
          onSubmit={onSubmitUpdateType}
        >
          <label htmlFor="type" className="min-w-max mr-[10px]">
            강의 유형
          </label>
          <div className="w-full">
            <Select
              options={typesOptions}
              onChange={onHandleTypesOptionsChange}
              placeholder="강의 유형을 선택하세요!"
            />
          </div>
          <input
            className="rounded-[4px] min-w-max mx-[10px]"
            type="submit"
            value="수정"
          />
          <button
            className="rounded-[4px] min-w-max"
            onClick={onClickUpdateTypeToggle}
          >
            취소
          </button>
        </form>
      ) : (
        <div className="flex items-center py-[10px]">
          <div className="flex rounded-full text-gray-200 bg-harp w-full items-center p-[10px] text-xs mr-[10px]">
            {type}
          </div>
          <FontAwesomeIcon
            className="mx-[10px]"
            icon={faEdit}
            onClick={onClickUpdateTypeToggle}
          />
        </div>
      )}
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
      {updateTeacherToggle ? (
        <form
          className="flex items-center py-[10px]"
          onSubmit={onSubmitUpdateTeacher}
        >
          <label htmlFor="teacher" className="min-w-max mr-[10px]">
            강사
          </label>
          <div className="w-full">
            <Select
              options={teachersOptions}
              onChange={onHandleTeacherChange}
              placeholder="강사를 선택하세요!"
            />
          </div>
          <input
            className="rounded-[4px] min-w-max mx-[10px]"
            type="submit"
            value="수정"
          />
          <button
            className="rounded-[4px] min-w-max"
            onClick={onClickUpdateTeacherToggle}
          >
            취소
          </button>
        </form>
      ) : (
        <div className="flex items-center py-[10px]">
          <div className="flex rounded-full text-gray-200 bg-harp w-full items-center p-[10px] text-xs mr-[10px]">
            {nickname}
          </div>
          <FontAwesomeIcon
            className="mx-[10px]"
            icon={faEdit}
            onClick={onClickUpdateTeacherToggle}
          />
        </div>
      )}
      <div className="mb-1 text-xs bg-white text-shuttle-gray mt-[10px]">
        <UpdateLectureField
          token={token}
          setToken={setToken}
          fieldType="description"
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
