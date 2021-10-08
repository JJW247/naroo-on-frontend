import axios from 'axios';
import { FC, FormEvent, useCallback, useState } from 'react';
import { useInput } from '../../hooks';
import CreatableSelect from 'react-select/creatable';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import { ILectureInList } from '../../interfaces';
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
}

const LectureAdd: FC<LectureAddProps> = ({
  token,
  setToken,
  setSelectedMenu,
  allLecturesData,
  allLecturesMutate,
}) => {
  const [title, onChangeTitle] = useInput('');
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [description, onChangeDescription] = useInput('');
  const [expiredAt, setExpiredAt] = useState<Date | null>(new Date());
  const onHandleExpiredAt = (date: Date | null) => {
    setExpiredAt(date);
  };
  const [teacherName, onChangeTeacherName] = useInput('');
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
  const [videoTitle, onChangeVideoTitle] = useInput('');
  const [videoUrl, onChangeVideoUrl] = useInput('');
  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const images = [];
      for (const image of lectureImageOptions) {
        images.push(image.value);
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/lecture/create`,
        {
          title,
          thumbnail,
          expiredAt,
          description,
          teacherName,
          images,
          videoTitle,
          videoUrl,
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
      {thumbnail && (
        <div className="mb-[29px]">
          <img src={thumbnail} />
        </div>
      )}
      <div className="mb-[29px]">
        <div>
          <label htmlFor="thumbnail-file">썸네일 이미지 파일</label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="file"
          onChange={(event) => {
            if (!event.target.files || !event.target.files[0]) {
              return;
            }
            const imageFile = event.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onload = (readerEvent) => {
              setThumbnail(readerEvent.target?.result);
            };
          }}
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
          <label htmlFor="teacher-name">강사 이름</label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="text"
          value={teacherName}
          onChange={onChangeTeacherName}
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="images">강의 소개 이미지</label>
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
          <label htmlFor="video_title">강의 영상 제목</label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="text"
          value={videoTitle}
          onChange={onChangeVideoTitle}
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="video_url">강의 영상 URL</label>
        </div>
        <input
          className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
          type="text"
          value={videoUrl}
          onChange={onChangeVideoUrl}
        />
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
