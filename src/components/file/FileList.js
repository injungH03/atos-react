import React from 'react';
import { useQuery } from 'react-query';
import { get } from '@utils/axios_api';
import './FileList.css';

const fetchFileDetails = async (atchFileId) => {
  const response = await get('/file/getFileDetails', {
    params: { atchFileId },
  });
  return response.result;
};

const FileList = ({ atchFileId }) => {
  const { data: existingFiles = [], isLoading, isError, error } = useQuery(
    ['fileDetails', atchFileId],
    () => fetchFileDetails(atchFileId),
    { enabled: !!atchFileId } 
  );

  const handleDownload = async (file) => {
    try {
      const response = await get('/file/download', {
        params: {
          atchFileId: file.atchFileId,
          fileSn: file.fileSn,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.orignlFileNm);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('파일 다운로드 중 오류 발생:', error);
      alert('파일 다운로드 중 오류가 발생했습니다.');
    }
  };


  if (!atchFileId) {
    return <div>업로드된 파일이 없습니다.</div>;
  }

  if (isLoading) {
    return <div>파일 목록을 불러오는 중입니다...</div>;
  }

  if (isError) {
    return <div>파일 목록을 불러오는 중 오류가 발생했습니다: {error.message}</div>;
  }

  return (
    <ul className="existing-files list-group">
      {existingFiles.map((file) => (
        <li key={file.fileSn} className="list-group-item">
          <button onClick={() => handleDownload(file)} className="file-download-button" >{file.orignlFileNm}</button>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
