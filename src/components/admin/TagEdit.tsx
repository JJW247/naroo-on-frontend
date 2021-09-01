import axios from 'axios';
import { FormEvent } from 'react';
import { FC } from 'react';
import { SWRResponse } from 'swr';
import { useInput } from '../../hooks';
import { ITags } from '../../interfaces';
import UpdateTag from './tag/UpdateTag';

interface TagEditProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  tags: SWRResponse<ITags[], any>;
}

const TagEdit: FC<TagEditProps> = ({ token, setToken, tags }) => {
  const [tagName, onChangeTagName, setTagName] = useInput('');
  const onSubmitAddHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      if (!tagName) {
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/lecture/admin/tag/create`,
        {
          name: tagName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.statusText === 'Created') {
        tags.mutate();
        setTagName('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="mt-[47px] w-full" onSubmit={onSubmitAddHandler}>
        <div className="mt-[67px] mb-[29px]">
          <div>
            <label className="text-[16px] leading-[22px]" htmlFor="email">
              태그 이름
            </label>
          </div>
          <input
            className="w-full h-[51px] border-[1px] border-[#C4C4C4]"
            type="text"
            value={tagName}
            onChange={onChangeTagName}
          />
        </div>
        <input
          type="submit"
          className="w-full h-[51px] text-[24px] font-semibold leading-[33px] bg-[#0D5B83] text-white mb-[12px]"
          value="태그 추가"
        />
      </form>
      <div className="">
        <div>
          {tags &&
            tags.data &&
            tags.data.map((tag) => {
              return (
                <UpdateTag
                  token={token}
                  setToken={setToken}
                  id={tag.id}
                  name={tag.name}
                  mutate={tags.mutate}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default TagEdit;
