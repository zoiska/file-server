import React from 'react';
import './DropArea.css'
import { useFiles } from '../contexts/FileContext';

function DropArea() {
  const { refreshFiles } = useFiles();

  function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.items) {
      [...event.dataTransfer.items].forEach(async (item) => {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          console.log(`Uploading: ${file.name}`);

          const formData = new FormData();
          formData.append('files', file);

          try {
            await fetch('/uploads', {
              method: 'POST',
              body: formData,
            });
            refreshFiles();
          } catch (err) {
            console.error(err);
          }
        }
      });
    }
  }

  return (
    <div
      id="drop-area"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      Drop files here
    </div>
  );
}

export default DropArea;
