import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const ProfilePhoto = () => {
  const [photo, setPhoto] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setPhoto(file);

    // Upload the file to the server
    const formData = new FormData();
    formData.append('photo', file);

    axios.post('http://localhost:3001/upload', formData).then((response) => {
      console.log('File uploaded successfully:', response.data.filename);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Click or drag and drop a photo here.</p>
      </div>
      {photo && <img src={URL.createObjectURL(photo)} alt="Profile" />}
    </div>
  );
};

export default ProfilePhoto;
