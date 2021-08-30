import {
  faEnvelope,
  faFax,
  faHome,
  faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { SWRResponse } from 'swr';
import { IResourceContent } from '../../interfaces';

interface FooterProps {
  adminEmail: SWRResponse<IResourceContent[], any>;
  footerLogo: SWRResponse<IResourceContent[], any>;
}

const Footer: FC<FooterProps> = ({ adminEmail, footerLogo }) => {
  return (
    <div className="h-[155px] bg-[#696969] flex justify-center items-center">
      <div className="2xl:w-[250px] xl:w-[250px] lg:w-[250px] md:w-[220px] sm:w-[210px] xs:w-[180px]">
        <img
          width="170"
          src={footerLogo && footerLogo.data ? footerLogo.data[0].content : ''}
        />
      </div>
      <div className="2xl:max-w-[950px] xl:max-w-[950px] lg:max-w-[800px] md:w-[480px] sm:w-[320px] xs:w-[260px]">
        <div className="text-[#bfbfbf] text-[14px] font-light pb-[5px] leading-[20px] border-b-[1px] border-solid border-[rgba(255,255,255,0.1)] box-border">
          이메일무단수집거부
        </div>
        <div className="border-t-[1px] border-solid border-[rgba(0,0,0,0.1)] box-border"></div>
        <div className="pt-[5px] text-[#bfbfbf] text-[14px] font-light">
          <span>
            <FontAwesomeIcon icon={faHome} /> 서울특별시 마포구 토정로 148-22,
            <br className="2xl:hidden xl:hidden lg:hidden md:hidden sm:hidden xs:block" />
            <span className="xs:ml-5"> 2층 (우)04081</span>
          </span>
          <br className="2xl:hidden xl:hidden lg:hidden md:hidden sm:block xs:block" />
          <span className="2xl:pl-[20px] xl:pl-[20px] lg:pl-[20px] md:pl-[20px] sm:0 xs:0">
            <FontAwesomeIcon icon={faPhoneAlt} /> 02.6261.1939~1943
          </span>
          <br className="2xl:hidden xl:hidden lg:hidden md:block sm:hidden xs:hidden" />
          <span className="2xl:pl-[20px] xl:pl-[20px] lg:pl-[20px] md:0 sm:pl-[20px] xs:pl-[20px]">
            <FontAwesomeIcon icon={faFax} /> 02.6261.1944
          </span>
          <br className="2xl:hidden xl:hidden lg:block md:hidden sm:block xs:block" />
          <span className="2xl:pl-[20px] xl:pl-[20px] md:pl-[20px] lg:pl-0 sm:0 xs:0">
            <FontAwesomeIcon icon={faEnvelope} />
            <a href="mailto:mpnaroo@naver.com">
              {' '}
              {adminEmail && adminEmail.data ? adminEmail.data[0].content : ''}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
