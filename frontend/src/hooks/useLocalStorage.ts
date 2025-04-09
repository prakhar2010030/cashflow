import { useCallback } from "react";

export const useLocalStorage = () => {
  const removeItem = useCallback((key: string) => {
    localStorage.removeItem(key);
  }, []);

  const addItem = useCallback((key: string, value: string) => {
    localStorage.setItem(key, value);
  }, []);

  const clearLocalStorage = useCallback(() => {
    localStorage.clear();
  }, []);
  const getItem = useCallback((key: string): string | null => {
    return localStorage.getItem(key);
  }, []);

  return { removeItem, addItem, clearLocalStorage, getItem };
};
