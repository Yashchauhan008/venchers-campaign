import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import Navbar from '../components/navbar';

const HomePage = () => {
  const [images, setImages] = useState(Array(160).fill(null));

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/images'); // Update the port if necessary
      const updatedImages = [...images];
      response.data.forEach(image => {
        if (image.block_no >= 0 && image.block_no < 160) {
          updatedImages[image.block_no] = image.url;
        }
      });
      setImages(updatedImages);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="grid-container">
        {images.map((url, index) => (
          <div key={index} className="grid-item">
            {url ? (
              <img src={url} alt={`img-${index}`} />
            ) : (
              <div className="placeholder"></div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
