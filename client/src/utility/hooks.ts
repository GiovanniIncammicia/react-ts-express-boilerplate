import { useState, useEffect, useCallback } from "react";
import { useGlobalContext } from "../globalContext";

export function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export function useOnClickOutside(ref: any, handler: (e: MouseEvent | TouchEvent) => void ) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export const useServerTransition = () => {
  const [, dispatch] = useGlobalContext();
  return useCallback(async (transition: () => unknown, cb: (data: any) => void) => {
    dispatch({ type: 'startLoading' });
    const data = await transition();
    if (!(data instanceof Error)) {
      cb(data);
      // TODO: fai comparire toast notification (custom con reach/alert)
    }
    dispatch({ type: 'stopLoading' });
  }, [dispatch]);
};