import React, { FC } from 'react';
import Tag from './Tag';

const Tags: FC = () => {
  return (
    <div className="flex">
      <Tag />
      <Tag />
      <Tag />
    </div>
  );
};

export default Tags;
