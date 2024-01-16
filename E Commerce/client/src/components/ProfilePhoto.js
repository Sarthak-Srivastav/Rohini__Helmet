// // components/ProfilePhoto.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useDropzone } from 'react-dropzone';

// const ProfilePhoto = ({ userId }) => {
//     // You can fetch the user's profile photo using the userId and display it here
//     const profilePhotoUrl = `URL_TO_FETCH_PROFILE_PHOTO/${userId}`;

//   const onDrop = async (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     const formData = new FormData();
//     formData.append('photo', file);
//     formData.append('userId', userId);

//     try {
//       const response = await axios.post('http://localhost:3001/api/v1/upload', formData);
//       console.log('File uploaded successfully:', response.data.filename);
//       setPhoto(response.data.filename);
//     } catch (error) {
//       console.error('Error uploading profile photo:', error.message);
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   return (
//     <div>
//       <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         <p>Click or drag and drop a photo here.</p>
//       </div>
//       {photo && <img src={`http://localhost:3001/api/v1/photo/${photo}`} alt="Profile" />}
//     </div>
//   );
// };

// export default ProfilePhoto;
