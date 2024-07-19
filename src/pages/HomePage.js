// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../index.css';
// import Navbar from '../components/navbar';

// const HomePage = () => {
//   const [images, setImages] = useState(Array(160).fill(null));

//   useEffect(() => {
//     getImages();
//   }, []);

//   const getImages = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/images'); // Update the port if necessary
//       const updatedImages = [...images];
//       response.data.forEach(image => {
//         if (image.block_no >= 0 && image.block_no < 160) {
//           updatedImages[image.block_no] = image.url;
//         }
//       });
//       setImages(updatedImages);
//     } catch (error) {
//       console.error('Error fetching images:', error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="grid-container">
//         {images.map((url, index) => (
//           <div key={index} className="grid-item">
//             {url ? (
//               <img src={url} alt={`img-${index}`} />
//             ) : (
//               <div className="placeholder"></div>
//             )}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default HomePage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import Navbar from "../components/navbar";
import Loader from "../components/loader";
import { base } from "../baseUrls/base";

const HomePage = () => {  
  const [images, setImages] = useState([]);
  const [clickedImage, setClickedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    try {
      const response = await axios.get(`${base}/images`); // Update the port if necessary
      const updatedImages = Array(160).fill(null);
      response.data.forEach((image) => {
        if (image.block_no >= 0 && image.block_no < 160) {
          updatedImages[image.block_no] = image.url;
        }
      });
      setImages(updatedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      // Only set loading to false after images have been updated
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid-container">
            {images.length === 160 ? (
              images.map((url, index) => (
                <div
                  key={index}
                  className="grid-item"
                  onClick={() => setClickedImage(url)}
                >
                  {url ? (
                    <img src={url} alt={`img-${index}`} />
                  ) : (
                    <div className="placeholder"></div>
                  )}
                </div>
              ))
            ) : (
              <Loader /> // Fallback loader if images array isn't fully populated
            )}
          </div>
        </>
      )}
      {clickedImage && (
        <div className="clicked-image-container">
          <button className="button" onClick={() => setClickedImage(null)}>
            <span className="button-content">Close</span>
          </button>
          <img src={clickedImage} alt="Clicked" className="clicked-image" />
        </div>
      )}
    </>
  );
};

export default HomePage;
