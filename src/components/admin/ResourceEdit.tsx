import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FC } from 'react';
import { SWRResponse } from 'swr';
import { IResources, IStudentEditInAdmin } from '../../interfaces';
import UpdateCarouselUrl from './resource/UpdateCarouselUrl';
import UpdateResourceField from './resource/UpdateResourceField';

interface ResourceEditProps {
  token: string | null;
  setToken: (
    value: string | ((val: string | null) => string | null) | null,
  ) => void;
  resources: SWRResponse<IResources[], any>;
}

const ResourceEdit: FC<ResourceEditProps> = ({
  token,
  setToken,
  resources,
}) => {
  return (
    <div className="mt-[30px]">
      {resources.data &&
        resources.data.map((resource) => {
          if (resource) {
            return (
              <>
                {+resource.content_id === 0 ? (
                  <div className="mt-[20px]">
                    {resource.type === 'admin_email'
                      ? '관리자 이메일 : '
                      : resource.type === 'header_logo'
                      ? 'Header 로고 URL : '
                      : resource.type === 'footer_logo'
                      ? 'Footer 로고 URL : '
                      : resource.type === 'notice_carousel'
                      ? `메인 슬라이더 이미지 URL : `
                      : resource.type === 'org_carousel'
                      ? `기관 슬라이더 이미지 URL : `
                      : ''}
                  </div>
                ) : (
                  ''
                )}
                <div className="border-2 rounded">
                  {resource.content && (
                    <UpdateResourceField
                      token={token}
                      setToken={setToken}
                      type={resource.type}
                      content_id={resource.content_id}
                      content={resource.content}
                      mutate={resources.mutate}
                    />
                  )}
                </div>
              </>
            );
          } else {
            return <div>리소스가 존재하지 않습니다!</div>;
          }
        })}
    </div>
  );
};

export default ResourceEdit;
