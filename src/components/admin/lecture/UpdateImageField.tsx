import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FC, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MutatorCallback } from 'swr/dist/types';
import { useInput } from '../../../hooks';
import { ILectureInList } from '../../../interfaces';

interface UpdateImageFieldProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  fieldType: string;
  lectureId: string;
  userField: string | null;
  mutate: (
    data?:
      | ILectureInList[]
      | Promise<ILectureInList[]>
      | MutatorCallback<ILectureInList[]>
      | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<ILectureInList[] | undefined>;
  imageIndex: number | null;
}

const UpdateImageField: FC<UpdateImageFieldProps> = ({
  token,
  setToken,
  fieldType,
  lectureId,
  userField,
  mutate,
  imageIndex,
}) => {
  const [preview, setPreview] = useState<any>(userField);
  const [updateToggle, setUpdateToggle] = useState<boolean>(false);
  const onClickUpdateToggle = () => {
    setUpdateToggle(!updateToggle);
    setPreview(userField);
  };
  const onSubmitUpdateImage = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      if (!preview || preview === userField) {
        setUpdateToggle(!updateToggle);
        setPreview(userField);
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/lecture/admin/${lectureId}`,
        {
          [fieldType]: preview,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.statusText === 'OK') {
        setUpdateToggle(!updateToggle);
        mutate();
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
    <>
      {updateToggle ? (
        <form
          className="w-full items-center p-[10px] border-[1px] border-[#C4C4C4]"
          onSubmit={onSubmitUpdateImage}
        >
          <div>
            <label htmlFor="image-file">
              {fieldType === 'thumbnail'
                ? '썸네일'
                : fieldType === 'img_description'
                ? '강의 설명'
                : ''}{' '}
              이미지 {imageIndex ? '#' + imageIndex + ' ' : ''}파일
            </label>
          </div>
          {preview && (
            <div className="mb-[29px]">
              <img className="rounded-xl" src={preview} />
            </div>
          )}
          <div className="flex">
            <input
              className="w-full px-[10px]"
              type="file"
              onChange={(event) => {
                if (!event.target.files || !event.target.files[0]) {
                  return;
                }
                const imageFile = event.target.files[0];
                const fileReader = new FileReader();
                fileReader.readAsDataURL(imageFile);
                fileReader.onload = (readerEvent) => {
                  setPreview(readerEvent.target?.result);
                };
              }}
            />
            <input
              className="rounded-[4px] min-w-max mx-[10px]"
              type="submit"
              value="수정"
            />
            <button
              type="button"
              className="rounded-[4px] min-w-max"
              onClick={onClickUpdateToggle}
            >
              취소
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center p-[10px] w-full border-[1px] border-[#C4C4C4]">
          <div className="w-full overflow-x-hidden">
            <div className="text-xs bg-white text-shuttle-gray">
              {fieldType === 'thumbnail'
                ? '썸네일 이미지 파일'
                : fieldType === 'img_description'
                ? `강의 설명 이미지 ${
                    imageIndex ? '#' + imageIndex + ' ' : ''
                  }파일`
                : ''}
              {fieldType === 'thumbnail' && userField ? (
                <Link to={`/lecture/${lectureId}`}>
                  <img className="rounded-xl" src={userField} alt="lecture" />
                </Link>
              ) : (
                ''
              )}
              {fieldType === 'img_description' && userField ? (
                <img
                  className="rounded-xl"
                  src={userField}
                  alt="lecture_description_img"
                />
              ) : (
                ''
              )}
            </div>
          </div>
          <FontAwesomeIcon
            className="mx-[10px]"
            icon={faEdit}
            onClick={onClickUpdateToggle}
          />
        </div>
      )}
    </>
  );
};

export default UpdateImageField;
