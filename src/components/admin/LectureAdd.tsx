import axios from 'axios';
import { FC, FormEvent, useCallback, useMemo, useState } from 'react';
import { useInput } from '../../hooks';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import { ILectureInList, ITeacherEditInAdmin } from '../../interfaces';
import { ADMIN_MENU, CONST_ADMIN_MENU } from './AdminLecture';
import { toast } from 'react-toastify';
import { MutatorCallback } from 'swr/dist/types';

interface LectureAddProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  setSelectedMenu: React.Dispatch<React.SetStateAction<ADMIN_MENU>>;
  allLecturesData: ILectureInList[] | undefined;
  allLecturesMutate: (
    data?:
      | ILectureInList[]
      | Promise<ILectureInList[]>
      | MutatorCallback<ILectureInList[]>
      | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<ILectureInList[] | undefined>;
  teachers: ITeacherEditInAdmin[] | undefined;
}

const LectureAdd: FC<LectureAddProps> = ({
  token,
  setToken,
  setSelectedMenu,
  allLecturesData,
  allLecturesMutate,
  teachers,
}) => {
  const [title, onChangeTitle] = useInput('');
  const [thumbnail, onChangeThumbnail] = useInput('');
  const [description, onChangeDescription] = useInput('');
  const [type, setType] = useState('online');
  const typesOptions = useMemo(() => {
    return [
      { value: 'online', label: '온라인 강의' },
      { value: 'offline', label: '오프라인 강의' },
    ];
  }, []);
  const onHandleTypesOptionsChange = useCallback(
    (changedOption) => {
      setType(changedOption.value);
    },
    [typesOptions],
  );
  const [expiredAt, setExpiredAt] = useState<Date | null>(new Date());
  const onHandleExpiredAt = (date: Date | null) => {
    setExpiredAt(date);
  };
  const [teacher, setTeacher] = useState(null);
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
  const [lectureImageOptions, setLectureImageOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const onHandleImagesChange = useCallback(
    (changedOptions) => {
      setLectureImageOptions(changedOptions);
    },
    [lectureImageOptions],
  );
  const onHandleImagesCreate = useCallback(
    (changedOptions) => {
      setLectureImageOptions([
        ...lectureImageOptions,
        { value: changedOptions, label: changedOptions },
      ]);
    },
    [lectureImageOptions],
  );
  const [lectureVideoOptions, setLectureVideoOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [lectureVideoTitles, setLectureVideoTitles] = useState<string[]>([]);
  const onHandleVideosChange = useCallback(
    (changedOptions, { action, removedValue }) => {
      switch (action) {
        case 'create-option':
          setLectureVideoTitles([...lectureVideoTitles, changedOptions.value]);
          break;
        case 'remove-value':
        case 'pop-value':
          setLectureVideoTitles(
            lectureVideoTitles.filter((title) => title !== removedValue),
          );
          break;
        case 'clear':
          break;
        default:
      }
      if (action === 'create-option') {
      }
      setLectureVideoOptions(changedOptions);
    },
    [lectureVideoOptions],
  );
  const onHandleVideosCreate = useCallback(
    (changedOptions) => {
      setLectureVideoOptions([
        ...lectureVideoOptions,
        { value: changedOptions, label: changedOptions },
      ]);
    },
    [lectureVideoOptions],
  );
  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const images = [];
      for (const image of lectureImageOptions) {
        images.push(image.value);
      }
      const videos = [];
      for (const index of Object.keys(lectureVideoOptions)) {
        videos.push({
          url: lectureVideoOptions[+index].value,
          title: lectureVideoTitles[+index],
        });
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/lecture/create`,
        {
          title,
          thumbnail,
          expiredAt,
          type,
          description,
          teacherId: teacher,
          images,
          videos,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.statusText === 'Created') {
        setSelectedMenu(CONST_ADMIN_MENU.LECTURE_EDIT);
        allLecturesMutate();
      }
    } catch (error: any) {
      console.error(error);
      const messages = error.response.data.message;
      if (Array.isArray(messages)) {
        messages.map((message) => {
          toast.error(message);
        });
      } else {
        toast.error(messages);
      }
    }
  };
  return (
    <form className="mt-[47px] w-full" onSubmit={onSubmitHandler}>
      <div className="mt-[67px] mb-[29px]">
        <div>
          <label htmlFor="title">제목</label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="text"
          value={title}
          onChange={onChangeTitle}
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="type">강의 유형</label>
        </div>
        <Select
          options={typesOptions}
          onChange={onHandleTypesOptionsChange}
          placeholder="강의 유형을 선택하세요!"
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="expired_at">강의 만료 일시</label>
        </div>
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
      <div className="mb-[29px]">
        <div>
          <label htmlFor="thumbnail">썸네일 이미지 URL</label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="text"
          value={thumbnail}
          onChange={onChangeThumbnail}
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="description">강의 설명</label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="text"
          value={description}
          onChange={onChangeDescription}
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="description">강사</label>
        </div>
        <Select
          options={teachersOptions}
          onChange={onHandleTeacherChange}
          placeholder="강사를 선택하세요!"
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="description">강의 소개 이미지</label>
        </div>
        <CreatableSelect
          isMulti
          isClearable
          components={{ DropdownIndicator: null }}
          options={lectureImageOptions}
          value={lectureImageOptions}
          onChange={onHandleImagesChange}
          onCreateOption={onHandleImagesCreate}
          formatCreateLabel={() => '이미지 URL 추가하기'}
          noOptionsMessage={() => null}
          placeholder="강의 소개 이미지 URL을 추가하세요!"
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="description">강의 영상</label>
        </div>
        <CreatableSelect
          isMulti
          isClearable
          components={{ DropdownIndicator: null }}
          options={lectureVideoOptions}
          value={lectureVideoOptions}
          onChange={onHandleVideosChange}
          onCreateOption={onHandleVideosCreate}
          formatCreateLabel={() => '비메오 URL 추가하기'}
          noOptionsMessage={() => null}
          placeholder="강의 영상 URL을 추가하세요!"
        />
        {lectureVideoOptions.length > 0 &&
          lectureVideoOptions.map((video, index) => (
            <>
              <div>
                <label htmlFor="description">영상 URL {index} 제목</label>
              </div>
              <input
                className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
                type="text"
                value={lectureVideoTitles[index]}
                onChange={(event) => {
                  const titles = [...lectureVideoTitles];
                  titles[index] = event.target.value;
                  setLectureVideoTitles(titles);
                }}
              />
            </>
          ))}
      </div>
      <input
        type="submit"
        className="w-full h-[51px] text-[24px] font-semibold leading-[33px] bg-[#0D5B83] text-white mb-[12px]"
        value="강의 추가"
      />
    </form>
  );
};

export default LectureAdd;
