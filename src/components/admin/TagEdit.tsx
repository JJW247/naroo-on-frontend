import { FC } from 'react';
import { SWRResponse } from 'swr';
import { ITags } from '../../interfaces';
import Tag from '../common/Tag';

interface TagEditProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  tags: SWRResponse<ITags[], any>;
}

const TagEdit: FC<TagEditProps> = ({ token, setToken, tags }) => {
  return (
    <div className="flex items-center justify-center">
      <div>
        <div className="w-full text-center text-3xl">태그 관리</div>
        {tags && tags.data && (
          <div className="grid grid-flow-row grid-cols-4 gap-6">
            {tags.data.map((tag) => {
              return <Tag name={tag.name} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagEdit;
