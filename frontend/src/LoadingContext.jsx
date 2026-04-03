import { createContext, useContext, useState, useCallback, useRef } from 'react';

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  const [visible, setVisible] = useState(true); // show on first load
  const onDoneRef = useRef(null);

  const showLoader = useCallback((onDone) => {
    onDoneRef.current = onDone ?? null;
    setVisible(true);
  }, []);

  return (
    <LoadingContext.Provider value={{ visible, setVisible, showLoader, onDoneRef }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
