import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';

export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setValue(value);
  };

  return [value, onChange];
};

export const useGetMe = () => {
  const token = localStorage.getItem('token') || '';

  const [me, setMe] = useState<number | null>(null);

  useEffect(() => {
    const getMe = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.statusText === 'OK') {
        setMe(response.data.userId);
      }
    };

    getMe();
  }, [token]);

  return { me };
};
