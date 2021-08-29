import axios from 'axios';
import useSWR from 'swr';
import {
  ILectureDetail,
  ILectureInList,
  IStudentEditInAdmin,
  ITags,
  ITeacherEditInAdmin,
} from '../interfaces';

export function tokenHeader(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
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

export function getApprovedLectures(token: string | null) {
  const fetcher = async () => {
    try {
      if (token === null) {
        throw new Error('잘못된 접근입니다!');
      }
      const response = await axios.get('/lecture', tokenHeader(token));
      if (response.statusText === 'OK') {
        return response.data;
      } else {
        throw new Error('API 통신 실패!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return useSWR<ILectureInList[]>(
    `${process.env.REACT_APP_BACK_URL}/lecture`,
    fetcher,
  );
}

export function getAllLectures() {
  const fetcher = async () => {
    try {
      const response = await axios.get('/lecture/all');
      if (response.statusText === 'OK') {
        return response.data;
      } else {
        throw new Error('API 통신 실패!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return useSWR<ILectureInList[]>(
    `${process.env.REACT_APP_BACK_URL}/lecture/all`,
    fetcher,
  );
}

export function getLectureGuest(id: string) {
  const fetcher = async () => {
    try {
      const response = await axios.get(`/lecture/guest/${id}`);
      if (response.statusText === 'OK') {
        return response.data;
      } else {
        throw new Error('API 통신 실패!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return useSWR<ILectureDetail>(
    `${process.env.REACT_APP_BACK_URL}/lecture/${id}`,
    fetcher,
  );
}

export function getLecture(token: string | null, id: string) {
  if (token === null) {
    return null;
  }
  const fetcher = async () => {
    try {
      const response = await axios.get(`/lecture/${id}`, tokenHeader(token));
      if (response.statusText === 'OK') {
        return response.data;
      } else {
        throw new Error('API 통신 실패!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return useSWR<ILectureDetail>(
    `${process.env.REACT_APP_BACK_URL}/lecture/${id}`,
    fetcher,
  );
}

export function getAllTeachers(token: string | null) {
  const fetcher = async () => {
    try {
      if (token === null) {
        return null;
      }
      const response = await axios.get(
        'auth/admin/teacher',
        tokenHeader(token),
      );
      if (response.statusText === 'OK') {
        return response.data;
      } else {
        throw new Error('API 통신 실패!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return useSWR<ITeacherEditInAdmin[]>(
    `${process.env.REACT_APP_BACK_URL}/auth/admin/teacher`,
    fetcher,
  );
}

export function getAllStudents(token: string | null) {
  const fetcher = async () => {
    try {
      if (token === null) {
        return null;
      }
      const response = await axios.get(
        'auth/admin/student',
        tokenHeader(token),
      );
      if (response.statusText === 'OK') {
        return response.data;
      } else {
        throw new Error('API 통신 실패!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return useSWR<IStudentEditInAdmin[]>(
    `${process.env.REACT_APP_BACK_URL}/auth/admin/student`,
    fetcher,
  );
}

export function getAllTags(token: string | null) {
  const fetcher = async () => {
    try {
      if (token === null) {
        return null;
      }
      const response = await axios.get('lecture/admin/tag', tokenHeader(token));
      if (response.statusText === 'OK') {
        return response.data;
      } else {
        throw new Error('API 통신 실패!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return useSWR<ITags[]>(
    `${process.env.REACT_APP_BACK_URL}/lecture/admin/tag`,
    fetcher,
  );
}
