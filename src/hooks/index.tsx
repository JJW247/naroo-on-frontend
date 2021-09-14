import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  return [value, onChange, setValue];
};

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(JSON.stringify(item)) : initialValue;
    } catch (error: any) {
      console.error(error);
      return initialValue;
    }
  });
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(
        key,
        value instanceof Function
          ? JSON.stringify(valueToStore)
          : JSON.parse(JSON.stringify(valueToStore)),
      );
    } catch (error: any) {
      console.error(error);
    }
  };
  return [storedValue, setValue] as const;
}
