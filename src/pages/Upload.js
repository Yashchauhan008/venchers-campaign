// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ImageUpload from "../components/ImageUpload";
// import Navbar from "../components/navbar";
// import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

// const Upload = () => {
//   const { user } = useKindeAuth();
//   const [images, setImages] = useState(Array(160).fill(null));
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedBlock, setSelectedBlock] = useState(null);

//   useEffect(() => {
//     if (user) {
//       checkUserExists();
//     }
//     getImages();
//   }, [user]);

//   const checkUserExists = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/users");
//       const users = response.data;
//       const userExists = users.some(
//         (existingUser) => existingUser.email === user.email
//       );

//       if (!userExists) {
//         await addUser();
//       }
//     } catch (error) {
//       console.error("Error checking user:", error);
//     }
//   };

//   const addUser = async () => {
//     try {
//       await axios.post("http://localhost:5000/users", {
//         email: user.email,
//         name: user.given_name + " " + user.family_name,
//         picture: user.picture,
//       });
//       console.log("User added successfully");
//     } catch (error) {
//       console.error("Error adding user:", error);
//     }
//   };

//   const getImages = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/images");
//       const updatedImages = Array(160).fill(null);
//       response.data.forEach((image) => {
//         if (image.block_no >= 0 && image.block_no < 160) {
//           updatedImages[image.block_no] = image.url;
//         }
//       });
//       setImages(updatedImages);
//     } catch (error) {
//       console.error("Error fetching images:", error);
//     }
//   };

//   const handleBlockClick = (index) => {
//     if (!images[index]) {
//       setSelectedBlock(index);
//       setIsPopupOpen(true);
//     }
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedBlock(null);
//   };

//   return (
//     <>
//       <Navbar />
//       <h2>Click any block to upload a photo.</h2>
//       <div className="grid-container">
//         {images.map((url, index) => (
//           <div
//             key={index}
//             className={`grid-item ${!url ? "clickable" : ""}`}
//             onClick={() => handleBlockClick(index)}
//           >
//             {url ? (
//               <img src={url} alt={`img-${index}`} />
//             ) : (
//               <div className="placeholder"></div>
//             )}
//           </div>
//         ))}
//       </div>
//       {isPopupOpen && (
//         <div className="popup">
//           <div className="popup-content">
//             <ImageUpload blockNumber={selectedBlock} closePopup={closePopup} />
//             {/* <button className="close-popup" onClick={closePopup}>Close</button> */}
//             <button className="button close-popup" onClick={closePopup}>
//               <span class="button-content">Close </span>
//             </button>

//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Upload;
import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageUpload from "../components/ImageUpload";
import Navbar from "../components/navbar";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { base } from "../baseUrls/base";

const Upload = () => {
  const { user } = useKindeAuth();
  const [images, setImages] = useState(Array(160).fill(null));
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [clickedImage, setClickedImage] = useState(null);

  useEffect(() => {
    if (user) {
      checkUserExists();
    }
    getImages();
  }, [user]);

  const checkUserExists = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      const users = response.data;
      const userExists = users.some(
        (existingUser) => existingUser.email === user.email
      );

      if (!userExists) {
        await addUser();
      }
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };

  const addUser = async () => {
    try {
      await axios.post("http://localhost:5000/users", {
        email: user.email,
        name: user.given_name + " " + user.family_name,
        picture: user.picture,
      });
      console.log("User added successfully");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const getImages = async () => {
    try {
      const response = await axios.get(`${base}/images`);
      const updatedImages = Array(160).fill(null);
      response.data.forEach((image) => {
        if (image.block_no >= 0 && image.block_no < 160) {
          updatedImages[image.block_no] = image.url;
        }
      });
      setImages(updatedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleBlockClick = (index) => {
    if (images[index]) {
      setClickedImage(images[index]);
    } else {
      setSelectedBlock(index);
      setIsPopupOpen(true);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedBlock(null);
  };

  return (
    <>
      <Navbar />
      <h2>Click any block to upload a photo.</h2>
      <div className="grid-container">
        {images.map((url, index) => (
          <div
            key={index}
            className={`grid-item ${!url ? "clickable" : ""}`}
            onClick={() => handleBlockClick(index)}
          >
            {url ? (
              <img src={url} alt={`img-${index}`} />
            ) : (
              <div className="placeholder"></div>
            )}
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <ImageUpload blockNumber={selectedBlock} closePopup={closePopup} />
            <button className="button close-popup" onClick={closePopup}>
              <span className="button-content">Close</span>
            </button>
          </div>
        </div>
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

export default Upload;
