import React, { createContext, useContext, useState, useEffect } from 'react';

const FileContext = createContext();

export function useFiles() {
  return useContext(FileContext);
}

export function FileProvider({ children }) {
  const [files, setFiles] = useState([]);

  function refreshFiles() {
    fetch('/uploads/')
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error('Error loading /uploads:', err));
  }

  useEffect(() => {
    refreshFiles();
  }, []);

  return (
    <FileContext.Provider value={{ files, refreshFiles }}>
      {children}
    </FileContext.Provider>
  );
}
