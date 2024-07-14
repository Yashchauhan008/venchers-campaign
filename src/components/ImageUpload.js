import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ImageUpload = ({ blockNumber, closePopup }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      Swal.fire({
        title: 'Error',
        text: 'No image selected!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('blockNumber', blockNumber);

    try {
      const res = await axios.post('http://localhost:5000/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        title: 'Success',
        text: 'Image uploaded successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        closePopup();
      });

    } catch (err) {
      console.error('Upload failed:', err.response ? err.response.data : err.message);
      Swal.fire({
        title: 'Error',
        text: `Failed to upload image: ${err.response ? err.response.data.message : err.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className='upload_image'>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload</button>
      </form>
      {preview && <img src={preview} alt="Preview" style={{ maxWidth: '300px' }} />}
    </div>
  );
};

export default ImageUpload;
