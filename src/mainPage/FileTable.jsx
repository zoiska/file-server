import React from 'react';
import './FileTable.css';
import { useFiles } from '../contexts/FileContext';

function FileTable() {
  const { files } = useFiles();

  return (
    <table>
      <thead>
        <tr>
          <th>Filename</th>
          <th>Download</th>
        </tr>
      </thead>
      <tbody>
        {files.map((fileName) => (
          <tr key={fileName}>
            <td>{fileName}</td>
            <td>
              <a
                href={`/uploads/${fileName}`}
                download={fileName}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img id="downloadArrow" src="arrowdown.ico" width="32" height="32"/>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FileTable;
