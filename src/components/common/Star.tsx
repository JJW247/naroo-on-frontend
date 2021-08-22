import React, { FC } from 'react';

import StarChecked from '../../assets/images/star-checked.svg';

const Star: FC = () => {
  return (
    <div className="flex bg-transparent">
      <img src={StarChecked} alt="star-checked" />
      <img src={StarChecked} alt="star-checked" />
      <img src={StarChecked} alt="star-checked" />
      <img src={StarChecked} alt="star-checked" />
      <img src={StarChecked} alt="star-checked" />
      <span>(5)</span>
    </div>
  );
};

export default Star;
