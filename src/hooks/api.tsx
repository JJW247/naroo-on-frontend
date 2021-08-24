import axios from 'axios';

export async function getMe(token: string | null) {
  if (token === null) {
    return null;
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const response = await axios.get('/auth/me');
  if (response.statusText === 'OK') {
    const { userId, role } = response.data;
    return { userId, role };
  } else {
    return null;
  }
}

export async function getAllLectures() {
  // if (token === null) {
  //   return null;
  // }
  // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const response = await axios.get('/lecture');
  if (response.statusText === 'OK') {
    return response.data;
  } else {
    return null;
  }
}
