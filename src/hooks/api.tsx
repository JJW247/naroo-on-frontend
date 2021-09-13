import axios from 'axios';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { MutatorCallback } from 'swr/dist/types';
import {
  ILectureDetail,
  ILectureInList,
  ILectureInListAdmin,
  ILectureVideoDetail,
  IRecentReviews,
  IResourceContent,
  IResources,
  IStudentEditInAdmin,
  ITags,
  ITeacherEditInAdmin,
} from '../interfaces';

export interface DataResponse<T> {
  data: T | undefined;
  mutate: (
    data?: T | Promise<T> | MutatorCallback<T> | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<T | undefined>;
}

export function tokenHeader(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export function useGetSWR<T>(
  requestUrl: string,
  token: string | null,
): DataResponse<T> {
  const fetcher = async (url: string) => {
    try {
      const response = token
        ? await axios.get(url, tokenHeader(token))
        : await axios.get(url);
      return response.data;
    } catch (error: any) {
      console.error(error);
      const messages = error.response.data?.message;
      if (Array.isArray(messages)) {
        messages.map((message) => {
          toast.error(message);
        });
      } else {
        toast.error(messages);
      }
    }
  };
  const { data, mutate } = useSWR<T>(requestUrl, fetcher);
  return { data, mutate };
}

export async function getMe(token: string | null) {
  if (token === null) {
    return null;
  }
  const response = await axios.get('/auth/me', tokenHeader(token));
  if (response.statusText === 'OK') {
    const { userId, role, nickname } = response.data;
    return { userId, role, nickname };
  } else {
    return null;
  }
}

export function getRecentReviews() {
  const fetcher = async () => {
    try {
      const response = await axios.get('/lecture/review/recent');
      if (response.statusText === 'OK') {
        return response.data;
      } else {
        throw new Error('API 통신 실패!');
      }
    } catch (error: any) {
      console.error(error);
      const messages = error.response.data?.message;
      if (Array.isArray(messages)) {
        messages.map((message) => {
          toast.error(message);
        });
      } else {
        toast.error(messages);
      }
    }
  };
  return useSWR<IRecentReviews[]>(
    `${process.env.REACT_APP_BACK_URL}/lecture/review/recent`,
    fetcher,
  );
}
