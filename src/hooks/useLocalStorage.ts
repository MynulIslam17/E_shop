"use client";

import { useState, useEffect } from "react";
import { localStorageService } from "@/services/storage/local-storage";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return localStorageService.getItem(key, initialValue);
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorageService.setItem(key, valueToStore);
    } catch (error) {
      console.warn(`Error setting key ${key} in useLocalStorage`, error);
    }
  };

  useEffect(() => {
    setStoredValue(localStorageService.getItem(key, initialValue));
  }, [key, initialValue]);

  return [storedValue, setValue];
}
