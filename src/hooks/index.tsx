import { ChangeEvent, useCallback, useEffect, useState } from 'react';

export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  return [value, onChange, setValue];
};

// export function useLocalStorage<T>(key: string, initialValue: T) {
//   const [storedValue, setStoredValue] = useState<T>(() => {
//     try {
//       const item = localStorage.getItem(key);
//       return item ? JSON.parse(JSON.stringify(item)) : initialValue;
//     } catch (error: any) {
//       console.error(error);
//       return initialValue;
//     }
//   });
//   const setValue = (value: T | ((val: T) => T)) => {
//     try {
//       const valueToStore =
//         value instanceof Function ? value(storedValue) : value;
//       setStoredValue(valueToStore);
//       localStorage.setItem(
//         key,
//         value instanceof Function
//           ? JSON.stringify(valueToStore)
//           : JSON.parse(JSON.stringify(valueToStore)),
//       );
//     } catch (error: any) {
//       console.error(error);
//     }
//   };
//   return [storedValue, setValue] as const;
// }

const isClient = typeof window === 'object';
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

export const useLocalStorage = <T,>(
  key: string,
  initialValue?: T,
  raw?: boolean,
): [T, Dispatch<SetStateAction<T>>] => {
  if (!isClient) {
    return [initialValue as T, () => null];
  }
  const [state, setState] = useState<T>(() => {
    try {
      const localStorageValue = localStorage.getItem(key);
      if (typeof localStorageValue !== 'string') {
        localStorage.setItem(
          key,
          raw ? String(initialValue) : JSON.stringify(initialValue),
        );
        return initialValue;
      } else {
        return raw
          ? localStorageValue
          : JSON.parse(localStorageValue || 'null');
      }
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      const serializedState = raw ? String(state) : JSON.stringify(state);
      state && localStorage.setItem(key, serializedState);
    } catch {}
  }, [state]);
  return [state, setState];
};
