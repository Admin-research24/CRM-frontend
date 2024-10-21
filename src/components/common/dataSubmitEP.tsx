import { useState, useEffect } from 'react';
import ioClient from 'socket.io-client';

const FileUploadWithProgress = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');

  const REMOTE_SERVER_URL = 'http://localhost:5000';
  const socketClient = ioClient(REMOTE_SERVER_URL, {
    withCredentials: true,
  });

  useEffect(() => {
    socketClient.on('connect', () => {
      console.log('Connected to remote Socket.IO server');
      setStatus('Connected to server. Ready to upload.'); // Update status when connected
    });

    socketClient.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setStatus('Connection error. Please try again.'); // Update status on error
    });

    socketClient.on('progress-rate', (data) => {
      console.log('Received progress-rate event data:', data);
      setProgress(data.progress);
      setStatus(`Upload in progress: ${data.progress}%`); // Update status with progress
    });

    socketClient.on('progress', (data) => {
      console.log('Received progress event data:', data);
      setProgress(data.progress);
      setStatus(`Upload in progress: ${data.progress}%`); // Update status with progress
    });

    socketClient.on('upload-complete', () => {
      setStatus('Upload complete!'); // Update status when upload is complete
    });

    socketClient.on('upload-error', (error) => {
      console.error('Upload error:', error);
      setStatus('Upload failed. Please try again.'); // Update status on upload error
    });

    return () => {
      socketClient.disconnect();
      console.log('Disconnected from server');
    };
  }, []);

  return (
    <div>
      <h1>Data Upload</h1>
      <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px' }}>
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: progress === 100 ? 'green' : 'blue',
            height: '24px',
            borderRadius: '5px',
            transition: 'width 0.5s',
          }}
        />
      </div>
      <p>{progress}%</p>
      {status && <p>{status}</p>}
    </div>
  );
};

export default FileUploadWithProgress;
