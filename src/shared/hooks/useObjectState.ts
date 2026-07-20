import { useState } from "react";

function useObjectState<T extends Record<string, any>>(initialState: T) {
  const [state, setState] = useState<T>(initialState);
  const [savedInitialState] = useState<T>(initialState);

  const setField = <K extends keyof T>(key: K, value: T[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const setFields = (updates: Partial<T> = {}) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const resetState = () => setState(savedInitialState);

  return { ...state, state, setField, setFields, resetState };
}

export default useObjectState;
