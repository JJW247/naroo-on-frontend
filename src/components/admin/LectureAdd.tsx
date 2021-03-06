import axios from 'axios';
import { FC, FormEvent, useCallback, useRef, useState } from 'react';
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
import Slider from 'react-slick';

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
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
  };
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
      value: string | ArrayBuffer | null | undefined;
      label: string | ArrayBuffer | null | undefined;
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
  const inputFileRef = useRef<any>(null);
  const onMenuOpenSelectImages = () => {
    if (inputFileRef && inputFileRef.current) {
      inputFileRef.current.click();
    }
  };
  const onFileChange = (event: any) => {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }
    const imageFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = (readerEvent) => {
      setLectureImageOptions([
        ...lectureImageOptions,
        {
          value: readerEvent.target?.result,
          label: `????????? #${(lectureImageOptions.length + 1).toString()}`,
        },
      ]);
    };
  };
  const [videoTitle, onChangeVideoTitle] = useInput('');
  const [videoUrl, onChangeVideoUrl] = useInput('');
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setIsLoadingSubmit(true);
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
        setTimeout(() => {
          allLecturesMutate();
          setSelectedMenu(CONST_ADMIN_MENU.LECTURE_EDIT);
        }, 500);
      }
    } catch (error: any) {
      const messages = error.response.data.message;
      if (Array.isArray(messages)) {
        messages.map((message) => {
          toast.error(message);
        });
      } else {
        toast.error(messages);
      }
    } finally {
      setTimeout(() => {
        setIsLoadingSubmit(false);
      }, 500);
    }
  };
  return (
    <form className="mt-[47px] w-full" onSubmit={onSubmitHandler}>
      <div className="mt-[67px] mb-[29px]">
        <div>
          <label htmlFor="title">??????</label>
        </div>
        <input
          className="w-full h-[41px] border-[1px] box-border rounded-[4px] border-[#DCDEE2] bg-[#F3FBFE] placeholder-[#DCDEE2] font-medium text-[14px] leading-[150%] py-[10px] focus:border-[#00A0E9] focus:outline-none focus:bg-white px-[20px] disabled:opacity-50"
          type="text"
          value={title}
          onChange={onChangeTitle}
          disabled={isLoadingSubmit}
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="expired_at">?????? ?????? ??????</label>
        </div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            format="yyyy??? MM??? dd??? hh??? mm??? ss???"
            value={expiredAt}
            margin="normal"
            onChange={onHandleExpiredAt}
            className="w-full disabled:opacity-50"
            disabled={isLoadingSubmit}
          />
        </MuiPickersUtilsProvider>
      </div>
      {thumbnail && (
        <div className="mb-[29px]">
          <img className="rounded-xl" src={thumbnail} />
        </div>
      )}
      <div className="mb-[29px]">
        <div>
          <label htmlFor="thumbnail-file">????????? ?????????</label>
        </div>
        <input
          className="w-full border-[1px] border-[#C4C4C4] p-[20px] disabled:opacity-50"
          type="file"
          disabled={isLoadingSubmit}
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
          <label htmlFor="description">?????? ??????</label>
        </div>
        <input
          className="w-full h-[41px] border-[1px] box-border rounded-[4px] border-[#DCDEE2] bg-[#F3FBFE] placeholder-[#DCDEE2] font-medium text-[14px] leading-[150%] py-[10px] focus:border-[#00A0E9] focus:outline-none focus:bg-white px-[20px] disabled:opacity-50"
          type="text"
          value={description}
          onChange={onChangeDescription}
          disabled={isLoadingSubmit}
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="teacher-name">?????? ??????</label>
        </div>
        <input
          className="w-full h-[41px] border-[1px] box-border rounded-[4px] border-[#DCDEE2] bg-[#F3FBFE] placeholder-[#DCDEE2] font-medium text-[14px] leading-[150%] py-[10px] focus:border-[#00A0E9] focus:outline-none focus:bg-white px-[20px] disabled:opacity-50"
          type="text"
          value={teacherName}
          onChange={onChangeTeacherName}
          disabled={isLoadingSubmit}
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="images">?????? ?????? ?????????</label>
        </div>
        <input
          className="hidden"
          type="file"
          ref={inputFileRef}
          onChange={onFileChange}
          disabled={isLoadingSubmit}
        />
        <Slider {...settings}>
          {lectureImageOptions &&
            lectureImageOptions.length > 0 &&
            lectureImageOptions.map((lectureImageOption) => {
              if (lectureImageOption.value) {
                return (
                  <img
                    className="w-[25%] h-[300px] rounded-xl mb-[15px]"
                    src={lectureImageOption.value.toString()}
                  />
                );
              }
            })}
        </Slider>
        <CreatableSelect
          isMulti
          isClearable
          components={{ DropdownIndicator: null }}
          options={lectureImageOptions}
          value={lectureImageOptions}
          onChange={onHandleImagesChange}
          onCreateOption={onHandleImagesCreate}
          onMenuOpen={onMenuOpenSelectImages}
          formatCreateLabel={() => '????????? URL ????????????'}
          noOptionsMessage={() => null}
          placeholder="?????? ?????? ????????? URL??? ???????????????!"
          className="disabled:opacity-50"
          disabled={isLoadingSubmit}
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="video_title">?????? ?????? ??????</label>
        </div>
        <input
          className="w-full h-[41px] border-[1px] box-border rounded-[4px] border-[#DCDEE2] bg-[#F3FBFE] placeholder-[#DCDEE2] font-medium text-[14px] leading-[150%] py-[10px] focus:border-[#00A0E9] focus:outline-none focus:bg-white px-[20px] disabled:opacity-50"
          type="text"
          value={videoTitle}
          onChange={onChangeVideoTitle}
          disabled={isLoadingSubmit}
        />
      </div>
      <div className="mb-[29px]">
        <div>
          <label htmlFor="video_url">?????? ?????? URL</label>
        </div>
        <input
          className="w-full h-[41px] border-[1px] box-border rounded-[4px] border-[#DCDEE2] bg-[#F3FBFE] placeholder-[#DCDEE2] font-medium text-[14px] leading-[150%] py-[10px] focus:border-[#00A0E9] focus:outline-none focus:bg-white px-[20px] disabled:opacity-50"
          type="text"
          value={videoUrl}
          onChange={onChangeVideoUrl}
          disabled={isLoadingSubmit}
        />
      </div>
      <button
        type="submit"
        disabled={isLoadingSubmit}
        className="w-full h-[51px] text-[24px] font-semibold leading-[33px] bg-[#4DBFF0] text-white mb-[12px] disabled:opacity-50"
      >
        ?????? ??????
      </button>
    </form>
  );
};

export default LectureAdd;
