import axios from 'axios';

export async function getMe(token: string | null) {
  if (token === null) {
    return null;
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const response = await axios.get('/auth/me');
  if (response.statusText === 'OK') {
    return { userId: response.data.userId, role: response.data.role };
  } else {
    return null;
  }
}
