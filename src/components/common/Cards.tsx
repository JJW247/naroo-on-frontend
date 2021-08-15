import React, { FC } from 'react';
import Card from './Card';

const Cards: FC = () => {
  return (
    <div className="grid grid-flow-row grid-cols-4 gap-6">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default Cards;
