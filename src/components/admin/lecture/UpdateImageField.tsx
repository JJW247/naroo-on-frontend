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
          className="flex items-center py-[10px]"
          onSubmit={onSubmitUpdateImage}
        >
          {preview && (
            <div className="mb-[29px]">
              <img src={preview} />
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
                  setPreview(readerEvent.target?.result);
                };
              }}
            />
          </div>
          <input
            className="rounded-[4px] min-w-max mx-[10px]"
            type="submit"
            value="수정"
          />
          <button
            className="rounded-[4px] min-w-max"
            onClick={onClickUpdateToggle}
          >
            취소
          </button>
        </form>
      ) : (
        <div className="flex items-center py-[10px] w-full">
          <div className="w-full overflow-x-hidden">
            <div className="text-xs bg-white text-shuttle-gray">
              {fieldType === 'thumbnail'
                ? '썸네일 파일 : '
                : fieldType === 'img_description'
                ? `이미지 ${imageIndex ? '#' + imageIndex + ' ' : ''}파일 : `
                : ''}
              {fieldType === 'thumbnail' && userField ? (
                <Link to={`/lecture/${lectureId}`}>
                  <img
                    className="block rounded-xl"
                    src={userField}
                    alt="lecture"
                  />
                </Link>
              ) : (
                ''
              )}
              {fieldType === 'img_description' && userField ? (
                <img
                  className="block rounded-xl"
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
