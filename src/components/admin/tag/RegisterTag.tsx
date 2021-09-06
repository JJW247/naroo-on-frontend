import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FC, FormEvent, useCallback, useMemo, useState } from 'react';
import Select from 'react-select';
import { MutatorCallback } from 'swr/dist/types';
import { useInput } from '../../../hooks';
import { ILectureInList, ITags } from '../../../interfaces';
import Tag from '../../common/Tag';

interface RegisterTagProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  lectureId: string;
  allTags: ITags[] | undefined;
  tags: { value: string; label: string }[] | [];
  mutate: (
    data?:
      | ILectureInList[]
      | Promise<ILectureInList[]>
      | MutatorCallback<ILectureInList[]>
      | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<ILectureInList[] | undefined>;
}

const RegisterTag: FC<RegisterTagProps> = ({
  token,
  setToken,
  lectureId,
  allTags,
  tags,
  mutate,
}) => {
  const [updateToggle, setUpdateToggle] = useState<boolean>(false);
  const [registerTags, setRegisterTags] =
    useState<{ value: string; label: string }[]>(tags);
  const tagsOptions = useMemo(() => {
    const filteredTags = [];
    if (allTags) {
      for (const tag of allTags) {
        filteredTags.push({ value: tag.id, label: tag.name });
      }
    }
    return filteredTags;
  }, [allTags]);
  const onHandleTagsChange = useCallback(
    (changedOption) => {
      setRegisterTags(changedOption);
    },
    [tagsOptions],
  );
  const onClickUpdateToggle = () => {
    setUpdateToggle(!updateToggle);
    setRegisterTags(tags);
  };
  const onSubmitRegisterTag = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const ids = [];
      for (const tag of registerTags) {
        ids.push(tag.value);
      }
      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/lecture/tag/${lectureId}`,
        {
          ids,
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
    } catch (error) {
      console.error(error);
    }
  };
  const onClickUnregisterTag = async (tagId: string) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/lecture/tag/${lectureId}?id=${tagId}`,
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
  return (
    <>
      {updateToggle ? (
        <form
          className="flex items-center py-[10px]"
          onSubmit={onSubmitRegisterTag}
        >
          <div className="w-full">
            <Select
              isMulti
              isClearable
              className="rounded-full w-full pl-[14px] pr-[14px] py-1 text-xs text-gray-200 bg-harp mr-1"
              type="text"
              value={registerTags}
              options={tagsOptions}
              onChange={onHandleTagsChange}
              placeholder="태그를 추가하세요!"
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
        <div className="flex items-center py-[10px] mt-5">
          {tags.length > 0 &&
            tags.map((tag) => {
              return (
                <div className="flex items-center mr-[10px]">
                  <Tag name={tag.label} />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => onClickUnregisterTag(tag.value)}
                  />
                </div>
              );
            })}
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

export default RegisterTag;
