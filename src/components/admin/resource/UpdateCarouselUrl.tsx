import { FC } from 'react';
import { MutatorCallback } from 'swr/dist/types';
import { IResources } from '../../../interfaces';

interface UpdateCarouselUrlProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  type: string;
  content_id: string;
  content: string;
  mutate: (
    data?:
      | IResources[]
      | Promise<IResources[]>
      | MutatorCallback<IResources[]>
      | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<IResources[] | undefined>;
}

const UpdateCarouselUrl: FC<UpdateCarouselUrlProps> = ({
  token,
  setToken,
  type,
  content_id,
  content,
  mutate,
}) => {
  return <div>업데이트</div>;
};

export default UpdateCarouselUrl;
