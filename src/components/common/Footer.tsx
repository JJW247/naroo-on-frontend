import { FC } from 'react';
import DummyFooterLogo from '../../assets/images/dummy-footer-logo.png';
import DummyFooterContent from '../../assets/images/dummy-footer-content.png';

const Footer: FC = () => {
  return (
    <div className="h-[155px] bg-[#696969] flex items-center">
      <img className="ml-[350px] mr-[113px]" src={DummyFooterLogo} />
      <img className="mr-[316px]" src={DummyFooterContent} />
    </div>
  );
};

export default Footer;
