import axios from 'axios';
import useSWR from 'swr';
import {
  ILectureInList,
  IStudentEditInAdmin,
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
    const { userId, role } = response.data;
    return { userId, role };
  } else {
    return null;
  }
}

export function getAllLectures() {
  const fetcher = async () => {
    try {
      const response = await axios.get('/lecture');
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
